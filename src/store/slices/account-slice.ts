import { BigNumber, ethers } from "ethers";
import { getAddresses } from "../../constants";
import { QuasTokenContract, SQuasTokenContract, MimTokenContract } from "../../abi";
import { setAll } from "../../helpers";

import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Bond } from "../../helpers/bond/bond";
import { Networks } from "../../constants/blockchain";
import React from "react";
import { RootState } from "../store";
import { IToken } from "../../helpers/tokens";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IAccountBalances {
    balances: {
        squas: number;
        quas: number;
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);

    const squasContract = new ethers.Contract(addresses.SQUAS_ADDRESS, SQuasTokenContract, provider);
    const squasBalance = await squasContract.balanceOf(address);
    const quasContract = new ethers.Contract(addresses.QUAS_ADDRESS, QuasTokenContract, provider);
    const quasBalance = await quasContract.balanceOf(address);

    return {
        balances: {
            squas: Number(ethers.utils.formatUnits(squasBalance, "gwei")),
            quas: Number(ethers.utils.formatUnits(quasBalance, "gwei")),
        },
    };
});

interface ILoadAccountDetails {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IUserAccountDetails {
    balances: {
        squas: number;
        quas: number;
    };
    staking: {
        squas: number;
        quas: number;
    };
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails): Promise<IUserAccountDetails> => {
    let quasBalance = 0;
    let squasBalance = 0;
    let stakeAllowance = 0;
    let unstakeAllowance = 0;

    const addresses = getAddresses(networkID);

    if (addresses.QUAS_ADDRESS) {
        const quasContract = new ethers.Contract(addresses.QUAS_ADDRESS, QuasTokenContract, provider);
        quasBalance = await quasContract.balanceOf(address);
        stakeAllowance = await quasContract.allowance(address, addresses.STAKING_ADDRESS);
    }

    if (addresses.SQUAS_ADDRESS) {
        const squasContract = new ethers.Contract(addresses.SQUAS_ADDRESS, SQuasTokenContract, provider);
        squasBalance = await squasContract.balanceOf(address);
        unstakeAllowance = await squasContract.allowance(address, addresses.STAKING_ADDRESS);
    }

    return {
        balances: {
            quas: Number(ethers.utils.formatUnits(quasBalance, "gwei")),
            squas: Number(ethers.utils.formatUnits(squasBalance, "gwei")),
        },
        staking: {
            quas: Number(stakeAllowance),
            squas: Number(unstakeAllowance),
        },
    };
});

interface ICalcUserBondDetails {
    address: string;
    bond: Bond;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserBondDetails {
    allowance: number;
    balance: number;
    avaxBalance: number;
    interestDue: number;
    bondMaturationBlock: number;
    pendingPayout: number; //Payout formatted in gwei.
    pendingStakingRewards: number;
    pendingTotal: number;
    lockedRewards: number;
    lockedStakingRewards: number;
    lockedTotal: number;
    claimedRewards: number;
}

export const calculateUserBondDetails = createAsyncThunk("account/calculateUserBondDetails", async ({ address, bond, networkID, provider }: ICalcUserBondDetails) => {
    if (!address) {
        return new Promise<any>(resevle => {
            resevle({
                bond: "",
                displayName: "",
                bondIconSvg: "",
                isLP: false,
                allowance: 0,
                balance: 0,
                interestDue: 0,
                bondMaturationBlock: 0,
                pendingPayout: 0,
                pendingStakingRewards: 0,
                pendingTotal: 0,
                avaxBalance: 0,
                lockedRewards: 0,
                lockedStakingRewards: 0,
                lockedTotal: 0,
                claimedRewards: 0,
            });
        });
    }

    const bondContract = bond.getBondContract(networkID, provider);
    const bondTeller = bond.getTellerContract(networkID, provider);
    const reserveContract = bond.getPrincipalContract(networkID, provider);

    const bondDetails = await bondTeller.bonderInfo(address, BigNumber.from(bond.bid));

    const bondMaturationTimestamp = Number(bondDetails.vested);

    const payoutInfo = await bondTeller.payoutInfo(address, bond.bid);
    const lockedPayout = Number(ethers.utils.formatUnits(payoutInfo.lockedPayout, "gwei"));
    const lockedStakingRewards = Number(ethers.utils.formatUnits(payoutInfo.lockedStakingRewards, "gwei"));
    const pendingPayout = Number(ethers.utils.formatUnits(payoutInfo.pendingPayout, "gwei"));
    const pendingStakingRewards = Number(ethers.utils.formatUnits(payoutInfo.pendingStakingRewards, "gwei"));

    let allowance,
        balance = "0";

    allowance = await reserveContract.allowance(address, bond.getBondAddress(networkID));
    balance = await reserveContract.balanceOf(address);
    const balanceVal = ethers.utils.formatEther(balance);

    const avaxBalance = await provider.getSigner().getBalance();
    const avaxVal = ethers.utils.formatEther(avaxBalance);

    return {
        bond: bond.name,
        displayName: bond.displayName,
        bondIconSvg: bond.bondIconSvg,
        isLP: bond.isLP,
        allowance: Number(allowance),
        balance: Number(balanceVal),
        avaxBalance: Number(avaxVal),
        interestDue: pendingPayout,
        bondMaturationBlock: bondMaturationTimestamp,
        pendingPayout: pendingPayout,
        pendingStakingRewards: pendingStakingRewards,
        pendingTotal: pendingPayout + pendingStakingRewards,
        lockedRewards: lockedPayout,
        lockedStakingRewards: lockedStakingRewards,
        lockedTotal: lockedPayout + lockedStakingRewards,
        claimedRewards: 0,
    };
});

interface ICalcUserTokenDetails {
    address: string;
    token: IToken;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserTokenDetails {
    allowance: number;
    balance: number;
    isAvax?: boolean;
}

export const calculateUserTokenDetails = createAsyncThunk("account/calculateUserTokenDetails", async ({ address, token, networkID, provider }: ICalcUserTokenDetails) => {
    if (!address) {
        return new Promise<any>(resevle => {
            resevle({
                token: "",
                address: "",
                img: "",
                allowance: 0,
                balance: 0,
            });
        });
    }

    if (token.isAvax) {
        const avaxBalance = await provider.getSigner().getBalance();
        const avaxVal = ethers.utils.formatEther(avaxBalance);

        return {
            token: token.name,
            tokenIcon: token.img,
            balance: Number(avaxVal),
            isAvax: true,
        };
    }

    const addresses = getAddresses(networkID);

    const tokenContract = new ethers.Contract(token.address, MimTokenContract, provider);

    let allowance,
        balance = "0";

    allowance = await tokenContract.allowance(address, addresses.ZAPIN_ADDRESS);
    balance = await tokenContract.balanceOf(address);

    const balanceVal = Number(balance) / Math.pow(10, token.decimals);

    return {
        token: token.name,
        address: token.address,
        img: token.img,
        allowance: Number(allowance),
        balance: Number(balanceVal),
    };
});

export interface IAccountSlice {
    bonds: { [key: string]: IUserBondDetails };
    balances: {
        squas: number;
        quas: number;
    };
    loading: boolean;
    staking: {
        squas: number;
        quas: number;
    };
    tokens: { [key: string]: IUserTokenDetails };
}

const initialState: IAccountSlice = {
    loading: true,
    bonds: {},
    balances: { squas: 0, quas: 0 },
    staking: { quas: 0, squas: 0 },
    tokens: {},
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccountDetails.pending, state => {
                state.loading = true;
            })
            .addCase(loadAccountDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAccountDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(getBalances.pending, state => {
                state.loading = true;
            })
            .addCase(getBalances.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(getBalances.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserBondDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const bond = action.payload.bond;
                state.bonds[bond] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserTokenDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserTokenDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const token = action.payload.token;
                state.tokens[token] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserTokenDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
