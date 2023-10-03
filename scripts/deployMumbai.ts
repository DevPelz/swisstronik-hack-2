import { ethers } from "hardhat";

async function main() {
  const setNumber = await ethers.deployContract("SeNumber", []);

  await setNumber.waitForDeployment();

  console.log(`SetNumber Contract deployed to ${setNumber.target} on Mumbai`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
