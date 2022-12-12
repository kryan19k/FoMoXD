// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IFoMoERC721 {
    function foMoXDMint(
        address to,
        uint256 _mintAmount
    ) external payable returns (uint256[] memory);
}
