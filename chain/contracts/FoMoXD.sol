// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interface/IDivies.sol";
import "./interface/IOtherFoMoXD.sol";
import "./interface/ICommunity.sol";
import "./interface/IPlayerBook.sol";

import "./library/FXDPuffsCalc.sol";
import "./library/FXDdatasets.sol";

import "./FXDevents.sol";
import "./FoMoERC721.sol";
import "./NumOracle.sol";
import "./PXD.sol";

import "hardhat/console.sol";

contract FoMoXD is FXDevents {
    using FXDPuffsCalc for uint256;
    /* ------------------------------------------------------ */
    /*                        CONTRACT
    /* ------------------------------------------------------ */
    IPlayerBook public PlayerBook_;
    ICommunity public Community_;
    FoMoERC20 public FoMoERC20_;
    FoMoERC721 public FoMoERC721_;
    IDivies public Divies_;
    IOtherFoMoXD public OtherFXD_;
    NumOracle public Oracle_;
    /* ------------------------------------------------------ */
    /*                      CONFIGURATION                     */
    /* ------------------------------------------------------ */
    address public owner;
    string public constant name = "FoMoXD Official";
    string public constant symbol = "FXD";
    uint256 public constant earlyRoundPlayerMaxEth_ = 1000000000000000000;
    uint256 public constant earlyRoundEthThrottle_ = 100000000000000000000;
    uint256 public constant airDropNFTThrottle_ = 1000000000;
    uint256 public constant airDropEthThrottle_ = 100000000000000000; // 0.1 eth
    uint256 public constant wholePuffQty_ = 1000000000000000000;
    uint256 public constant minETHAllowed_ = 1000000000; // 1 Gwei
    /* --------------------- Round Timer -------------------- */
    uint256 public constant roundInitTime_ = 5 minutes; // round timer starts at this
    uint256 public constant roundIncTime_ = 30 seconds; // every full key purchased adds this much to the timer
    uint256 public constant roundMaxTime_ = 5 minutes; // max length a round timer can be
    uint256 public roundGapTime_ = 1 minutes;
    /* ------------------------------------------------------ */
    /*                         STORAGE                        */
    /* ------------------------------------------------------ */
    uint256 public roundID_; // round id number / total rounds that have happened
    bool public activated_; // round id number / total rounds that have happened
    /* ----------------------- Airdrop ---------------------- */
    uint256 public airDropPot_; // person who gets the airdrop wins part of this pot
    /* --------------------- Player Data --------------------- */
    // (addr => pID) returns player id by address
    mapping(address => uint256) public playerIDxAddr_;
    // (pID => data) player data
    mapping(uint256 => FXDdatasets.Player) public player_;
    // (pID => rID => data) player round data by player id & round id
    mapping(uint256 => mapping(uint256 => FXDdatasets.PlayerRounds))
        public playerRoundsData_;
    /* --------------------- Round Data --------------------- */
    // (rID => data) round data
    mapping(uint256 => FXDdatasets.Round) public roundData_;
    // (rID => tID => data) eth in per team, by round id and team id
    mapping(uint256 => mapping(FXDdatasets.Teams => uint256))
        public roundTeamEth_;
    /* --------------------- Team Fee & Share -------------------- */
    // (team => fees) fee distribution by team
    mapping(FXDdatasets.Teams => FXDdatasets.TeamFee) public fees_;
    // (team => fees) pot split distribution by team
    mapping(FXDdatasets.Teams => FXDdatasets.PotSplit) public potSplit_;

    /* ------------------------------------------------------ */
    /*                        MODIFIER                        */
    /* ------------------------------------------------------ */
    modifier isActivated() {
        require(
            activated_ == true,
            "its not ready yet.  check ?eta in discord"
        );
        _;
    }

    modifier isWithinLimits(uint256 _eth) {
        require(_eth >= minETHAllowed_, "pocket lint: not a valid currency");
        require(_eth <= 100000000000000000000000, "no vitalik, no");
        _;
    }

    modifier onlyHuman(address sender) {
        uint256 size;
        assembly {
            size := extcodesize(sender)
        }
        require(size == 0, "Only Human pls...");
        _;
    }

    modifier onlyDevs() {
        require(msg.sender == owner, "only team just can activate");
        _;
    }

    /* ------------------------------------------------------ */
    /*                        FUNCTIONS
    /* ------------------------------------------------------ */
    constructor(
        IPlayerBook _playerBook,
        ICommunity _community,
        FoMoERC20 _foMoERC20,
        FoMoERC721 _foMoERC721,
        IDivies _divies,
        NumOracle _oracle
    ) {
        PlayerBook_ = _playerBook;
        Community_ = _community;
        FoMoERC20_ = _foMoERC20;
        FoMoERC721_ = _foMoERC721;
        Divies_ = _divies;
        Oracle_ = _oracle;
        owner = msg.sender;

        // Team allocation percentages
        // (F3D, P3D) + (Pot , Referrals, Community)
        // Referrals / Community rewards are mathematically designed to come from the winner's share of the pot.
        //50% to pot, 10% to aff, 2% to com, 1% to pot swap, 1% to air drop pot
        fees_[FXDdatasets.Teams.CHOCO] = FXDdatasets.TeamFee(30, 6);
        //43% to pot, 10% to aff, 2% to com, 1% to pot swap, 1% to air drop pot
        fees_[FXDdatasets.Teams.BANA] = FXDdatasets.TeamFee(43, 0);
        //20% to pot, 10% to aff, 2% to com, 1% to pot swap, 1% to air drop pot
        fees_[FXDdatasets.Teams.BERRY] = FXDdatasets.TeamFee(56, 10);
        //35% to pot, 10% to aff, 2% to com, 1% to pot swap, 1% to air drop pot
        fees_[FXDdatasets.Teams.KIWI] = FXDdatasets.TeamFee(43, 8);

        // how to split up the final pot based on which team was picked
        // (F3D, P3D)
        //48% to winner, 25% to next round, 2% to com
        potSplit_[FXDdatasets.Teams.CHOCO] = FXDdatasets.PotSplit(15, 10);
        //48% to winner, 25% to next round, 2% to com
        potSplit_[FXDdatasets.Teams.BANA] = FXDdatasets.PotSplit(25, 0);
        //48% to winner, 10% to next round, 2% to com
        potSplit_[FXDdatasets.Teams.BERRY] = FXDdatasets.PotSplit(20, 20);
        //48% to winner, 10% to next round, 2% to com
        potSplit_[FXDdatasets.Teams.KIWI] = FXDdatasets.PotSplit(30, 10);
    }

    receive() external payable {
        buyPuffXAddr(FXDdatasets.Teams.CHOCO);
    }

    fallback() external payable {
        buyPuffXAddr(FXDdatasets.Teams.CHOCO);
    }

    /* ------------------------------------------------------ */
    /*                   INTERNAL FUNCTIONS
    /* ------------------------------------------------------ */
    function buyPuffXAddr(
        FXDdatasets.Teams _team
    )
        public
        payable
        isActivated
        onlyHuman(msg.sender)
        isWithinLimits(msg.value)
        returns (uint256 _playerID)
    {
        determinePID();
        uint256 _playerID = playerIDxAddr_[msg.sender];
        _buyPuff(_playerID, _team);
    }

    function _buyPuff(uint256 _playerID, FXDdatasets.Teams _team) internal {
        uint256 _rID = roundID_;
        uint256 _now = block.timestamp;
        if (
            _now <= roundData_[_rID].endTime ||
            (_now > roundData_[_rID].endTime && roundData_[_rID].winnerId == 0)
        ) {
            _buyPuffCore(_rID, _playerID, msg.value, _team);
        } else {
            if (
                _now > roundData_[_rID].endTime &&
                roundData_[_rID].ended == false
            ) {
                roundData_[_rID].ended = true;
                endRound();
            }
            // refund
            player_[_playerID].generalVault += msg.value;
        }
    }

    function _buyPuffCore(
        uint256 _rID,
        uint256 _pID,
        uint256 _eth,
        FXDdatasets.Teams _teamID
    ) private {
        /* -------------- if player is new to round ------------- */
        if (playerRoundsData_[_pID][_rID].puffs == 0) {
            // TODO: 送 NFT
            managePlayer(_pID);
        }
        /* --------------- early round eth limiter -------------- */
        if (
            roundData_[_rID].eth < earlyRoundEthThrottle_ &&
            playerRoundsData_[_pID][_rID].eth + _eth > earlyRoundPlayerMaxEth_
        ) {
            uint256 _availableLimit = earlyRoundPlayerMaxEth_ -
                playerRoundsData_[_pID][_rID].eth;
            uint256 _refund = _eth - _availableLimit;
            player_[_pID].generalVault = player_[_pID].generalVault + _refund;
            _eth = _availableLimit;
        }
        require(
            _eth > minETHAllowed_,
            "pocket lint: eth left is greater than min eth allowed (sorry no pocket lint)"
        );

        /* ----------------- mint the new puffs ----------------- */
        uint256 _puffs = (roundData_[_rID].eth).puffsReceive(_eth);
        /* --------- if they bought at least 1 whole key -------- */
        if (_puffs >= wholePuffQty_) {
            updateTimer(_puffs, _rID);
            // set new leaders
            if (roundData_[_rID].winnerId != _pID) {
                roundData_[_rID].winnerId = _pID;
            }
            if (roundData_[_rID].winnerTeamId != _teamID) {
                roundData_[_rID].winnerTeamId = _teamID;
            }
        }

        uint256 _prize;
        /* ------------------- manage airdrops ------------------ */
        if (_eth >= airDropEthThrottle_) {
            if (Oracle_.isAirdrop() == true) {
                _prize = (airDropPot_ * getAirDropPercentByEth(_eth)) / 100;

                player_[_pID].winningVault += _prize;
                airDropPot_ -= _prize;

                emit onEthAirdrop(_pID, _prize);
            }
        }

        if (_eth >= airDropNFTThrottle_ && _prize == 0) {
            if (Oracle_.isAirdropNfts() == true) {
                FoMoERC721_.foMoXDMint(msg.sender, 1);
                roundData_[_rID].nfts += 1;
                emit onNftAirdrop(_rID, msg.sender, 1);
            }
        }
        /* ------------- update player & round state ------------ */
        // update player
        playerRoundsData_[_pID][_rID].puffs += _puffs;
        playerRoundsData_[_pID][_rID].eth += _eth;

        // update round
        roundData_[_rID].puffs += _puffs;
        roundData_[_rID].eth += _eth;
        roundTeamEth_[_rID][_teamID] += _eth;

        /* --------------------- distribute --------------------- */
        (
            uint256 _communityShare,
            uint256 _p3dShare,
            uint256 _otherPXDShare
        ) = distributeExternal(_rID, _pID, _eth, _teamID);

        (
            uint256 _generalShare,
            uint256 _airShare,
            uint256 _potShare
        ) = distributeInternal(_rID, _pID, _eth, _teamID, _puffs);

        emit onBuyPuff(
            _pID,
            msg.sender,
            _eth,
            _puffs,
            _prize,
            _p3dShare,
            _generalShare,
            _airShare,
            _potShare
        );
    }

    /**
     * @dev ends the round. manages paying out winner/splitting up pot
     */
    function endRound() private {
        // setup local rID
        uint256 _rID = roundID_;

        // grab our winning player and team id's
        uint256 _winPID = roundData_[_rID].winnerId;
        FXDdatasets.Teams _winTID = roundData_[_rID].winnerTeamId;

        // grab our pot amount
        uint256 _pot = roundData_[_rID].pot;

        // calculate our winner share, community rewards, generalShare share,
        // pXd share, and amount reserved for next pot

        /* ------------------- External share ------------------- */
        uint256 _communityShare = (_pot / 50);
        uint256 _pXdShare = (_pot * potSplit_[_winTID].pXdShare) / 100;
        /* ------------------- Internal Share ------------------- */
        uint256 _generalShare = (_pot * potSplit_[_winTID].generalShare) / 100;
        uint256 _winnerShare = (_pot * 48) / 100;

        uint256 _resShare = _pot -
            _winnerShare -
            _communityShare -
            _generalShare -
            _pXdShare; // 💰 分完後的餘額

        // calculate ppt for round mask
        // calc profit per key & round mask based on this buy:  (dust goes to pot)
        uint256 expotions = 1000000000000000000;
        uint256 _profitPerPuff = (_generalShare * (expotions)) /
            (roundData_[_rID].puffs);
        uint256 _dust = _generalShare -
            ((_profitPerPuff * (roundData_[_rID].puffs)) / expotions);
        if (_dust > 0) {
            _generalShare = _generalShare - _dust;
            _resShare = _resShare + _dust;
        }

        player_[_winPID].winningVault += _winnerShare;

        if (!Community_.deposit{value: _communityShare}()) {
            _pXdShare = _pXdShare + _communityShare;
            _communityShare = 0;
        }

        // distribute generalShare portion to key holders
        roundData_[_rID].mask += _profitPerPuff;

        // send share for pXd to divies
        if (_pXdShare > 0) {
            Divies_.deposit{value: _pXdShare}();
        }

        // start next round
        roundID_++;
        _rID++;
        roundData_[_rID].startTime = block.timestamp;
        roundData_[_rID].endTime =
            block.timestamp +
            roundInitTime_ +
            roundGapTime_;
        roundData_[_rID].pot = _resShare; // 💰 分完後的餘額給下一輪
    }

    function managePlayer(uint256 _pID) private {
        // if player has played a previous round, move their unmasked earnings
        // from that round to generalShare vault.
        if (player_[_pID].lastRound != 0) {
            updateGeneralVault(_pID, player_[_pID].lastRound);
        }
        // update player's last round played
        player_[_pID].lastRound = roundID_;
    }

    /**
     * @dev updates round timer based on number of whole puffs bought.
     */
    function updateTimer(uint256 _puffs, uint256 _rID) private {
        // grab time
        uint256 _now = block.timestamp;

        // calculate time based on number of puffs bought
        uint256 _newTime;
        if (_now > roundData_[_rID].endTime && roundData_[_rID].winnerId == 0) {
            _newTime =
                ((_puffs / 1000000000000000000) * (roundIncTime_)) +
                _now;
        } else {
            _newTime =
                ((_puffs / 1000000000000000000) * (roundIncTime_)) +
                roundData_[_rID].endTime;
        }
        // compare to max and set new end time
        if (_newTime < roundMaxTime_ + _now) {
            roundData_[_rID].endTime = _newTime;
        } else {
            roundData_[_rID].endTime = roundMaxTime_ + _now;
        }
    }

    function addUpTimer() public {
        // roundData_[_rID].endTime = block.timestamp + roundInitTime_;
        roundData_[roundID_].endTime =
            block.timestamp +
            roundGapTime_ +
            roundInitTime_;

        emit NewEndTime(block.timestamp + roundGapTime_ + roundInitTime_);
    }

    /**
     * @dev distributes eth based on fees to com, aff, and pXd
     */
    function distributeExternal(
        uint256 _rID,
        uint256 _pID,
        uint256 _eth,
        FXDdatasets.Teams _team // uint256 _affID,
    ) private returns (uint256, uint256, uint256) {
        // pay 2% out to community rewards
        uint256 _communityShare = (_eth * 2) / 100;
        uint256 _p3dShare;
        if (
            // ✅ 分錢 1：轉錢給基金會
            !Community_.deposit{value: _communityShare}()
        ) {
            // This ensures Team Just cannot influence the outcome of FoMo3D with
            // bank migrations by breaking outgoing transactions.
            // Something we would never do. But that's not the point.
            // We spent 2000$ in eth re-deploying just to patch this, we hold the
            // highest belief that everything we create should be trustless.
            // Team JUST, The name you shouldn't have to trust.
            _p3dShare = _communityShare;
            _communityShare = 0;
        }
        // ✅ 分錢 2：轉錢給 otherF3D，官方寫是要給 FoMo3D short
        // pay 1% out to FoMo3D short
        uint256 _otherPXDShare = _eth / 100;
        OtherFXD_.potSwap{value: _otherPXDShare}();

        // // distribute share to affiliate
        // uint256 _aff = _eth / 10;

        // // decide what to do with affiliate share of fees
        // // affiliate must not be self, and must have a name registered
        // if (_affID != _pID && player_[_affID].name != "") {
        //     player_[_affID].aff += _aff;
        // } else {
        //     _p3d = _aff;
        // }

        // pay out pXd
        _p3dShare += ((_eth * (fees_[_team].pXdShare)) / (100));
        if (_p3dShare > 0) {
            // deposit to divies contract
            Divies_.deposit{value: _p3dShare}();
        }
        return (_communityShare, _p3dShare, _otherPXDShare);
    }

    /**
     * @dev distributes eth based on fees to generalShare and pot
     */
    function distributeInternal(
        uint256 _rID,
        uint256 _pID,
        uint256 _eth,
        FXDdatasets.Teams _team,
        uint256 _puffs
    ) private returns (uint256, uint256, uint256) {
        // calculate generalShare share
        uint256 _generalShare = (_eth * fees_[_team].generalShare) / 100; // 隊伍份額

        // toss 1% into airdrop pot
        uint256 _airShare = _eth / 100;
        airDropPot_ = airDropPot_ + _airShare;

        // update eth balance (eth = eth - (com share + pot swap share + aff share + pXd share + airdrop pot share))
        _eth -= (_eth * 14) / 100 + ((_eth * fees_[_team].pXdShare) / 100);

        // calculate pot
        uint256 _potShare = _eth - _generalShare;

        // distribute generalShare share (thats what updateMasks() does) and adjust
        // balances for dust.
        uint256 _dust = updateMasks(_rID, _pID, _generalShare, _puffs, _team);
        if (_dust > 0) {
            _generalShare -= _dust;
        }

        // add eth to pot
        roundData_[_rID].pot += (_potShare + _dust);
        return (_generalShare, _airShare, _potShare);
    }

    function getAirDropPercentByEth(uint _eth) public returns (uint256) {
        if (_eth >= 10000000000000000000) {
            return 75;
        } else if (
            _eth >= 1000000000000000000 && // 1 eth
            _eth < 10000000000000000000 // 10 eth
        ) {
            return 50;
        } else if (_eth >= 100000000000000000 && _eth < 1000000000000000000) {
            return 25;
        }
    }

    function potSwap() external payable {
        // setup local rID
        uint256 _rID = roundID_ + 1;
        roundData_[_rID].pot += msg.value;
    }

    /**
     * @dev updates masks for round and player when puffs are bought
     * @return dust left over
     */
    function updateMasks(
        uint256 _rID,
        uint256 _pID,
        uint256 _gen,
        uint256 _puffs,
        FXDdatasets.Teams _team
    ) private returns (uint256) {
        uint256 _expotions = 1000000000000000000;
        // calc profit per key & round mask based on this buy:  (dust goes to pot)
        uint256 _profitPerPuff = (_gen * _expotions) / roundData_[_rID].puffs;
        // console.log("_profitPerPuff-->", _profitPerPuff);

        roundData_[_rID].mask += _profitPerPuff;
        // console.log("roundData_[_rID].mask????", roundData_[_rID].mask);

        // calculate player earning from their own buy (only based on the puffs
        // they just bought).  & update player earnings mask
        uint256 _earning = (_profitPerPuff * _puffs) / _expotions;
        playerRoundsData_[_pID][_rID].mask +=
            ((roundData_[_rID].mask * _puffs) / _expotions) -
            (_earning);

        // calculate & return dust
        return (_gen -
            ((_profitPerPuff * (roundData_[_rID].puffs)) / (_expotions)));
    }

    /**
     * @dev gets existing or registers new pID.  use this when a player may be new
     * @return _pID
     */
    function determinePID() private returns (uint256 _pID) {
        uint256 _pID = playerIDxAddr_[msg.sender];
        // if player is new to this version of fomo3d
        if (_pID == 0) {
            // grab their player ID, name and last aff ID, from player names contract
            _pID = PlayerBook_.getPlayerID(msg.sender);
            // bytes32 _name = PlayerBook_.getPlayerName(_pID);
            // uint256 _laff = PlayerBook_.getPlayerLAff(_pID);

            // set up player account
            playerIDxAddr_[msg.sender] = _pID;
            player_[_pID].addr = msg.sender;

            // if (_name != "") {
            //     pIDxName_[_name] = _pID;
            //     player_[_pID].name = _name;
            //     plyrNames_[_pID][_name] = true;
            // }

            // if (_laff != 0 && _laff != _pID) player_[_pID].laff = _laff;
        }
    }

    function setOtherFomo(address _otherF3D) public onlyDevs {
        // make sure that it HASNT yet been linked.
        require(
            address(OtherFXD_) == address(0),
            "silly dev, you already did that"
        );

        // set up other fomo3d (fast or long) for pot swap
        OtherFXD_ = IOtherFoMoXD(_otherF3D);
    }

    function activate() public onlyDevs {
        // make sure that its been linked.
        require(
            address(OtherFXD_) != address(0),
            "must link to other FoMo3D first"
        );

        // can only be ran once
        require(activated_ == false, "fomo3d already activated");

        // activate the contract
        activated_ = true;

        // lets start first round
        roundID_ = 1;
        roundData_[1].startTime = block.timestamp;
        roundData_[1].endTime =
            block.timestamp +
            roundGapTime_ +
            roundInitTime_;
    }

    /**
     * @dev withdraws all of your earnings.
     * -functionhash- 0x3ccfd60b
     */
    function withdraw() public isActivated onlyHuman(msg.sender) {
        // setup local rID
        uint256 _rID = roundID_;

        // grab time
        uint256 _now = block.timestamp;

        // fetch player ID
        uint256 _pID = playerIDxAddr_[msg.sender];

        // setup temp var for player eth
        uint256 _eth;

        // check to see if round has ended and no one has run round end yet
        if (
            _now > roundData_[_rID].endTime &&
            roundData_[_rID].ended == false &&
            roundData_[_rID].winnerId != 0
        ) {
            // end the round (distributes pot)
            roundData_[_rID].ended = true;
            endRound();

            // get their earnings
            _eth = withdrawEarnings(_pID);
            // gib moni
            if (_eth > 0) payable(player_[_pID].addr).transfer(_eth);

            // in any other situation
        } else {
            // get their earnings 計算所有應得 win + generalShare + aff
            _eth = withdrawEarnings(_pID);
            // gib moni
            if (_eth > 0) payable(player_[_pID].addr).transfer(_eth);
        }
        emit onWithdraw(_pID, msg.sender, _eth);
    }

    /**
     * @dev adds up unmasked earnings, & vault earnings, sets them all to 0
     * @return earnings in wei format
     */
    function withdrawEarnings(uint256 _pID) private returns (uint256) {
        // update generalShare vault
        updateGeneralVault(_pID, player_[_pID].lastRound);

        // from vaults
        uint256 _earnings = player_[_pID].winningVault +
            player_[_pID].generalVault +
            player_[_pID].affiliateVault;
        if (_earnings > 0) {
            player_[_pID].winningVault = 0;
            player_[_pID].generalVault = 0;
            player_[_pID].affiliateVault = 0;
        }

        return (_earnings);
    }

    /**
     * @dev moves any unmasked earnings to generalShare vault.  updates earnings mask
     */
    function updateGeneralVault(uint256 _pID, uint256 _rIDlast) private {
        uint256 _generalEarnings = calcUnMaskedEarnings(_pID, _rIDlast);
        if (_generalEarnings > 0) {
            // put in generalShare vault
            player_[_pID].generalVault += _generalEarnings;
            // zero out their earnings by updating mask
            playerRoundsData_[_pID][_rIDlast].mask += _generalEarnings;
        }
    }

    /**
     * @dev calculates unmasked earnings (just calculates, does not update mask)
     * @return earnings in wei format
     */
    function calcUnMaskedEarnings(
        uint256 _pID,
        uint256 _rIDlast
    ) private view returns (uint256) {
        return ((((roundData_[_rIDlast].mask) *
            (playerRoundsData_[_pID][_rIDlast].puffs)) / 1000000000000000000) -
            playerRoundsData_[_pID][_rIDlast].mask);
    }

    /* ------------------------------------------------------ */
    /*   Public Query : (for UI & viewing things on etherscan)
    /* ------------------------------------------------------ */

    /**
     * @dev returns time left.  dont spam this, you'll ddos yourself from your node
     * provider
     * -functionhash- 0xc7e284b8
     * @return time left in seconds
     */
    function getTimeLeft() public view returns (uint256) {
        uint256 _rID = roundID_;
        uint256 _now = block.timestamp;

        if (_now < roundData_[_rID].endTime) {
            return roundData_[_rID].endTime - _now;
        } else return (0);
    }

    /**
     * @dev returns player earnings per vaults
     * -functionhash- 0x63066434
     * @return winnings vault
     * @return general vault
     * @return affiliate vault
     */
    function getPlayerVaults(
        uint256 _pID
    ) public view returns (uint256, uint256, uint256) {
        // setup local rID
        uint256 _rID = roundID_;

        // if round has ended.  but round end has not been run (so contract has not distributed winnings)
        if (
            block.timestamp > roundData_[_rID].endTime &&
            roundData_[_rID].ended == false
        ) {
            uint256 _roundMask;
            uint256 _roundEth;
            uint256 _roundKeys;
            uint256 _roundPot;
            // if (roundData_[_rID].eth == 0 // && roundData_[_rID].ico > 0) {
            //     // create a temp round eth based on eth sent in during ICO phase
            //     _roundEth = roundData_[_rID].ico;

            //     // create a temp round keys based on keys bought during ICO phase
            //     _roundKeys = (roundData_[_rID].ico).puffs();

            //     // create a temp round mask based on eth and keys from ICO phase
            //     _roundMask =
            //         ((roundData_[_rID].icoGen).mul(1000000000000000000)) /
            //         _roundKeys;

            //     // create a temp rount pot based on pot, and dust from mask
            //     _roundPot = (roundData_[_rID].pot).add(
            //         (roundData_[_rID].icoGen).sub(
            //             (_roundMask.mul(_roundKeys)) / (1000000000000000000)
            //         )
            //     );
            // } else {
            _roundEth = roundData_[_rID].eth;
            _roundKeys = roundData_[_rID].puffs;
            _roundMask = roundData_[_rID].mask;
            _roundPot = roundData_[_rID].pot;
            // }

            uint256 _playerKeys;
            // if (playerRoundsData_[_pID][player_[_pID].lrnd].ico == 0)
            //     _playerKeys = playerRoundsData_[_pID][player_[_pID].lrnd].puffs;
            // else _playerKeys = calcPlayerICOPhaseKeys(_pID, _rID);

            // if player is winner

            {
                if (roundData_[_rID].winnerId == _pID) {
                    return (
                        (player_[_pID].winningVault) +
                            ((_roundPot * (48)) / 100),
                        (player_[_pID].generalVault) +
                            (
                                getPlayerVaultsHelper(
                                    _pID,
                                    _roundMask,
                                    _roundPot,
                                    _roundKeys,
                                    _playerKeys
                                )
                            ),
                        player_[_pID].lastAffiliateId
                    );
                    // if player is not the winner
                } else {
                    return (
                        player_[_pID].winningVault,
                        (player_[_pID].generalVault) +
                            (
                                getPlayerVaultsHelper(
                                    _pID,
                                    _roundMask,
                                    _roundPot,
                                    _roundKeys,
                                    _playerKeys
                                )
                            ),
                        player_[_pID].lastAffiliateId
                    );
                }
            }

            // if round is still going on, we are in ico phase, or round has ended and round end has been ran
        } else {
            return (
                player_[_pID].winningVault,
                (player_[_pID].generalVault) +
                    (calcUnMaskedEarnings(_pID, player_[_pID].lastRound)),
                player_[_pID].lastAffiliateId
            );
        }
    }

    /**
     * solidity hates stack limits.  this lets us avoid that hate
     */
    function getPlayerVaultsHelper(
        uint256 _pID,
        uint256 _roundMask,
        uint256 _roundPot,
        uint256 _roundKeys,
        uint256 _playerKeys
    ) private view returns (uint256) {
        return ((((_roundMask +
            ((((_roundPot *
                (potSplit_[roundData_[roundID_].winnerTeamId].generalShare)) /
                100) * (1000000000000000000)) / _roundKeys)) * (_playerKeys)) /
            1000000000000000000) - (playerRoundsData_[_pID][roundID_].mask));
    }

    /* ------------------------------------------------------ */
    /*                        CAUCULATE                       */
    /* ------------------------------------------------------ */
    /**
     * @dev returns the amount of keys you would get given an amount of eth.
     * - during live round.  this is accurate. (well... unless someone buys before
     * you do and ups the price!  you better HURRY!)
     * - during ICO phase.  this is the max you would get based on current eth
     * invested during ICO phase.  if others invest after you, you will receive
     * less.  (so distract them with meme vids till ICO is over)
     * -functionhash- 0xce89c80c
     * @param _rID round ID you want price for
     * @param _eth amount of eth sent in
     * @return keys received
     */
    function calcKeysReceived(
        uint256 _rID,
        uint256 _eth
    ) public view returns (uint256) {
        // grab time
        uint256 _now = block.timestamp;

        // is ICO phase over??  & theres eth in the round?
        if (
            _now > roundData_[_rID].startTime + roundGapTime_ &&
            roundData_[_rID].eth != 0 &&
            _now <= roundData_[_rID].endTime
        ) return ((roundData_[_rID].eth).puffsReceive(_eth));
        else if (_now <= roundData_[_rID].endTime)
            // round hasn't ended (in ICO phase, or ICO phase is over, but round eth is 0)
            return ((roundData_[_rID].ico).puffsReceive(_eth));
        // rounds over.  need keys for new round
        else return ((_eth).puffs());
    }

    /**
     * @dev returns current eth price for X keys.
     * - during live round.  this is accurate. (well... unless someone buys before
     * you do and ups the price!  you better HURRY!)
     * - during ICO phase.  this is the max you would get based on current eth
     * invested during ICO phase.  if others invest after you, you will receive
     * less.  (so distract them with meme vids till ICO is over)
     * -functionhash- 0xcf808000
     * @param _puffs number of keys desired (in 18 decimal format)
     * @return amount of eth needed to send
     */
    function iWantXPuffs(uint256 _puffs) public view returns (uint256) {
        // setup local rID
        uint256 _rID = roundID_;

        // grab time
        uint256 _now = block.timestamp;

        // is ICO phase over??  & theres eth in the round?
        if (
            _now > roundData_[_rID].startTime + roundGapTime_ &&
            roundData_[_rID].eth != 0 &&
            _now <= roundData_[_rID].endTime
        ) return ((roundData_[_rID].puffs + (_puffs)).ethReceive(_puffs));
        // else if (_now <= roundData_[_rID].endTime)
        //     // round hasn't ended (in ICO phase, or ICO phase is over, but round eth is 0)
        //     return (
        //         (((roundData_[_rID].ico).puffs()) + (_puffs)).ethReceive(_puffs)
        //     );
        // rounds over.  need price for new round
        else return ((_puffs).eth());
    }
}
