import { Contract, ContractInterface } from "ethers";
import { Bond, BondOpts } from "./bond";
import { BondType } from "./constants";
import { Networks } from "../../constants/blockchain";
import { JsonRpcSigner, StaticJsonRpcProvider } from "@ethersproject/providers";
import { getAddresses } from "../../constants/addresses";
import { IDOBondingDepository } from "../../abi";
import { StableReserveContract } from "../../abi";

export interface IDOBondOpts extends BondOpts {
    readonly reserveContractAbi: ContractInterface;
}

export class IDOBond extends Bond {
    readonly isLP = false;
    readonly isIDO = true;
    readonly reserveContractAbi: ContractInterface = StableReserveContract;
    public readonly bondContractABI: ContractInterface = IDOBondingDepository; // Bond ABI
    readonly displayUnits: string;

    constructor(idoBondOpts: BondOpts) {
        super(BondType.IDO, idoBondOpts);

        // For stable bonds the display units are the same as the actual token
        this.displayUnits = idoBondOpts.displayName;
    }

    public async getTreasuryBalance(networkID: Networks, provider: StaticJsonRpcProvider) {
        const addresses = getAddresses(networkID);
        const token = this.getPrincipalContract(networkID, provider);
        const tokenAmount = await token.balanceOf(addresses.TREASURY_ADDRESS);
        return tokenAmount / Math.pow(10, 18);
    }

    public async getTokenAmount(networkID: Networks, provider: StaticJsonRpcProvider) {
        return this.getTreasuryBalance(networkID, provider);
    }

    public getQuasAmount(networkID: Networks, provider: StaticJsonRpcProvider) {
        return new Promise<number>(reserve => reserve(0));
    }

    public getBondAddress(networkID: Networks) {
        return getAddresses(networkID).IDO_BONDING_DEPOSITORY;
    }

    public getBondContract(networkID: Networks, provider: StaticJsonRpcProvider | JsonRpcSigner) {
        const bondAddress = this.getBondAddress(networkID);
        return new Contract(bondAddress, this.bondContractABI, provider);
    }
}
