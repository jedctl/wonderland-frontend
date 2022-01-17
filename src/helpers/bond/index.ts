import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";
import { IDOBond } from "./ido-bond";

import MimIcon from "../../assets/tokens/MIM.svg";
import AvaxIcon from "../../assets/tokens/AVAX.svg";
import MimTimeIcon from "../../assets/tokens/TIME-MIM.svg";
import AvaxTimeIcon from "../../assets/tokens/TIME-AVAX.svg";

import bondSlice from "src/store/slices/bond-slice";
import { Bond } from "./bond";

export const dai = new StableBond({
    bid: 0,
    name: "dai",
    displayName: "DAI",
    bondToken: "DAI",
    bondIconSvg: MimIcon,
    networkAddrs: {
        [Networks.POLYGON]: {
            principal: "0x70e0bA845a1A0F2DA3359C97E0285013525FFC49",
        },
    },
});

// export const ido = new IDOBond({
//     name: "ido_dai",
//     displayName: "DAI",
//     bondToken: "MIM",
//     bondIconSvg: MimTimeIcon,
//     bondContractABI: IdoBondContract,
//     reserveContractAbi: LpReserveContract,
//     networkAddrs: {
//         [Networks.POLYGON]: {
//             bondAddress: "0x1D91Ec083678452293cd2FaBBfDAab7C0566B123",
//             reserveAddress: "0x4d5Fb365f774fe0113D8b93B13569edc3d600719",
//         },
//     },
// });

// export const daiQuas = new LPBond({
//     name: "mim_time_lp",
//     displayName: "QUAS-DAI LP",
//     bondToken: "MIM",
//     bondIconSvg: MimTimeIcon,
//     bondContractABI: LpBondContract,
//     reserveContractAbi: LpReserveContract,
//     networkAddrs: {
//         [Networks.POLYGON]: {
//             bondAddress: "0xf26E4EFB874912850cE7f384C691C6b5D8DCBDa0",
//             reserveAddress: "0x4d5Fb365f774fe0113D8b93B13569edc3d600719",
//         },
//     },
//     lpUrl: "https://www.traderjoexyz.com/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
// });

// export const fraxDai = new LPBond({
//     name: "frax_dai_lp",
//     displayName: "FRAX-DAI LP",
//     bondToken: "MIM",
//     bondIconSvg: MimTimeIcon,
//     bondContractABI: LpBondContract,
//     reserveContractAbi: LpReserveContract,
//     networkAddrs: {
//         [Networks.POLYGON]: {
//             bondAddress: "0x9D56Ea7546C6d814A246bAb73Da16A687F4a163B",
//             reserveAddress: "0x380572d318ca43771656e74aa1ccb5243331ec9b",
//         },
//     },
//     lpUrl: "https://www.traderjoexyz.com/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
// });

// export const wavax = new CustomBond({
//     name: "wavax",
//     displayName: "wAVAX",
//     bondToken: "AVAX",
//     bondIconSvg: AvaxIcon,
//     bondContractABI: WavaxBondContract,
//     reserveContractAbi: StableReserveContract,
//     networkAddrs: {
//         [Networks.POLYGON]: {
//             bondAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318",
//             reserveAddress: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
//         },
//     },
// });

// export const avaxTime = new CustomLPBond({
//     name: "avax_time_lp",
//     displayName: "TIME-AVAX LP",
//     bondToken: "AVAX",
//     bondIconSvg: AvaxTimeIcon,
//     bondContractABI: LpBondContract,
//     reserveContractAbi: LpReserveContract,
//     networkAddrs: {
//         [Networks.POLYGON]: {
//             bondAddress: "0xc26850686ce755FFb8690EA156E5A6cf03DcBDE1",
//             reserveAddress: "0xf64e1c5B6E17031f5504481Ac8145F4c3eab4917",
//         },
//     },
//     lpUrl: "https://www.traderjoexyz.com/#/pool/AVAX/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
// });

const bonds: Bond[] = [dai];
export default bonds;
