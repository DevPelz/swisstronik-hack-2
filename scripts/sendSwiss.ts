import { ethers, network } from "hardhat";
import {
  encryptDataField,
  decryptNodeResponse,
} from "@swisstronik/swisstronik.js";
import { HttpNetworkConfig } from "hardhat/types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

const sendShieldedTransaction = async (
  signer: HardhatEthersSigner,
  destination: string,
  data: string,
  value: number
) => {
  // Get the RPC link from the network configuration
  const rpclink = (network.config as HttpNetworkConfig).url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpclink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  // Address of the deployed contract
  const setPassCode = "0x88dA98EC2dadB086d678Bb91E9402BaEC6a635dF";
  const contractFactory = await ethers.getContractAt(
    "ISetPassCode",
    setPassCode
  );

  // Get the signer (your account)
  const [signer] = await ethers.getSigners();

  // Send a shielded transaction to set a message in the contract
  const setNewCode = await sendShieldedTransaction(
    signer,
    setPassCode,
    contractFactory.interface.encodeFunctionData("setNewCode", [
      "NEWSWISSCODE!!!!",
    ]),
    0
  );
  await setNewCode.wait();

  //It should return a TransactionResponse object
  console.log("Transaction Receipt: ", setNewCode);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
