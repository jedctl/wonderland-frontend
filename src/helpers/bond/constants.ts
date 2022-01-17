import { Networks } from "../../constants/blockchain";

export enum BondType {
    StableAsset,
    LP,
    IDO,
}

export interface BondAddresses {
    principal: string;
}

export interface NetworkAddresses {
    [Networks.POLYGON]: BondAddresses;
}
