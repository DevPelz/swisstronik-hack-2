// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

interface ISetPassCode {
    function setNewCode(string memory _newCode) external;

    function getCode() external view returns (string memory);
}
