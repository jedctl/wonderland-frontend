import { ethers, constants, Contract, BigNumber } from "ethers";
import { getMarketPrice, getTokenPrice } from "../../helpers";
import { calculateUserBondDetails, getBalances } from "./account-slice";
import { getAddresses } from "../../constants";
import { fetchPendingTxns, clearPendingTxn } from "./pending-txns-slice";
import { createSlice, createSelector, createAsyncThunk, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { fetchAccountSuccess } from "./account-slice";
import { Bond } from "../../helpers/bond/bond";
import { Networks } from "../../constants/blockchain";
import { getBondCalculator } from "../../helpers/bond-calculator";
import { RootState } from "../store";
import { error, warning, success, info } from "../slices/messages-slice";
import { messages } from "../../constants/messages";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { sleep } from "../../helpers";
import { IDOBond } from "src/helpers/bond/ido-bond";

interface IChangeApproval {
    bond: Bond;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
    address: string;
}

export const changeApproval = createAsyncThunk("bonding/changeApproval", async ({ bond, provider, networkID, address }: IChangeApproval, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }

    const signer = provider.getSigner();
    const reserveContract = bond.getPrincipalContract(networkID, signer);

    let approveTx;
    try {
        const gasPrice = await getGasPrice(provider);
        const bondAddr = bond.getBondAddress(networkID);
        approveTx = await reserveContract.approve(bondAddr, constants.MaxUint256, { gasPrice });
        dispatch(
            fetchPendingTxns({
                txnHash: approveTx.hash,
                text: "Approving " + bond.displayName,
                type: "approve_" + bond.name,
            }),
        );
        await approveTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        metamaskErrorWrap(err, dispatch);
    } finally {
        if (approveTx) {
            dispatch(clearPendingTxn(approveTx.hash));
        }
    }

    await sleep(2);

    let allowance = "0";

    allowance = await reserveContract.allowance(address, bond.getBondAddress(networkID));

    return dispatch(
        fetchAccountSuccess({
            bonds: {
                [bond.name]: {
                    allowance: Number(allowance),
                },
            },
        }),
    );
});

interface ICalcBondDetails {
    bond: Bond;
    value: string | null;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IBondDetails {
    bond: string;
    bondDiscount: number;
    bondQuote: number;
    purchased: number;
    vestingTerm: number;
    maxBondPrice: number;
    bondPrice: number;
    marketPrice: number;
    maxBondPriceToken: number;
}

export const calcBondDetails = createAsyncThunk("bonding/calcBondDetails", async ({ bond, value, provider, networkID }: ICalcBondDetails, { dispatch }) => {
    if (!value) {
        value = "0";
    }

    const amountInWei = ethers.utils.parseEther(value);

    let bondPrice = 0,
        bondDiscount = 0,
        valuation = 0,
        bondQuote = 0;

    const addresses = getAddresses(networkID);

    const bondContract = bond.getBondContract(networkID, provider);
    const bondCalcContract = getBondCalculator(networkID, provider);

    if (bond.isIDO) {
        return await calcIdoBondDetails(provider, networkID, bond, bondContract, amountInWei, dispatch);
    }

    const bondInfo = await bondContract.bonds(bond.bid);
    const terms = await bondInfo.terms;

    var maxBondPrice = 0;
    if (bond.isIDO) {
        try {
            const address = await provider.getSigner().getAddress();
            maxBondPrice = (await bondContract.maxPayout(address)) / Math.pow(10, 9);
        } catch (e) {
            console.log("error getting max payout", e);
        }
    } else {
        maxBondPrice = (await bondContract.maxPayout(bond.bid)) / Math.pow(10, 9);
    }

    let marketPrice = await getMarketPrice(networkID, provider);

    const mimPrice = getTokenPrice("MIM");
    marketPrice = (marketPrice / Math.pow(10, 9)) * mimPrice;

    try {
        bondPrice = await bondContract.bondPriceInUSD(bond.bid);
        bondDiscount = (marketPrice * Math.pow(10, 18) - bondPrice) / bondPrice;
    } catch (e) {
        console.log("error getting bondPriceInUSD", e);
    }

    let maxBondPriceToken = 0;
    const maxBodValue = ethers.utils.parseEther("1");

    if (bond.isLP) {
        valuation = await bondCalcContract.valuation(bond.getPrincipalAddress(networkID), amountInWei);
        bondQuote = await bondContract.payoutFor(valuation, bond.bid);
        bondQuote = bondQuote / Math.pow(10, 9);

        const maxValuation = await bondCalcContract.valuation(bond.getPrincipalAddress(networkID), maxBodValue);
        const maxBondQuote = await bondContract.payoutFor(maxValuation, bond.bid);
        maxBondPriceToken = maxBondPrice / (maxBondQuote * Math.pow(10, -9));
    } else {
        bondQuote = await bondContract.payoutFor(amountInWei, bond.bid);
        bondQuote = bondQuote / Math.pow(10, 18);

        const maxBondQuote = await bondContract.payoutFor(maxBodValue, bond.bid);
        maxBondPriceToken = maxBondPrice / (maxBondQuote * Math.pow(10, -18));
    }

    if (!!value && bondQuote > maxBondPrice) {
        dispatch(error({ text: messages.try_mint_more(maxBondPrice.toFixed(2).toString()) }));
    }

    // Calculate bonds purchased
    const token = bond.getPrincipalContract(networkID, provider);
    let purchased = await token.balanceOf(addresses.TREASURY_ADDRESS);

    if (bond.isLP) {
        const assetAddress = bond.getPrincipalAddress(networkID);
        const markdown = await bondCalcContract.markdown(assetAddress);

        purchased = await bondCalcContract.valuation(assetAddress, purchased);
        purchased = (markdown / Math.pow(10, 18)) * (purchased / Math.pow(10, 9));
    } else {
        purchased = purchased / Math.pow(10, 18);
    }

    return {
        bond: bond.name,
        bondDiscount,
        bondQuote,
        purchased,
        vestingTerm: Number(terms.vestingTerm),
        maxBondPrice,
        bondPrice: bondPrice / Math.pow(10, 18),
        marketPrice,
        maxBondPriceToken,
    };
});

async function calcIdoBondDetails(
    provider: StaticJsonRpcProvider | JsonRpcProvider,
    networkID: Networks,
    bond: Bond,
    bondContract: Contract,
    amountInWei: BigNumber,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
): Promise<IBondDetails> {
    let depositor = ethers.constants.AddressZero;
    try {
        depositor = await provider.getSigner().getAddress();
    } catch (error) {}

    const addresses = getAddresses(networkID);
    const reserveToken = bond.getPrincipalContract(networkID, provider);
    const bondStruct = await bondContract.bond();

    const maxBondPrice = (await bondContract.maxPayout(depositor)) / Math.pow(10, 9);
    const bondPrice = (await bondContract.bondPriceInUSD()) / Math.pow(10, 18);
    let bondQuote = (await bondContract.payoutFor(amountInWei)) / Math.pow(10, 18);
    bondQuote = Number(bondQuote.toFixed(8));
    const purchased = (await reserveToken.balanceOf(addresses.TREASURY_ADDRESS)) / Math.pow(10, 18);
    const vestingTerm = bondStruct.vestingTerm;

    if (!!amountInWei && bondQuote > maxBondPrice) {
        dispatch(error({ text: messages.try_mint_more(maxBondPrice.toFixed(2).toString()) }));
    }

    return {
        bond: bond.name,
        bondDiscount: 0,
        bondQuote: bondQuote,
        purchased: purchased,
        vestingTerm: vestingTerm,
        maxBondPrice: maxBondPrice,
        bondPrice: bondPrice,
        marketPrice: 0,
        maxBondPriceToken: 1000,
    };
}

interface IBondAsset {
    value: string;
    address: string;
    bond: Bond;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    slippage: number;
    useAvax: boolean;
}
export const bondAsset = createAsyncThunk("bonding/bondAsset", async ({ value, address, bond, networkID, provider, slippage, useAvax }: IBondAsset, { dispatch }) => {
    const depositorAddress = address;
    const acceptedSlippage = slippage / 100 || 0.005;
    const valueInWei = ethers.utils.parseUnits(value, "ether");
    const signer = provider.getSigner();
    const bondContract = bond.getBondContract(networkID, signer);

    let calculatePremium;
    if (bond.isIDO) {
        calculatePremium = await bondContract.bondPrice();
    } else {
        calculatePremium = await bondContract.bondPrice(bond.bid);
    }

    const maxPremium = Math.round(calculatePremium * (1 + acceptedSlippage));

    const addresses = getAddresses(networkID);

    let bondTx;
    try {
        const gasPrice = await getGasPrice(provider);

        if (bond.isIDO) {
            bondTx = await bondContract.deposit(valueInWei, depositorAddress, addresses.DAO_ADDRESS, { gasPrice });
        } else if (useAvax) {
            bondTx = await bondContract.deposit(valueInWei, maxPremium, depositorAddress, bond.bid, addresses.DAO_ADDRESS, { value: valueInWei, gasPrice });
        } else {
            bondTx = await bondContract.deposit(valueInWei, maxPremium, depositorAddress, bond.bid, addresses.DAO_ADDRESS, { gasPrice });
        }
        dispatch(
            fetchPendingTxns({
                txnHash: bondTx.hash,
                text: "Bonding " + bond.displayName,
                type: "bond_" + bond.name,
            }),
        );
        await bondTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
        dispatch(info({ text: messages.your_balance_update_soon }));
        await sleep(10);
        await dispatch(calculateUserBondDetails({ address, bond, networkID, provider }));
        dispatch(info({ text: messages.your_balance_updated }));
        return;
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (bondTx) {
            dispatch(clearPendingTxn(bondTx.hash));
        }
    }
});

interface IRedeemBond {
    address: string;
    bond: Bond;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    autostake: boolean;
}

export const redeemBond = createAsyncThunk("bonding/redeemBond", async ({ address, bond, networkID, provider, autostake }: IRedeemBond, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }

    const signer = provider.getSigner();
    const tellerContract = bond.getTellerContract(networkID, signer);

    let redeemTx;
    try {
        const gasPrice = await getGasPrice(provider);

        //TODO: autostake
        redeemTx = await tellerContract.redeem(address, bond.bid, !autostake, { gasPrice });
        const pendingTxnType = "redeem_bond_" + bond.name + (autostake === true ? "_autostake" : "");
        dispatch(
            fetchPendingTxns({
                txnHash: redeemTx.hash,
                text: "Redeeming " + bond.displayName,
                type: pendingTxnType,
            }),
        );
        await redeemTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
        await sleep(0.01);
        dispatch(info({ text: messages.your_balance_update_soon }));
        await sleep(10);
        await dispatch(calculateUserBondDetails({ address, bond, networkID, provider }));
        await dispatch(getBalances({ address, networkID, provider }));
        dispatch(info({ text: messages.your_balance_updated }));
        return;
    } catch (err: any) {
        metamaskErrorWrap(err, dispatch);
    } finally {
        if (redeemTx) {
            dispatch(clearPendingTxn(redeemTx.hash));
        }
    }
});

export interface IBondSlice {
    loading: boolean;
    [key: string]: any;
}

const initialState: IBondSlice = {
    loading: true,
};

const setBondState = (state: IBondSlice, payload: any) => {
    const bond = payload.bond;
    const newState = { ...state[bond], ...payload };
    state[bond] = newState;
    state.loading = false;
};

const bondingSlice = createSlice({
    name: "bonding",
    initialState,
    reducers: {
        fetchBondSuccess(state, action) {
            state[action.payload.bond] = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(calcBondDetails.pending, state => {
                state.loading = true;
            })
            .addCase(calcBondDetails.fulfilled, (state, action) => {
                setBondState(state, action.payload);
                state.loading = false;
            })
            .addCase(calcBondDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

export default bondingSlice.reducer;

export const { fetchBondSuccess } = bondingSlice.actions;

const baseInfo = (state: RootState) => state.bonding;

export const getBondingState = createSelector(baseInfo, bonding => bonding);
