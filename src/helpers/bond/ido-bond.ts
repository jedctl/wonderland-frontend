import { ContractInterface } from "ethers";
import { Bond, BondOpts } from "./bond";
import { BondType } from "./constants";
import { Networks } from "../../constants/blockchain";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { getAddresses } from "../../constants/addresses";

export interface IDOBondOpts extends BondOpts {
    readonly reserveContractAbi: ContractInterface;
}

export class IDOBond extends Bond {
    readonly isLP = false;
    readonly isIDO = true;
    readonly reserveContractAbi: ContractInterface;
    readonly displayUnits: string;

    constructor(idoBondOpts: IDOBondOpts) {
        super(BondType.IDO, idoBondOpts);

        // For stable bonds the display units are the same as the actual token
        this.displayUnits = idoBondOpts.displayName;
        this.reserveContractAbi = idoBondOpts.reserveContractAbi;
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

    public getTimeAmount(networkID: Networks, provider: StaticJsonRpcProvider) {
        return new Promise<number>(reserve => reserve(0));
    }
}
