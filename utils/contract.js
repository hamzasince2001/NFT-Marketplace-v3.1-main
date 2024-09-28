import { ethers } from "ethers";
import Web3Moal from "web3modal";

//CHECK WALLET CONNECTION
export const checkIfWalletConnected_NEW = async () => {
  try {
    if (!window.ethereum) return console.log("Install MateMask");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//CONNECT WALLET
export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MateMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    window.location.reload();
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//GET USER BALANCE
export const getBalance = async () => {
  try {
    const web3modal = new Web3Moal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    return await signer.getBalance();
  } catch (error) {
    console.log(error);
  }
};

//FETCH CONTRACT
const FETCH_CONTRACT = (CONTRACT_ADDRESS, CONTRACT_ABI, PROVIDER) =>
  new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, PROVIDER);

//CONNECTING WITH CONTRACT
export const CALLING_CONTRACT = async (CONTRACT_ADDRESS, CONTRACT_ABI) => {
  try {
    const web3modal = new Web3Moal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const PROVIDER = provider.getSigner();

    const contract = FETCH_CONTRACT(CONTRACT_ADDRESS, CONTRACT_ABI, PROVIDER);

    return contract;
  } catch (error) {
    console.log(error);
  }
};
