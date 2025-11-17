# Counter dApp

A modern Web3 decentralized application (dApp) that demonstrates blockchain interaction using React and Hardhat. This project allows users to connect their MetaMask wallet and increment a counter value stored on the Ethereum blockchain.

## 🚀 Features

- **Wallet Integration**: Connect via MetaMask
- **Smart Contract Interaction**: Read and write operations to an Ethereum smart contract
- **Real-time Updates**: Display current counter value from the blockchain
- **Modern UI**: Clean, responsive interface with loading states and success notifications
- **Ethereum Networks**: Configured for Sepolia testnet deployment

## 📋 Prerequisites

Before running this application, make sure you have:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MetaMask](https://metamask.io/) browser extension
- A wallet with Sepolia testnet ETH (get free testnet ETH from a [Sepolia faucet](https://sepoliafaucet.com/))

## 🛠️ Tech Stack

- **Frontend**: React 19, Ethers.js v6
- **Smart Contracts**: Solidity 0.8.0, Hardhat
- **Styling**: Modern CSS with custom properties
- **Network**: Ethereum Sepolia Testnet

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd counter
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PRIVATE_KEY=your_wallet_private_key_without_0x
REACT_APP_CONTRACT_ADDRESS=deployed_contract_address
```

## 🔧 Smart Contract

The `Incrementer` smart contract is located in `contracts/Contract.sol`:

```solidity
contract Incrementer {
    uint256 public value;
    
    function increment(uint256 _value) public;
    function getValue() public view returns (uint256);
}
```

### Compile Contracts

```bash
npx hardhat compile
```

### Deploy to Sepolia Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

After deployment, copy the contract address and add it to your `.env` file:
```env
REACT_APP_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

### Deploy to Local Network

1. Start a local Hardhat node:
```bash
npx hardhat node
```

2. Deploy to local network (in a new terminal):
```bash
npx hardhat run scripts/deploy.js --network localhost
```

## 🚀 Running the Application

1. Make sure your contract is deployed and the address is in `.env`

2. Copy the contract ABI to the src directory:
```bash
mkdir -p src/artifacts/contracts/Contract.sol
cp artifacts/contracts/Contract.sol/Incrementer.json src/artifacts/contracts/Contract.sol/
```

3. Start the React development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

5. Connect your MetaMask wallet and start interacting with the dApp!

## 📁 Project Structure

```
counter/
├── contracts/              # Solidity smart contracts
│   └── Contract.sol       # Incrementer contract
├── scripts/               # Deployment scripts
│   └── deploy.js         # Contract deployment script
├── src/
│   ├── utils/            # Utility functions
│   │   └── contractUtils.js  # Web3 interaction logic
│   ├── App.js            # Main React component
│   └── App.css           # Styling
├── hardhat.config.js     # Hardhat configuration
└── package.json          # Dependencies and scripts
```

## 🎯 How to Use

1. **Connect Wallet**: Click "Connect Wallet" to connect your MetaMask
2. **View Current Value**: The current counter value from the blockchain is displayed
3. **Increment**: Enter a number and click "Increment" to add it to the counter
4. **Confirm Transaction**: Approve the transaction in MetaMask
5. **See Results**: Wait for the transaction to confirm and see the updated value

## 🔑 Key Functions

### Frontend (`src/utils/contractUtils.js`)

- `connectWallet()`: Connects to MetaMask and returns contract instance
- `incrementValue(contract, value)`: Sends transaction to increment counter
- `getCurrentValue(contract)`: Reads current value from blockchain

### Smart Contract (`contracts/Contract.sol`)

- `increment(uint256 _value)`: Adds value to the counter
- `getValue()`: Returns current counter value
- `value`: Public state variable storing the counter

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🔐 Security Notes

- Never commit your `.env` file or private keys to version control
- Always use testnet ETH for testing
- Verify contracts on Etherscan after deployment for transparency

## 📝 Available Scripts

### React Scripts

- `npm start`: Run development server
- `npm test`: Run test suite
- `npm run build`: Build for production

### Hardhat Scripts

- `npx hardhat compile`: Compile smart contracts
- `npx hardhat test`: Run contract tests
- `npx hardhat node`: Start local blockchain
- `npx hardhat run scripts/deploy.js --network <network>`: Deploy contracts

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License.

## 🌐 Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [React Documentation](https://react.dev/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [MetaMask Documentation](https://docs.metamask.io/)
