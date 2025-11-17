import './App.css';
import { useState } from 'react';
import { connectWallet, getCurrentValue, incrementValue } from './utils/contractUtils';

function App() {
  const [curValue, setCurValue] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [txSuccess, setTxSuccess] = useState(false);

  // Connect Wallet & Initialize Contract
  const handleConnectWallet = async () => {
    setIsLoading(true);
    const contractInstance = await connectWallet();
    if (contractInstance) {
      setContract(contractInstance);
      const value = await getCurrentValue(contractInstance);
      setCurValue(value);
      setIsConnected(true);
    }
    setIsLoading(false);
  };

  // Increment function
  const handleIncrement = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTxSuccess(false);

    if (!contract) {
      alert("Please connect your wallet first!");
      setIsLoading(false);
      return;
    }

    const incrementAmount = parseInt(inputValue);

    if (!isNaN(incrementAmount)) {
      const success = await incrementValue(contract, incrementAmount);
      if (success) {
        const updatedValue = await getCurrentValue(contract);
        setCurValue(updatedValue);
        setInputValue('');
        setTxSuccess(true);
        setTimeout(() => setTxSuccess(false), 3000);
      }
    } else {
      alert("Please enter a valid number.");
    }
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <div className="card">
        <div className="header">
          <h1>Counter dApp</h1>
          <p className="subtitle">A simple Web3 Application that increments a value on the blockchain</p>
        </div>

        <div className="wallet-section">
          {!isConnected ? (
            <button 
              className="connect-button" 
              onClick={handleConnectWallet}
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <div className="connected-status">
              <span className="status-dot"></span>
              <span>Wallet Connected</span>
            </div>
          )}
        </div>

        <div className="counter-display">
          <div className="value-label">Current Value</div>
          <div className="value">{curValue}</div>
        </div>

        <form className="increment-form" onSubmit={handleIncrement}>
          <input
            className="value-input"
            type="number"
            placeholder="Enter increment amount"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={!isConnected || isLoading}
          />
          <button 
            className="increment-button" 
            type="submit" 
            disabled={!isConnected || isLoading || inputValue === ''}
          >
            {isLoading ? 'Processing...' : 'Increment'}
          </button>
        </form>

        {txSuccess && (
          <div className="success-message">
            Transaction successful! Value has been incremented.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;