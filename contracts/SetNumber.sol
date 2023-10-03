// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract SeNumber {
    uint256 private favNum;

    constructor() {
        favNum = 20;
    }

    function setFavNum(uint256 _newFavNum) external {
        favNum = _newFavNum;
    }

    function getFavNum() external returns (uint256) {
        return favNum;
    }
}
