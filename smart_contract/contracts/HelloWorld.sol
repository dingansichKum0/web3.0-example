// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HelloWorld {
    string private _str = "Hello, World!";

    function say() external view returns(string memory) {
        return _str;
    }

    function listen(string calldata arg) external {
        _str = arg;
    }
}
