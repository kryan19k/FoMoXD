// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./FoMoXD.sol";

contract FoMoERC721 is
    Initializable,
    ERC721Upgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    /* ------------------------------------------------------ */
    /*                        CONTRACTS                       */
    /* ------------------------------------------------------ */
    FoMoXD public FoMoXD_;
    /* ------------------------------------------------------ */
    /*                        LIBRARIES                       */
    /* ------------------------------------------------------ */
    using MerkleProof for bytes32[];
    using StringsUpgradeable for uint256;
    using Counters for Counters.Counter;
    /* ------------------------------------------------------ */
    /*                        MODIFIERS                       */
    /* ------------------------------------------------------ */
    modifier isOneTimeMintAmountValid(uint256 _mintAmount) {
        require(_mintAmount > maxMintPerTx, "Over max one time mint amount");
        _;
    }
    /**
     * @notice Check how many NFTs are available to be minted
     *  Set mint per user limit to 10 and owner limit to 20 - Week 8
     */
    modifier isMintAmountValid(uint256 _mintAmount) {
        uint256 totalBalance = balance[msg.sender] += _mintAmount;
        require(
            totalBalance <=
                (owner() == msg.sender ? ownerMaxBalance : userMaxBalance),
            "Token quentity is out of range"
        );
        _;
    }
    /**
     * @notice Check user has sufficient funds.
     * Solidity witll change ether to wei, so we don't have to multiply 10**18 ourselves
     */
    modifier isValueValid(uint256 _mintAmount) {
        require(msg.value >= price_ * _mintAmount, "Value is not enough");
        _;
    }
    modifier onlyFoMoXD() {
        require(msg.sender == address(FoMoXD_), "only team just can activate");
        _;
    }

    /* ------------------------------------------------------ */
    /*                      CONFIGURABLES                     */
    /* ------------------------------------------------------ */
    Counters.Counter private nextTokenId_;
    uint256 public price_; // price for each token
    uint256 public maxSupply_;
    bool public mintActive;
    bool public earlyMintActive;
    bool public revealed; // reveal mystery box or not
    uint256 public earlyMintMaxBalance;
    uint256 public ownerMaxBalance;
    uint256 public userMaxBalance;
    uint256 public maxMintPerTx;
    /* ------------------------------------------------------ */
    /*                        DATASETS                        */
    /* ------------------------------------------------------ */
    string public baseURI;
    string private _mysteryTokenURI; // mystery box image URL
    bytes32 public merkleRoot; // whitelist root
    mapping(address => uint256) public whiteListClaimed; // whitelist token amounts which already cliameded
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) public balance;

    /**
     * @notice This method is required to safeguard from unauthorized upgrades
     * because in the UUPS pattern the upgrade is done from the implementation contract,
     * whereas in the transparent proxy pattern, the upgrade is done via the proxy contract
     */
    function _authorizeUpgrade(address) internal override onlyOwner {}

    /**
     * @notice Upgradable contracts should have an initialize method in place of constructors,
     * and also the initializer keyword makes sure that the contract is initialized only once
     */
    function initialize(
        string memory _name,
        string memory _symbol
    ) public initializer {
        __ERC721_init(_name, _symbol);
        __Ownable_init();
        price_ = 0.01 ether;
        maxSupply_ = 50;
        mintActive = false;
        earlyMintActive = false;
        revealed = false;
        earlyMintMaxBalance = 3;
        ownerMaxBalance = 20;
        userMaxBalance = 10;
        maxMintPerTx = 5;
    }

    /*=======================================
   =            PUBLIC FUNCTIONS            =
   =======================================*/
    /**
     * @notice return current total NFT being minted
     */
    function totalSupply() public view returns (uint256) {
        return nextTokenId_.current();
    }

    /**
     * @notice See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        if (revealed) {
            string memory baseURI = _baseURI();
            return
                bytes(baseURI).length > 0
                    ? string(
                        abi.encodePacked(
                            baseURI,
                            (tokenId + 1).toString(),
                            ".json"
                        )
                    )
                    : "";
        } else {
            return _mysteryTokenURI;
        }
    }

    /**
     * @notice Early mint function for people on the whitelist
     */
    function earlyMint(
        bytes32[] calldata _merkleProof,
        uint256 _mintAmount
    ) public payable isMintAmountValid(_mintAmount) isValueValid(_mintAmount) {
        require(
            earlyMintActive,
            "Current state is not available for Early Mint."
        );
        require(
            whiteListClaimed[msg.sender] + _mintAmount < earlyMintMaxBalance,
            "Amount run out of early lint quota"
        );

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            _merkleProof.verify(merkleRoot, leaf),
            "Incorrect proof, current user is not in the whitelist"
        );
        _mintAndUpdateCounter(_mintAmount);
    }

    function mint(
        uint256 _mintAmount
    ) public payable isMintAmountValid(_mintAmount) isValueValid(_mintAmount) {
        require(mintActive, "Public Mint is not yet started");
        _mintAndUpdateCounter(_mintAmount);
    }

    function foMoXDMint(
        address to,
        uint256 _mintAmount
    ) public payable onlyFoMoXD returns (uint256[] memory) {
        uint256 _tokenId = nextTokenId_.current();
        require(
            _tokenId + _mintAmount < maxSupply_,
            "Require amount is over total supply"
        );
        // @dev storage balance update must put before _safemint for prevent reentrantcy
        balance[to] += _mintAmount;
        uint256[] memory _tokenIds = new uint256[](_mintAmount);
        for (uint256 i = 0; i < _mintAmount; i++) {
            _safeMint(to, _tokenId);
            _tokenIds[i] = _tokenId;
            _tokenId++; // 一定不會超過 100，所以不會爆掉
        }
        nextTokenId_._value = _tokenId;
        return _tokenIds;
    }

    /* ------------------------------------------------------ */
    /*                   EXTERNAL FUNCTIONS                   */
    /* ------------------------------------------------------ */
    /*----------  ADMINISTRATOR ONLY FUNCTIONS  ----------*/
    function setOwnerMaxBalance(uint256 _maxBalance) external onlyOwner {
        ownerMaxBalance = _maxBalance;
    }

    function setUserMaxBalance(uint256 _maxBalance) external onlyOwner {
        userMaxBalance = _maxBalance;
    }

    /**
     *  @notice set new merkle root
     */
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    /**
     * @notice withdraw funds from the contract
     */
    function withdrawBalance() external onlyOwner {
        require(address(this).balance > 0, "Balance is 0");
        (bool success, ) = payable(owner()).call{value: address(this).balance}(
            ""
        );
        require(success, "Withdraw failed");
    }

    /**
     * @notice set the mint price
     */
    function setPrice(uint256 _price) external onlyOwner {
        price_ = _price;
    }

    function setBaseURI(string calldata _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function setMysteryTokenURI(
        string calldata _newmysteryTokenURI
    ) external onlyOwner {
        _mysteryTokenURI = _newmysteryTokenURI;
    }

    function toggleMintActive() external onlyOwner {
        mintActive = !mintActive;
    }

    function toggleReveal() external onlyOwner {
        revealed = !revealed;
    }

    function toggleEarlyMint() external onlyOwner {
        earlyMintActive = !earlyMintActive;
    }

    function setFoMoGame(FoMoXD _FoMoXD) external onlyOwner {
        FoMoXD_ = _FoMoXD;
    }

    /* ------------------------------------------------------ */
    /*                   INTERNAL FUNCTIONS                   */
    /* ------------------------------------------------------ */
    function _mintAndUpdateCounter(uint256 _mintAmount) internal {
        uint256 tokenId = nextTokenId_.current();
        require(
            tokenId + _mintAmount < maxSupply_,
            "Require amount is over total supply"
        );
        // @dev storage balance update must put before _safemint for prevent reentrantcy
        balance[msg.sender] += _mintAmount;

        for (uint256 i = 0; i < _mintAmount; i++) {
            _safeMint(msg.sender, tokenId);
            tokenId++; // 一定不會超過 100，所以不會爆掉
        }
        nextTokenId_._value = tokenId;
    }

    /**
     *  @notice return the NFT base URI
     *  ex: image base url...
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    /**
     *  @notice return mystry box image
     *  ex: mystry box image url...
     */
    function _getMysteryTokenURI() internal view returns (string memory) {
        return _mysteryTokenURI;
    }
}
