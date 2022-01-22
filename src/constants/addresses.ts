import { Networks } from "./blockchain";

const POLYGON_MAINNET = {
    DAO_ADDRESS: "0x38c7D7a3378B6FbF44f2B1c24073e036D501F0da",
    QUAS_ADDRESS: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    SQUAS_ADDRESS: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    STAKING_ADDRESS: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    BONDING_CALCULATOR_ADDRESS: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    TREASURY_ADDRESS: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    BONDING_DEPOSITORY: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
    IDO_BONDING_DEPOSITORY: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
    BONDING_TELLER: "0x79c39123c36d6A18B2286Fb49c40c848D92e3834",
    ZAPIN_ADDRESS: "0xc669dC61aF974FdF50758d95306e4083D36f1430",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.POLYGON) return POLYGON_MAINNET;

    throw Error("Network don't support");
};
