// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Define a contract named Incrementer
contract Incrementer {
    // Declare a public state variable to store the value
    uint256 public value;

    // Function to increment the value by a given amount
    // @param _value The amount to increment the value by
    function increment(uint256 _value) public {
        value += _value; // Add the input value to the current value
    }

    // Function to retrieve the current value
    // @return The current value of the state variable
    function getValue() public view returns (uint256) {
        return value; // Return the stored value
    }
}