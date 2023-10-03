import { ethers } from "hardhat";

async function main() {
  const contractAddr = "0x88dA98EC2dadB086d678Bb91E9402BaEC6a635dF";

  const contract = await ethers.getContractAt("ISetPassCode", contractAddr);

  console.log("==========Checking storage before changes==========");
  //   eth_getStorageAt() METHODS;

  //   curl 'https://polygon-mumbai.g.alchemy.com/v2/${YOUR_API_KEY' \
  //   -X POST \
  //   -H 'x-amberdata-blockchain-id: mumbai-testnet' \
  //   -d '{"jsonrpc":"2.0","id":1,"method":"eth_getStorageAt","params":["0x88dA98EC2dadB086d678Bb91E9402BaEC6a635dF","0x0","latest"]}'
  console.log("==========Making storage changes==========");
  const setCode = await contract.setNewCode("NewMumbaiPass");
  setCode.wait();
  console.log("===========================================");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
