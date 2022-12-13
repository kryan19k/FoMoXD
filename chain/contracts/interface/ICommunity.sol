// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface ICommunity {
    function deposit() external payable returns (bool);

    function isDev(address _who) external view returns (bool);
}
