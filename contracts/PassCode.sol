// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

/// @title SetPassCode - A smart contract for managing passcodes securely.
/// @notice This contract allows users to set and retrieve passcodes.
/// @dev All functions and data are stored on the blockchain.
contract SetPassCode {
    /// @notice The passcode stored in the contract.
    /// @dev This passcode is kept private and can be updated.

    string private passCode;

    /// @notice Initializes the contract with an initial passcode.
    /// @param _passCode The initial passcode to set.
    constructor(string memory _passCode) {
        passCode = _passCode;
    }

    /// @notice Sets a new passcode if it is different from the current one.
    /// @dev This function checks if the new passcode is different from the current one.
    /// If it's the same, it reverts with an error message.
    /// @param _newCode The new passcode to set.
    function setNewCode(string memory _newCode) external {
        if (
            keccak256(abi.encodePacked(passCode)) ==
            keccak256(abi.encodePacked(_newCode))
        ) {
            revert("Pass code already exists");
        }
        passCode = _newCode;
    }

    /// @notice Retrieves the current passcode.
    /// @return The current passcode stored in the contract.
    function getCode() external view returns (string memory) {
        return passCode;
    }
}
