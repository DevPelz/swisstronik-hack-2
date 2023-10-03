import { ethers } from "hardhat";

async function main() {
  const setPassCode = await ethers.deployContract("SetPassCode", [
    "SwisstronikCode",
  ]);

  await setPassCode.waitForDeployment();

  console.log(
    `SetPassCode Contract deployed to ${setPassCode.target} on swisstronik`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
