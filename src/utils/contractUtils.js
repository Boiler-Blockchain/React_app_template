import { ethers } from 'ethers';
import IncrementerABI from './Incrementer.json'

const contractABI = IncrementerABI.abi;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export const connectWallet = async () => {
  if (!window.ethereum) {
      alert("MetaMask is required to use this app.");
      return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []).catch((error) => {
      console.error("MetaMask connection error:", error);
  });

  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

// Utility function: Connect to MetaMask and get contract instance
export const getContract = async () => {
    if (!window.ethereum) {
        alert("MetaMask is required to use this app.");
        return null;
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum); // Updated for Ethers v6
        await provider.send("eth_requestAccounts", []).catch((error) => {
            console.error("MetaMask connection error:", error);
        });

        const signer = await provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
    } catch (error) {
        console.error("Error connecting to contract:", error);
        return null;
    }
};

// Utility function: Increment the on-chain value
export const incrementValue = async (contract, value) => {
  try {
    if (!contract) return false;

    // Make sure value is a number, not the contract object
    if (typeof value !== 'number' && typeof value !== 'string') {
      console.error("❌ Invalid value type:", typeof value);
      alert("Please enter a valid number.");
      return false;
    }

    // ✅ Ensure the value is converted to a proper BigNumberish value
    const incrementAmount = ethers.toBigInt(value);  // Ethers v6 method for BigNumberish conversion
    
    const tx = await contract.increment(incrementAmount);
    await tx.wait();
    return true;  // Success
  } catch (error) {
    console.error('Error incrementing value:', error);
    alert("Transaction failed. See console for details.");
    return false;  // Failure
  }
};

// Utility function: Retrieve the current value
export const getCurrentValue = async (contract) => {
    if (!contract) return 0;

    try {
        const value = await contract.getValue();
        return parseInt(value.toString());  // Convert BigNumber to standard integer
    } catch (error) {
        console.error('Error fetching value:', error);
        return 0;  // Default fallback
    }
};
