import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
// import { daiQuas } from "../helpers/bond";
import { Networks } from "../constants/blockchain";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    // const daiQuasAddress = daiQuas.getAddressForReserve(networkID);
    // const pairContract = new ethers.Contract(daiQuasAddress, LpReserveContract, provider);
    // const reserves = await pairContract.getReserves();
    // const marketPrice = reserves[0] / reserves[1];
    return 0;
}
