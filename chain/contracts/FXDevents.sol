// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FXDevents {
    event NewEndTime(uint256 timeStamp);

    event onWithdraw(
        uint256 indexed playerID,
        address playerAddress,
        uint256 ethOut
        // bytes32 playerName
    );

    event onBuyPuff(
        uint256 indexed playerId,
        address playerAddress,
        uint256 ethIn,
        uint256 puffssBought,
        uint256 amountWon,
        uint256 P3DShare,
        uint256 generalShare,
        uint256 airDropPotShare,
        uint256 potShare
    );

    event onEndRound(
        uint256 indexed roundId,
        uint256 indexed winnerId,
        uint256 winnerTeamId,
        uint256 endTime,
        uint256 _generalShare,
        uint256 _winnerShare
    );

    event onEthAirdrop(uint256 indexed playerID, uint256 prize);

    event onNftAirdrop(
        uint256 indexed roundId,
        address indexed playerAddr,
        uint256[] tokenIds
    );
}
