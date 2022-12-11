// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract PlayerBook {
    uint256 public pID_; // total number of players
    uint256 public gID_; // total number of games
    struct Player {
        address addr;
        bytes32 name;
        uint256 names;
    }
    mapping(address => uint256) public gameIDs_; // lokup a games ID
    mapping(uint256 => Player) public player_; // (pID => data) player data
    mapping(address => uint256) public playerIDxAddr_; // (addr => pID) returns player id by address

    constructor() {}

    function determinePID(address _addr) private returns (bool) {
        if (playerIDxAddr_[_addr] == 0) {
            pID_++;
            playerIDxAddr_[_addr] = pID_;
            player_[pID_].addr = _addr;

            // set the new player bool to true
            return (true);
        } else {
            return (false);
        }
    }

    function getPlayerID(address _addr) external returns (uint256) {
        determinePID(_addr);
        return (playerIDxAddr_[_addr]);
    }

    function getPlayerName(uint256 _pID) external view returns (bytes32) {
        return (player_[_pID].name);
    }

    function getPlayerAddr(uint256 _pID) external view returns (address) {
        return (player_[_pID].addr);
    }
}
