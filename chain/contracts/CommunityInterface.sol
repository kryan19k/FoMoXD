// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interface/ICommunity.sol";

contract Community is ICommunity {
    event Deposit(address indexed sender, uint256 amount);
    event Submit(uint256 indexed txId);
    event Approve(address indexed owner, uint256 indexed txId);
    event Revoke(address indexed oener, uint256 indexed txId);
    event Execute(uint256 indexed txId);

    address[] public owners_;
    mapping(address => bool) public isOwner;

    uint256 public requiredVoteNum_;

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool isExecuted;
    }
    Transaction[] public transactions; // 存放所有交易

    // txId -> ownerAddr -> bool
    mapping(uint256 => mapping(address => bool)) public approved;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }
    modifier txExists(uint256 _txId) {
        require(_txId < transactions.length, "tx does not exist");
        _;
    }
    modifier notApproved(uint256 _txId) {
        require(!approved[_txId][msg.sender], "tx already approved");
        _;
    }
    modifier notExecuted(uint256 _txId) {
        require(!transactions[_txId].isExecuted, "tx already executed");
        _;
    }

    constructor(address[] memory _owners, uint256 _requiredVoteNum) {
        require(_owners.length > 0, "owners required");
        require(
            _requiredVoteNum > 0 && _requiredVoteNum <= _owners.length,
            "invalid required number of owners"
        );
        for (uint256 i; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner is ont unique");
            isOwner[owner] = true;
            owners_.push(owner);
        }
        requiredVoteNum_ = _requiredVoteNum;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function deposit() external payable override returns (bool) {
        emit Deposit(msg.sender, msg.value);
    }

    function submit(
        address _to,
        uint256 _value,
        bytes calldata _data
    ) external onlyOwner {
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                isExecuted: false
            })
        );
        emit Submit(transactions.length - 1);
    }

    function approve(
        uint256 _txId
    ) external onlyOwner txExists(_txId) notApproved(_txId) notExecuted(_txId) {
        approved[_txId][msg.sender] = true;
        emit Approve(msg.sender, _txId);
    }

    function execute(
        uint256 _txId
    ) external txExists(_txId) notExecuted(_txId) {
        require(
            _getApprovalCount(_txId) >= requiredVoteNum_,
            "approval < required"
        );
        Transaction storage transaction = transactions[_txId];
        transaction.isExecuted = true;
        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "tx failed");
        emit Execute(_txId);
    }

    function revoke(
        uint256 _txId
    ) external onlyOwner txExists(_txId) notExecuted(_txId) {
        require(approved[_txId][msg.sender], "tx not approved");
        approved[_txId][msg.sender] = false;
        emit Revoke(msg.sender, _txId);
    }

    function _getApprovalCount(
        uint256 _txId
    ) private view returns (uint256 count) {
        for (uint256 i; i < owners_.length; i++) {
            if (approved[_txId][owners_[i]]) {
                count += 1;
            }
        }
    }
}
