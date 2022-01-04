import { Networks } from "../../constants/blockchain";

export enum BondType {
    StableAsset,
    LP,
    IDO,
}

export interface BondAddresses {
    principal: string;
    reserveAddress: string;
    bondAddress: string;
}

export interface NetworkAddresses {
    [Networks.POLYGON]: BondAddresses;
}
