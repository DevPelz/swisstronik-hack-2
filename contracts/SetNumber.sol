// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract SetPassCode {
    string private passCode;

    constructor(string memory _passCode) {
        passCode = _passCode;
    }

    function setNewCode(string memory _newCode) external {
        if (
            keccak256(abi.encodePacked(passCode)) ==
            keccak256(abi.encodePacked(_newCode))
        ) {
            revert("Pass code already exists");
        }
        passCode = _newCode;
    }

    function getCode() external view returns (string memory) {
        return passCode;
    }
}
