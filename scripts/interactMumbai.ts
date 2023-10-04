import { ethers } from "hardhat";

async function main() {
  const contractAddr = "0x88dA98EC2dadB086d678Bb91E9402BaEC6a635dF";

  const contract = await ethers.getContractAt("ISetPassCode", contractAddr);

  console.log("==========Checking storage before changes==========");
  const slot0 = await ethers.provider.getStorage(
    "0x88dA98EC2dadB086d678Bb91E9402BaEC6a635dF",
    "0x0"
  );
  console.log("slot0: ", slot0);
  console.log("===================================================");

  console.log("==========Making storage changes==========");
  const setCode = await contract.setNewCode("NewMumbaiPassCode@@###D$");
  setCode.wait();
  console.log("===========================================");

  console.log("==========Checking storage with function==========");
  const getCode = await contract.getCode();
  console.log("getCode: ", getCode);
  console.log("===================================================");

  // Comment previous console.log and uncomment this to see the storage changes

  // console.log("==========Checking storage after changes==========");
  // const slot0After = await ethers.provider.getStorage(
  //   "0x88dA98EC2dadB086d678Bb91E9402BaEC6a635dF",
  //   "0x0"
  // );
  // console.log("slot0After: ", slot0After);
  // console.log("===================================================");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
