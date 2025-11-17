require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/we-23JqpZ8csESTdtBTfKmkxS5sAefzU",   // Direct RPC URL (no Infura/Alchemy required)
      accounts: [`0x${process.env.PRIVATE_KEY}`],  // Store your wallet's private key in `.env`
      timeout: 200000
    }
  }
};
