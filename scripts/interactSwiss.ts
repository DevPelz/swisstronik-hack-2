import { ethers, network } from "hardhat";
import {
  encryptDataField,
  decryptNodeResponse,
} from "@swisstronik/swisstronik.js";
import { HttpNetworkConfig } from "hardhat/types";
import { HardhatEthersProvider } from "@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider";
import { JsonRpcProvider } from "ethers";

const sendShieldedQuery = async (
  provider: JsonRpcProvider | HardhatEthersProvider,
  destination: string,
  data: string
) => {
  const rpclink = (network.config as HttpNetworkConfig).url;
  const [encryptedData, usedEncryptedKey] = await encryptDataField(
    rpclink,
    data
  );
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });
  return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};
async function main() {
  console.log(
    "======================Reading From Storage Slot 0 before running setCode=========================="
  );
  const slot0 = await ethers.provider.getStorage(
    "0x88dA98EC2dadB086d678Bb91E9402BaEC6a635dF",
    "0x0"
  );
  console.log("slot0: ", slot0);
  console.log("==========================================================");

  const contractAddress = "0x88dA98EC2dadB086d678Bb91E9402BaEC6a635dF";
  const [signer] = await ethers.getSigners();
  const contractFactory = await ethers.getContractAt(
    "ISetPassCode",
    contractAddress
  );

  const functionName = "getCode";

  console.log("==================getting new code=======================");
  const setMessageTx = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contractFactory.interface.encodeFunctionData(functionName)
  );

  // Decode the Uint8Array response into a readable string
  console.log(
    "Decoded response:",
    contractFactory.interface.decodeFunctionResult(
      functionName,
      setMessageTx
    )[0]
  );
  console.log("==========================================================");

  console.log(
    "======================Reading Storage Slot 0 After reset=========================="
  );
  const slot0After = await ethers.provider.getStorage(
    "0x88dA98EC2dadB086d678Bb91E9402BaEC6a635dF",
    "0x0"
  );
  console.log("slot0After: ", slot0After);
  console.log("==========================================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
