export default {
  _format: 'hh-sol-artifact-1',
  contractName: 'FoMoXD',
  sourceName: 'contracts/FoMoXD.sol',
  abi: [
    {
      inputs: [
        {
          internalType: 'contract IPlayerBook',
          name: '_playerBook',
          type: 'address'
        },
        {
          internalType: 'contract ICommunity',
          name: '_community',
          type: 'address'
        },
        {
          internalType: 'contract FoMoERC20',
          name: '_foMoERC20',
          type: 'address'
        },
        {
          internalType: 'contract FoMoERC721',
          name: '_foMoERC721',
          type: 'address'
        },
        {
          internalType: 'contract IDivies',
          name: '_divies',
          type: 'address'
        },
        {
          internalType: 'contract NumOracle',
          name: '_oracle',
          type: 'address'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timeStamp',
          type: 'uint256'
        }
      ],
      name: 'NewEndTime',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'playerId',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'playerAddress',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'ethIn',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'puffssBought',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountWon',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'P3DShare',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'generalShare',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'airDropPotShare',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'potShare',
          type: 'uint256'
        }
      ],
      name: 'onBuyPuff',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'roundId',
          type: 'uint256'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'winnerId',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'winnerTeamId',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'endTime',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_generalShare',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_winnerShare',
          type: 'uint256'
        }
      ],
      name: 'onEndRound',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'playerID',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'prize',
          type: 'uint256'
        }
      ],
      name: 'onEthAirdrop',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'roundId',
          type: 'uint256'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'playerAddr',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256[]',
          name: 'tokenIds',
          type: 'uint256[]'
        }
      ],
      name: 'onNftAirdrop',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'playerID',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'playerAddress',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'ethOut',
          type: 'uint256'
        }
      ],
      name: 'onWithdraw',
      type: 'event'
    },
    {
      stateMutability: 'payable',
      type: 'fallback'
    },
    {
      inputs: [],
      name: 'Community_',
      outputs: [
        {
          internalType: 'contract ICommunity',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'Divies_',
      outputs: [
        {
          internalType: 'contract IDivies',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'FoMoERC20_',
      outputs: [
        {
          internalType: 'contract FoMoERC20',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'FoMoERC721_',
      outputs: [
        {
          internalType: 'contract FoMoERC721',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'Oracle_',
      outputs: [
        {
          internalType: 'contract NumOracle',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'OtherFXD_',
      outputs: [
        {
          internalType: 'contract IOtherFoMoXD',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'PlayerBook_',
      outputs: [
        {
          internalType: 'contract IPlayerBook',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'activate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'activated_',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'addUpTimer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'airDropEthThrottle_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'airDropNFTThrottle_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'airDropPot_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'enum FXDdatasets.Teams',
          name: '_team',
          type: 'uint8'
        }
      ],
      name: 'buyPuffXAddr',
      outputs: [
        {
          internalType: 'uint256',
          name: '_playerID',
          type: 'uint256'
        }
      ],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_rID',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_eth',
          type: 'uint256'
        }
      ],
      name: 'calcKeysReceived',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'earlyRoundEthThrottle_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'earlyRoundPlayerMaxEth_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'enum FXDdatasets.Teams',
          name: '',
          type: 'uint8'
        }
      ],
      name: 'fees_',
      outputs: [
        {
          internalType: 'uint256',
          name: 'generalShare',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'pXdShare',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_eth',
          type: 'uint256'
        }
      ],
      name: 'getAirDropPercentByEth',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_pID',
          type: 'uint256'
        }
      ],
      name: 'getPlayerVaults',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getTimeLeft',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_puffs',
          type: 'uint256'
        }
      ],
      name: 'iWantXPuffs',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'minETHAllowed_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'playerIDxAddr_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'playerRoundsData_',
      outputs: [
        {
          internalType: 'uint256',
          name: 'eth',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'puffs',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'mask',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'player_',
      outputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address'
        },
        {
          internalType: 'bytes32',
          name: 'name',
          type: 'bytes32'
        },
        {
          internalType: 'uint256',
          name: 'lastRound',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'lastAffiliateId',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'winningVault',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'generalVault',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'affiliateVault',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'enum FXDdatasets.Teams',
          name: '',
          type: 'uint8'
        }
      ],
      name: 'potSplit_',
      outputs: [
        {
          internalType: 'uint256',
          name: 'generalShare',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'pXdShare',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'potSwap',
      outputs: [],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'roundData_',
      outputs: [
        {
          internalType: 'uint256',
          name: 'ico',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'winnerId',
          type: 'uint256'
        },
        {
          internalType: 'enum FXDdatasets.Teams',
          name: 'winnerTeamId',
          type: 'uint8'
        },
        {
          internalType: 'uint256',
          name: 'startTime',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'endTime',
          type: 'uint256'
        },
        {
          internalType: 'bool',
          name: 'ended',
          type: 'bool'
        },
        {
          internalType: 'uint256',
          name: 'puffs',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'eth',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'pot',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'mask',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'nfts',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'roundGapTime_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'roundID_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'roundIncTime_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'roundInitTime_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'roundMaxTime_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        },
        {
          internalType: 'enum FXDdatasets.Teams',
          name: '',
          type: 'uint8'
        }
      ],
      name: 'roundTeamEth_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_otherF3D',
          type: 'address'
        }
      ],
      name: 'setOtherFomo',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'wholePuffQty_',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      stateMutability: 'payable',
      type: 'receive'
    }
  ],
  bytecode:
    '0x6080604052603c6008553480156200001657600080fd5b5060405162004e8738038062004e8783398181016040528101906200003c919062000741565b856000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555084600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040518060400160405280601e8152602001600681525060116000806003811115620002335762000232620007dd565b5b6003811115620002485762000247620007dd565b5b815260200190815260200160002060008201518160000155602082015181600101559050506040518060400160405280602b8152602001600081525060116000600160038111156200029f576200029e620007dd565b5b6003811115620002b457620002b3620007dd565b5b81526020019081526020016000206000820151816000015560208201518160010155905050604051806040016040528060388152602001600a81525060116000600260038111156200030b576200030a620007dd565b5b600381111562000320576200031f620007dd565b5b815260200190815260200160002060008201518160000155602082015181600101559050506040518060400160405280602b8152602001600881525060116000600380811115620003765762000375620007dd565b5b60038111156200038b576200038a620007dd565b5b815260200190815260200160002060008201518160000155602082015181600101559050506040518060400160405280600f8152602001600a81525060126000806003811115620003e157620003e0620007dd565b5b6003811115620003f657620003f5620007dd565b5b81526020019081526020016000206000820151816000015560208201518160010155905050604051806040016040528060198152602001600081525060126000600160038111156200044d576200044c620007dd565b5b6003811115620004625762000461620007dd565b5b8152602001908152602001600020600082015181600001556020820151816001015590505060405180604001604052806014815260200160148152506012600060026003811115620004b957620004b8620007dd565b5b6003811115620004ce57620004cd620007dd565b5b815260200190815260200160002060008201518160000155602082015181600101559050506040518060400160405280601e8152602001600a81525060126000600380811115620005245762000523620007dd565b5b6003811115620005395762000538620007dd565b5b815260200190815260200160002060008201518160000155602082015181600101559050505050505050506200080c565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200059c826200056f565b9050919050565b6000620005b0826200058f565b9050919050565b620005c281620005a3565b8114620005ce57600080fd5b50565b600081519050620005e281620005b7565b92915050565b6000620005f5826200058f565b9050919050565b6200060781620005e8565b81146200061357600080fd5b50565b6000815190506200062781620005fc565b92915050565b60006200063a826200058f565b9050919050565b6200064c816200062d565b81146200065857600080fd5b50565b6000815190506200066c8162000641565b92915050565b60006200067f826200058f565b9050919050565b620006918162000672565b81146200069d57600080fd5b50565b600081519050620006b18162000686565b92915050565b6000620006c4826200058f565b9050919050565b620006d681620006b7565b8114620006e257600080fd5b50565b600081519050620006f681620006cb565b92915050565b600062000709826200058f565b9050919050565b6200071b81620006fc565b81146200072757600080fd5b50565b6000815190506200073b8162000710565b92915050565b60008060008060008060c087890312156200076157620007606200056a565b5b60006200077189828a01620005d1565b96505060206200078489828a0162000616565b95505060406200079789828a016200065b565b9450506060620007aa89828a01620006a0565b9350506080620007bd89828a01620006e5565b92505060a0620007d089828a016200072a565b9150509295509295509295565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b61466b806200081c6000396000f3fe60806040526004361061024a5760003560e01c8063676c6e1111610139578063b483c054116100b6578063d53b26791161007a578063d53b2679146108d8578063d87574e014610903578063ec1d539f1461092e578063ed78cf4a14610959578063f19c452514610963578063fc0e6d941461098e5761025b565b8063b483c054146107d9578063b81d3c0a14610802578063c7e284b814610845578063ccd4d35f14610870578063ce89c80c1461089b5761025b565b80638da5cb5b116100fd5780638da5cb5b1461071157806391263d071461073c57806395d89b4114610753578063a35aae9c1461077e578063b02f342c146107a95761025b565b8063676c6e111461063a57806367ea9a23146106655780636b26e311146106905780637c9e4eea146106bb5780638b6252d9146106e65761025b565b80633ccfd60b116101c75780634ef237fc1161018b5780634ef237fc1461052b5780635325269414610568578063576b5a20146105a55780635c007c39146105d057806363066434146105fb5761025b565b80633ccfd60b1461043a5780633e5602cf146104515780633f9e54ca146104985780634978b68a146104c35780634a47d830146105005761025b565b80631e75dd771161020e5780631e75dd771461033e578063256d41361461037c57806328279bb2146103a757806330c5d3e4146103d2578063375941d31461040f5761025b565b806304c0ae4e1461026757806306fdde03146102925780630a226fb9146102bd5780630d59212e146102e85780630f15f4c0146103275761025b565b3661025b5761025960006109cc565b005b61026560006109cc565b005b34801561027357600080fd5b5061027c610b63565b6040516102899190613556565b60405180910390f35b34801561029e57600080fd5b506102a7610b6b565b6040516102b49190613601565b60405180910390f35b3480156102c957600080fd5b506102d2610ba4565b6040516102df91906136a2565b60405180910390f35b3480156102f457600080fd5b5061030f600480360381019061030a91906136fd565b610bca565b60405161031e9392919061373d565b60405180910390f35b34801561033357600080fd5b5061033c610c01565b005b34801561034a57600080fd5b5061036560048036038101906103609190613799565b610def565b6040516103739291906137c6565b60405180910390f35b34801561038857600080fd5b50610391610e13565b60405161039e9190613810565b60405180910390f35b3480156103b357600080fd5b506103bc610e39565b6040516103c99190613556565b60405180910390f35b3480156103de57600080fd5b506103f960048036038101906103f4919061382b565b610e46565b6040516104069190613556565b60405180910390f35b34801561041b57600080fd5b50610424610e6b565b6040516104319190613556565b60405180910390f35b34801561044657600080fd5b5061044f610e70565b005b34801561045d57600080fd5b506104786004803603810190610473919061386b565b611179565b60405161048f9b9a9998979695949392919061392a565b60405180910390f35b3480156104a457600080fd5b506104ad6111ed565b6040516104ba9190613556565b60405180910390f35b3480156104cf57600080fd5b506104ea60048036038101906104e5919061386b565b6111f9565b6040516104f79190613556565b60405180910390f35b34801561050c57600080fd5b506105156112c6565b6040516105229190613556565b60405180910390f35b34801561053757600080fd5b50610552600480360381019061054d9190613a13565b6112cc565b60405161055f9190613556565b60405180910390f35b34801561057457600080fd5b5061058f600480360381019061058a919061386b565b6112e4565b60405161059c9190613556565b60405180910390f35b3480156105b157600080fd5b506105ba61135e565b6040516105c79190613a61565b60405180910390f35b3480156105dc57600080fd5b506105e5611384565b6040516105f29190613a9d565b60405180910390f35b34801561060757600080fd5b50610622600480360381019061061d919061386b565b6113aa565b6040516106319392919061373d565b60405180910390f35b34801561064657600080fd5b5061064f61160a565b60405161065c9190613ad9565b60405180910390f35b34801561067157600080fd5b5061067a611630565b6040516106879190613556565b60405180910390f35b34801561069c57600080fd5b506106a5611636565b6040516106b29190613556565b60405180910390f35b3480156106c757600080fd5b506106d0611642565b6040516106dd9190613556565b60405180910390f35b3480156106f257600080fd5b506106fb61164a565b6040516107089190613b15565b60405180910390f35b34801561071d57600080fd5b5061072661166e565b6040516107339190613b3f565b60405180910390f35b34801561074857600080fd5b50610751611694565b005b34801561075f57600080fd5b5061076861171e565b6040516107759190613601565b60405180910390f35b34801561078a57600080fd5b50610793611757565b6040516107a09190613556565b60405180910390f35b6107c360048036038101906107be9190613799565b6109cc565b6040516107d09190613556565b60405180910390f35b3480156107e557600080fd5b5061080060048036038101906107fb9190613a13565b61175d565b005b34801561080e57600080fd5b506108296004803603810190610824919061386b565b6118c2565b60405161083c9796959493929190613b73565b60405180910390f35b34801561085157600080fd5b5061085a611924565b6040516108679190613556565b60405180910390f35b34801561087c57600080fd5b50610885611984565b6040516108929190613c03565b60405180910390f35b3480156108a757600080fd5b506108c260048036038101906108bd91906136fd565b6119aa565b6040516108cf9190613556565b60405180910390f35b3480156108e457600080fd5b506108ed611ab2565b6040516108fa9190613c1e565b60405180910390f35b34801561090f57600080fd5b50610918611ac5565b6040516109259190613556565b60405180910390f35b34801561093a57600080fd5b50610943611acb565b6040516109509190613556565b60405180910390f35b610961611ad7565b005b34801561096f57600080fd5b50610978611b1a565b6040516109859190613556565b60405180910390f35b34801561099a57600080fd5b506109b560048036038101906109b09190613799565b611b20565b6040516109c39291906137c6565b60405180910390f35b600060011515600a60009054906101000a900460ff16151514610a24576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a1b90613cab565b60405180910390fd5b336000813b905060008114610a6e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6590613d17565b60405180910390fd5b34633b9aca00811015610ab6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aad90613da9565b60405180910390fd5b69152d02c7e14af6800000811115610b03576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610afa90613e15565b60405180910390fd5b610b0b611b44565b506000600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050610b5a8187611ccd565b50505050919050565b633b9aca0081565b6040518060400160405280600f81526020017f466f4d6f5844204f6666696369616c000000000000000000000000000000000081525081565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600e602052816000526040600020602052806000526040600020600091509150508060000154908060010154908060020154905083565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c91576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8890613e81565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610d22576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d1990613eed565b60405180910390fd5b60001515600a60009054906101000a900460ff16151514610d78576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d6f90613f59565b60405180910390fd5b6001600a60006101000a81548160ff021916908315150217905550600160098190555042600f6000600181526020019081526020016000206003018190555061012c60085442610dc89190613fa8565b610dd29190613fa8565b600f60006001815260200190815260200160002060040181905550565b60116020528060005260406000206000915090508060000154908060010154905082565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b68056bc75e2d6310000081565b6010602052816000526040600020602052806000526040600020600091509150505481565b601e81565b60011515600a60009054906101000a900460ff16151514610ec6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ebd90613cab565b60405180910390fd5b336000813b905060008114610f10576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f0790613d17565b60405180910390fd5b6000600954905060004290506000600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600f60008581526020019081526020016000206004015483118015610fae575060001515600f600086815260200190815260200160002060050160009054906101000a900460ff161515145b8015610fd157506000600f60008681526020019081526020016000206001015414155b156110a4576001600f600086815260200190815260200160002060050160006101000a81548160ff02191690831515021790555061100d611e08565b61101682612249565b9050600081111561109f57600d600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561109d573d6000803e3d6000fd5b505b611137565b6110ad82612249565b9050600081111561113657600d600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015611134573d6000803e3d6000fd5b505b5b817fffb7a058f3489b3f4215d0517dd9bd49ccec359af5bf041d75894d2cb84385ca3383604051611169929190613fdc565b60405180910390a2505050505050565b600f6020528060005260406000206000915090508060000154908060010154908060020160009054906101000a900460ff16908060030154908060040154908060050160009054906101000a900460ff169080600601549080600701549080600801549080600901549080600a015490508b565b670de0b6b3a764000081565b60008060095490506000429050600854600f60008481526020019081526020016000206003015461122a9190613fa8565b8111801561124f57506000600f60008481526020019081526020016000206007015414155b80156112715750600f6000838152602001908152602001600020600401548111155b156112b3576112aa8485600f60008681526020019081526020016000206006015461129c9190613fa8565b61232f90919063ffffffff16565b925050506112c1565b6112bc84612360565b925050505b919050565b61012c81565b600c6020528060005260406000206000915090505481565b6000678ac7230489e8000082106112fe57604b9050611359565b670de0b6b3a7640000821015801561131d5750678ac7230489e8000082105b1561132b5760329050611359565b67016345785d8a0000821015801561134a5750670de0b6b3a764000082105b156113585760199050611359565b5b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000806009549050600f60008281526020019081526020016000206004015442118015611401575060001515600f600083815260200190815260200160002060050160009054906101000a900460ff161515145b1561158c57600080600080600f6000868152602001908152602001600020600701549250600f6000868152602001908152602001600020600601549150600f6000868152602001908152602001600020600901549350600f6000868152602001908152602001600020600801549050600089600f6000888152602001908152602001600020600101540361151f57606460308361149e9190614005565b6114a89190614076565b600d60008c8152602001908152602001600020600401546114c99190613fa8565b6114d68b878587866123d7565b600d60008d8152602001908152602001600020600501546114f79190613fa8565b600d60008d815260200190815260200160002060030154985098509850505050505050611603565b600d60008b8152602001908152602001600020600401546115438b878587866123d7565b600d60008d8152602001908152602001600020600501546115649190613fa8565b600d60008d815260200190815260200160002060030154985098509850505050505050611603565b600d6000868152602001908152602001600020600401546115c386600d6000898152602001908152602001600020600201546124d6565b600d6000888152602001908152602001600020600501546115e49190613fa8565b600d600088815260200190815260200160002060030154935093509350505b9193909250565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60085481565b67016345785d8a000081565b633b9aca0081565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61012c600854426116a59190613fa8565b6116af9190613fa8565b600f60006009548152602001908152602001600020600401819055507f18c072bc98b0b73c93817369c5f408345da097127acc038ec75ad73c261c265a61012c600854426116fd9190613fa8565b6117079190613fa8565b6040516117149190613556565b60405180910390a1565b6040518060400160405280600381526020017f465844000000000000000000000000000000000000000000000000000000000081525081565b60095481565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146117ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117e490613e81565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461187e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611875906140f3565b60405180910390fd5b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600d6020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154908060040154908060050154908060060154905087565b60008060095490506000429050600f60008381526020019081526020016000206004015481101561197a5780600f6000848152602001908152602001600020600401546119719190614113565b92505050611981565b6000925050505b90565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080429050600854600f6000868152602001908152602001600020600301546119d49190613fa8565b811180156119f957506000600f60008681526020019081526020016000206007015414155b8015611a1b5750600f6000858152602001908152602001600020600401548111155b15611a5157611a4983600f60008781526020019081526020016000206007015461256e90919063ffffffff16565b915050611aac565b600f6000858152602001908152602001600020600401548111611a9f57611a9783600f60008781526020019081526020016000206000015461256e90919063ffffffff16565b915050611aac565b611aa88361259f565b9150505b92915050565b600a60009054906101000a900460ff1681565b600b5481565b670de0b6b3a764000081565b60006001600954611ae89190613fa8565b905034600f60008381526020019081526020016000206008016000828254611b109190613fa8565b9250508190555050565b61012c81565b60126020528060005260406000206000915090508060000154908060010154905082565b600080600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008103611cc95760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e56556a9336040518263ffffffff1660e01b8152600401611bea9190613b3f565b6020604051808303816000875af1158015611c09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c2d919061415c565b905080600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555033600d600083815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5090565b600060095490506000429050600f60008381526020019081526020016000206004015481111580611d355750600f60008381526020019081526020016000206004015481118015611d3457506000600f600084815260200190815260200160002060010154145b5b15611d4b57611d4682853486612629565b611e02565b600f60008381526020019081526020016000206004015481118015611d97575060001515600f600084815260200190815260200160002060050160009054906101000a900460ff161515145b15611dd4576001600f600084815260200190815260200160002060050160006101000a81548160ff021916908315150217905550611dd3611e08565b5b34600d60008681526020019081526020016000206005016000828254611dfa9190613fa8565b925050819055505b50505050565b600060095490506000600f60008381526020019081526020016000206001015490506000600f600084815260200190815260200160002060020160009054906101000a900460ff1690506000600f60008581526020019081526020016000206008015490506000603282611e7c9190614076565b90506000606460126000866003811115611e9957611e98613898565b5b6003811115611eab57611eaa613898565b5b81526020019081526020016000206001015484611ec89190614005565b611ed29190614076565b90506000606460126000876003811115611eef57611eee613898565b5b6003811115611f0157611f00613898565b5b81526020019081526020016000206000015485611f1e9190614005565b611f289190614076565b905060006064603086611f3b9190614005565b611f459190614076565b905060008383868489611f589190614113565b611f629190614113565b611f6c9190614113565b611f769190614113565b90506000670de0b6b3a764000090506000600f60008c8152602001908152602001600020600601548286611faa9190614005565b611fb49190614076565b9050600082600f60008e81526020019081526020016000206006015483611fdb9190614005565b611fe59190614076565b86611ff09190614113565b905060008111156120185780866120079190614113565b955080846120159190613fa8565b93505b84600d60008d8152602001908152602001600020600401600082825461203e9190613fa8565b92505081905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0e30db0896040518263ffffffff1660e01b815260040160206040518083038185885af11580156120b4573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906120d991906141b5565b6120f05787876120e99190613fa8565b9650600097505b81600f60008e815260200190815260200160002060090160008282546121169190613fa8565b9250508190555060008711156121aa57600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0e30db0886040518263ffffffff1660e01b81526004016000604051808303818588803b15801561219057600080fd5b505af11580156121a4573d6000803e3d6000fd5b50505050505b600960008154809291906121bd906141e2565b91905055508b806121cd906141e2565b9c505042600f60008e81526020019081526020016000206003018190555060085461012c426121fc9190613fa8565b6122069190613fa8565b600f60008e81526020019081526020016000206004018190555083600f60008e815260200190815260200160002060080181905550505050505050505050505050565b600061226b82600d600085815260200190815260200160002060020154612d9e565b6000600d600084815260200190815260200160002060060154600d600085815260200190815260200160002060050154600d6000868152602001908152602001600020600401546122bc9190613fa8565b6122c69190613fa8565b90506000811115612326576000600d6000858152602001908152602001600020600401819055506000600d6000858152602001908152602001600020600501819055506000600d6000858152602001908152602001600020600601819055505b80915050919050565b600061234582846123409190614113565b612360565b61234e84612360565b6123589190614113565b905092915050565b6000612373670de0b6b3a7640000612e26565b6002670de0b6b3a7640000846123899190614005565b65886c8f67307061239a9190614005565b6123a49190614076565b6123ad84612e26565b6304a817c86123bc9190614005565b6123c69190613fa8565b6123d09190614076565b9050919050565b6000600e60008781526020019081526020016000206000600954815260200190815260200160002060020154670de0b6b3a76400008385670de0b6b3a7640000606460126000600f6000600954815260200190815260200160002060020160009054906101000a900460ff16600381111561245557612454613898565b5b600381111561246757612466613898565b5b8152602001908152602001600020600001548a6124849190614005565b61248e9190614076565b6124989190614005565b6124a29190614076565b886124ad9190613fa8565b6124b79190614005565b6124c19190614076565b6124cb9190614113565b905095945050505050565b6000600e6000848152602001908152602001600020600083815260200190815260200160002060020154670de0b6b3a7640000600e6000868152602001908152602001600020600085815260200190815260200160002060010154600f6000868152602001908152602001600020600901546125529190614005565b61255c9190614076565b6125669190614113565b905092915050565b60006125798361259f565b61258d83856125889190613fa8565b61259f565b6125979190614113565b905092915050565b60006309502f906d03b2a1d15167e7c5699bfde0000061260e7a0dac7055469777a6122ee4310dd6c14410500f29048400000000006b01027e72f1f1281308800000670de0b6b3a7640000876125f59190614005565b6125ff9190614005565b6126099190613fa8565b612e3b565b6126189190614113565b6126229190614076565b9050919050565b6000600e6000858152602001908152602001600020600086815260200190815260200160002060010154036126625761266183612e98565b5b68056bc75e2d63100000600f6000868152602001908152602001600020600701541080156126c95750670de0b6b3a764000082600e60008681526020019081526020016000206000878152602001908152602001600020600001546126c79190613fa8565b115b1561275f576000600e6000858152602001908152602001600020600086815260200190815260200160002060000154670de0b6b3a764000061270b9190614113565b90506000818461271b9190614113565b905080600d60008781526020019081526020016000206005015461273f9190613fa8565b600d60008781526020019081526020016000206005018190555081935050505b633b9aca0082116127a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161279c906142c2565b60405180910390fd5b60006127d083600f60008881526020019081526020016000206007015461256e90919063ffffffff16565b9050670de0b6b3a764000081106128b2576127eb8186612ef7565b83600f600087815260200190815260200160002060010154146128245783600f6000878152602001908152602001600020600101819055505b81600381111561283757612836613898565b5b600f600087815260200190815260200160002060020160009054906101000a900460ff16600381111561286d5761286c613898565b5b146128b15781600f600087815260200190815260200160002060020160006101000a81548160ff021916908360038111156128ab576128aa613898565b5b02179055505b5b600067016345785d8a00008410612a055760011515600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e5ed3d4e6040518163ffffffff1660e01b81526004016020604051808303816000875af1158015612936573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061295a91906141b5565b151503612a0457606461296c856112e4565b600b546129799190614005565b6129839190614076565b905080600d600087815260200190815260200160002060040160008282546129ab9190613fa8565b9250508190555080600b60008282546129c49190614113565b92505081905550847fae56386e6ed43cbe95193f97fa8cb9074e7240349d8fd4f3c6da2ac8dc69b6bc826040516129fb9190613556565b60405180910390a25b5b633b9aca008410158015612a195750600081145b15612be65760011515600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166337b3e5eb6040518163ffffffff1660e01b81526004016020604051808303816000875af1158015612a91573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ab591906141b5565b151503612be5576000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637fc0000f3360016040518363ffffffff1660e01b8152600401612b1c92919061431d565b6000604051808303816000875af1158015612b3b573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190612b64919061448e565b90506001600f6000898152602001908152602001600020600a016000828254612b8d9190613fa8565b925050819055503373ffffffffffffffffffffffffffffffffffffffff16877f29f9ce618760ce1967414750c3038e347e09d27a7e145f6c25fb8fd3f89fd8f083604051612bdb9190614595565b60405180910390a3505b5b81600e600087815260200190815260200160002060008881526020019081526020016000206001016000828254612c1d9190613fa8565b9250508190555083600e600087815260200190815260200160002060008881526020019081526020016000206000016000828254612c5b9190613fa8565b9250508190555081600f60008881526020019081526020016000206006016000828254612c889190613fa8565b9250508190555083600f60008881526020019081526020016000206007016000828254612cb59190613fa8565b9250508190555083601060008881526020019081526020016000206000856003811115612ce557612ce4613898565b5b6003811115612cf757612cf6613898565b5b81526020019081526020016000206000828254612d149190613fa8565b925050819055506000806000612d2c89898989613018565b9250925092506000806000612d448c8c8c8c8c613271565b9250925092508a7f2c49a56e0a4034b700f57b0e668ae3bfbb02abc8fa94286c7b206e1cca9ceceb338c8b8b8a898989604051612d889897969594939291906145b7565b60405180910390a2505050505050505050505050565b6000612daa83836124d6565b90506000811115612e215780600d60008581526020019081526020016000206005016000828254612ddb9190613fa8565b9250508190555080600e600085815260200190815260200160002060008481526020019081526020016000206002016000828254612e199190613fa8565b925050819055505b505050565b60008182612e349190614005565b9050919050565b6000806002600184612e4d9190613fa8565b612e579190614076565b90508291505b81811015612e92578091506002818285612e779190614076565b612e819190613fa8565b612e8b9190614076565b9050612e5d565b50919050565b6000600d60008381526020019081526020016000206002015414612ed757612ed681600d600084815260200190815260200160002060020154612d9e565b5b600954600d60008381526020019081526020016000206002018190555050565b60004290506000600f60008481526020019081526020016000206004015482118015612f3957506000600f600085815260200190815260200160002060010154145b15612f705781601e670de0b6b3a764000086612f559190614076565b612f5f9190614005565b612f699190613fa8565b9050612fb4565b600f600084815260200190815260200160002060040154601e670de0b6b3a764000086612f9d9190614076565b612fa79190614005565b612fb19190613fa8565b90505b8161012c612fc29190613fa8565b811015612fe95780600f600085815260200190815260200160002060040181905550613012565b8161012c612ff79190613fa8565b600f6000858152602001908152602001600020600401819055505b50505050565b600080600080606460028761302d9190614005565b6130379190614076565b90506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0e30db0836040518263ffffffff1660e01b815260040160206040518083038185885af11580156130aa573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906130cf91906141b5565b6130db57819050600091505b60006064886130ea9190614076565b9050600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ed78cf4a826040518263ffffffff1660e01b81526004016000604051808303818588803b15801561315657600080fd5b505af115801561316a573d6000803e3d6000fd5b505050505060646011600089600381111561318857613187613898565b5b600381111561319a57613199613898565b5b815260200190815260200160002060010154896131b79190614005565b6131c19190614076565b826131cc9190613fa8565b9150600082111561325b57600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0e30db0836040518263ffffffff1660e01b81526004016000604051808303818588803b15801561324157600080fd5b505af1158015613255573d6000803e3d6000fd5b50505050505b8282829550955095505050509450945094915050565b6000806000806064601160008860038111156132905761328f613898565b5b60038111156132a2576132a1613898565b5b815260200190815260200160002060000154886132bf9190614005565b6132c99190614076565b905060006064886132da9190614076565b905080600b546132ea9190613fa8565b600b8190555060646011600089600381111561330957613308613898565b5b600381111561331b5761331a613898565b5b815260200190815260200160002060010154896133389190614005565b6133429190614076565b6064600e8a6133519190614005565b61335b9190614076565b6133659190613fa8565b886133709190614113565b9750600082896133809190614113565b905060006133918c8c868b8d6133fb565b905060008111156133ab5780846133a89190614113565b93505b80826133b79190613fa8565b600f60008e815260200190815260200160002060080160008282546133dc9190613fa8565b9250508190555083838396509650965050505050955095509592505050565b600080670de0b6b3a764000090506000600f600089815260200190815260200160002060060154828761342e9190614005565b6134389190614076565b905080600f60008a815260200190815260200160002060090160008282546134609190613fa8565b9250508190555060008286836134769190614005565b6134809190614076565b9050808387600f60008d8152602001908152602001600020600901546134a69190614005565b6134b09190614076565b6134ba9190614113565b600e60008a815260200190815260200160002060008b815260200190815260200160002060020160008282546134f09190613fa8565b9250508190555082600f60008b8152602001908152602001600020600601548361351a9190614005565b6135249190614076565b8761352f9190614113565b935050505095945050505050565b6000819050919050565b6135508161353d565b82525050565b600060208201905061356b6000830184613547565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156135ab578082015181840152602081019050613590565b60008484015250505050565b6000601f19601f8301169050919050565b60006135d382613571565b6135dd818561357c565b93506135ed81856020860161358d565b6135f6816135b7565b840191505092915050565b6000602082019050818103600083015261361b81846135c8565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061366861366361365e84613623565b613643565b613623565b9050919050565b600061367a8261364d565b9050919050565b600061368c8261366f565b9050919050565b61369c81613681565b82525050565b60006020820190506136b76000830184613693565b92915050565b6000604051905090565b600080fd5b600080fd5b6136da8161353d565b81146136e557600080fd5b50565b6000813590506136f7816136d1565b92915050565b60008060408385031215613714576137136136c7565b5b6000613722858286016136e8565b9250506020613733858286016136e8565b9150509250929050565b60006060820190506137526000830186613547565b61375f6020830185613547565b61376c6040830184613547565b949350505050565b6004811061378157600080fd5b50565b60008135905061379381613774565b92915050565b6000602082840312156137af576137ae6136c7565b5b60006137bd84828501613784565b91505092915050565b60006040820190506137db6000830185613547565b6137e86020830184613547565b9392505050565b60006137fa8261366f565b9050919050565b61380a816137ef565b82525050565b60006020820190506138256000830184613801565b92915050565b60008060408385031215613842576138416136c7565b5b6000613850858286016136e8565b925050602061386185828601613784565b9150509250929050565b600060208284031215613881576138806136c7565b5b600061388f848285016136e8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600481106138d8576138d7613898565b5b50565b60008190506138e9826138c7565b919050565b60006138f9826138db565b9050919050565b613909816138ee565b82525050565b60008115159050919050565b6139248161390f565b82525050565b600061016082019050613940600083018e613547565b61394d602083018d613547565b61395a604083018c613900565b613967606083018b613547565b613974608083018a613547565b61398160a083018961391b565b61398e60c0830188613547565b61399b60e0830187613547565b6139a9610100830186613547565b6139b7610120830185613547565b6139c5610140830184613547565b9c9b505050505050505050505050565b60006139e082613623565b9050919050565b6139f0816139d5565b81146139fb57600080fd5b50565b600081359050613a0d816139e7565b92915050565b600060208284031215613a2957613a286136c7565b5b6000613a37848285016139fe565b91505092915050565b6000613a4b8261366f565b9050919050565b613a5b81613a40565b82525050565b6000602082019050613a766000830184613a52565b92915050565b6000613a878261366f565b9050919050565b613a9781613a7c565b82525050565b6000602082019050613ab26000830184613a8e565b92915050565b6000613ac38261366f565b9050919050565b613ad381613ab8565b82525050565b6000602082019050613aee6000830184613aca565b92915050565b6000613aff8261366f565b9050919050565b613b0f81613af4565b82525050565b6000602082019050613b2a6000830184613b06565b92915050565b613b39816139d5565b82525050565b6000602082019050613b546000830184613b30565b92915050565b6000819050919050565b613b6d81613b5a565b82525050565b600060e082019050613b88600083018a613b30565b613b956020830189613b64565b613ba26040830188613547565b613baf6060830187613547565b613bbc6080830186613547565b613bc960a0830185613547565b613bd660c0830184613547565b98975050505050505050565b6000613bed8261366f565b9050919050565b613bfd81613be2565b82525050565b6000602082019050613c186000830184613bf4565b92915050565b6000602082019050613c33600083018461391b565b92915050565b7f697473206e6f74207265616479207965742e2020636865636b203f657461206960008201527f6e20646973636f72640000000000000000000000000000000000000000000000602082015250565b6000613c9560298361357c565b9150613ca082613c39565b604082019050919050565b60006020820190508181036000830152613cc481613c88565b9050919050565b7f4f6e6c792048756d616e20706c732e2e2e000000000000000000000000000000600082015250565b6000613d0160118361357c565b9150613d0c82613ccb565b602082019050919050565b60006020820190508181036000830152613d3081613cf4565b9050919050565b7f706f636b6574206c696e743a206e6f7420612076616c69642063757272656e6360008201527f7900000000000000000000000000000000000000000000000000000000000000602082015250565b6000613d9360218361357c565b9150613d9e82613d37565b604082019050919050565b60006020820190508181036000830152613dc281613d86565b9050919050565b7f6e6f20766974616c696b2c206e6f000000000000000000000000000000000000600082015250565b6000613dff600e8361357c565b9150613e0a82613dc9565b602082019050919050565b60006020820190508181036000830152613e2e81613df2565b9050919050565b7f6f6e6c79207465616d206a7573742063616e2061637469766174650000000000600082015250565b6000613e6b601b8361357c565b9150613e7682613e35565b602082019050919050565b60006020820190508181036000830152613e9a81613e5e565b9050919050565b7f6d757374206c696e6b20746f206f7468657220466f4d6f334420666972737400600082015250565b6000613ed7601f8361357c565b9150613ee282613ea1565b602082019050919050565b60006020820190508181036000830152613f0681613eca565b9050919050565b7f666f6d6f336420616c7265616479206163746976617465640000000000000000600082015250565b6000613f4360188361357c565b9150613f4e82613f0d565b602082019050919050565b60006020820190508181036000830152613f7281613f36565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000613fb38261353d565b9150613fbe8361353d565b9250828201905080821115613fd657613fd5613f79565b5b92915050565b6000604082019050613ff16000830185613b30565b613ffe6020830184613547565b9392505050565b60006140108261353d565b915061401b8361353d565b92508282026140298161353d565b915082820484148315176140405761403f613f79565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006140818261353d565b915061408c8361353d565b92508261409c5761409b614047565b5b828204905092915050565b7f73696c6c79206465762c20796f7520616c726561647920646964207468617400600082015250565b60006140dd601f8361357c565b91506140e8826140a7565b602082019050919050565b6000602082019050818103600083015261410c816140d0565b9050919050565b600061411e8261353d565b91506141298361353d565b925082820390508181111561414157614140613f79565b5b92915050565b600081519050614156816136d1565b92915050565b600060208284031215614172576141716136c7565b5b600061418084828501614147565b91505092915050565b6141928161390f565b811461419d57600080fd5b50565b6000815190506141af81614189565b92915050565b6000602082840312156141cb576141ca6136c7565b5b60006141d9848285016141a0565b91505092915050565b60006141ed8261353d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361421f5761421e613f79565b5b600182019050919050565b7f706f636b6574206c696e743a20657468206c656674206973206772656174657260008201527f207468616e206d696e2065746820616c6c6f7765642028736f727279206e6f2060208201527f706f636b6574206c696e74290000000000000000000000000000000000000000604082015250565b60006142ac604c8361357c565b91506142b78261422a565b606082019050919050565b600060208201905081810360008301526142db8161429f565b9050919050565b6000819050919050565b60006143076143026142fd846142e2565b613643565b61353d565b9050919050565b614317816142ec565b82525050565b60006040820190506143326000830185613b30565b61433f602083018461430e565b9392505050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b614383826135b7565b810181811067ffffffffffffffff821117156143a2576143a161434b565b5b80604052505050565b60006143b56136bd565b90506143c1828261437a565b919050565b600067ffffffffffffffff8211156143e1576143e061434b565b5b602082029050602081019050919050565b600080fd5b600061440a614405846143c6565b6143ab565b9050808382526020820190506020840283018581111561442d5761442c6143f2565b5b835b8181101561445657806144428882614147565b84526020840193505060208101905061442f565b5050509392505050565b600082601f83011261447557614474614346565b5b81516144858482602086016143f7565b91505092915050565b6000602082840312156144a4576144a36136c7565b5b600082015167ffffffffffffffff8111156144c2576144c16136cc565b5b6144ce84828501614460565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61450c8161353d565b82525050565b600061451e8383614503565b60208301905092915050565b6000602082019050919050565b6000614542826144d7565b61454c81856144e2565b9350614557836144f3565b8060005b8381101561458857815161456f8882614512565b975061457a8361452a565b92505060018101905061455b565b5085935050505092915050565b600060208201905081810360008301526145af8184614537565b905092915050565b6000610100820190506145cd600083018b613b30565b6145da602083018a613547565b6145e76040830189613547565b6145f46060830188613547565b6146016080830187613547565b61460e60a0830186613547565b61461b60c0830185613547565b61462860e0830184613547565b999850505050505050505056fea26469706673582212203be44def5c940084cde01965f9489bed4bba7d88bfb00fb3b183d64ded8c0a0d64736f6c63430008110033',
  deployedBytecode:
    '0x60806040526004361061024a5760003560e01c8063676c6e1111610139578063b483c054116100b6578063d53b26791161007a578063d53b2679146108d8578063d87574e014610903578063ec1d539f1461092e578063ed78cf4a14610959578063f19c452514610963578063fc0e6d941461098e5761025b565b8063b483c054146107d9578063b81d3c0a14610802578063c7e284b814610845578063ccd4d35f14610870578063ce89c80c1461089b5761025b565b80638da5cb5b116100fd5780638da5cb5b1461071157806391263d071461073c57806395d89b4114610753578063a35aae9c1461077e578063b02f342c146107a95761025b565b8063676c6e111461063a57806367ea9a23146106655780636b26e311146106905780637c9e4eea146106bb5780638b6252d9146106e65761025b565b80633ccfd60b116101c75780634ef237fc1161018b5780634ef237fc1461052b5780635325269414610568578063576b5a20146105a55780635c007c39146105d057806363066434146105fb5761025b565b80633ccfd60b1461043a5780633e5602cf146104515780633f9e54ca146104985780634978b68a146104c35780634a47d830146105005761025b565b80631e75dd771161020e5780631e75dd771461033e578063256d41361461037c57806328279bb2146103a757806330c5d3e4146103d2578063375941d31461040f5761025b565b806304c0ae4e1461026757806306fdde03146102925780630a226fb9146102bd5780630d59212e146102e85780630f15f4c0146103275761025b565b3661025b5761025960006109cc565b005b61026560006109cc565b005b34801561027357600080fd5b5061027c610b63565b6040516102899190613556565b60405180910390f35b34801561029e57600080fd5b506102a7610b6b565b6040516102b49190613601565b60405180910390f35b3480156102c957600080fd5b506102d2610ba4565b6040516102df91906136a2565b60405180910390f35b3480156102f457600080fd5b5061030f600480360381019061030a91906136fd565b610bca565b60405161031e9392919061373d565b60405180910390f35b34801561033357600080fd5b5061033c610c01565b005b34801561034a57600080fd5b5061036560048036038101906103609190613799565b610def565b6040516103739291906137c6565b60405180910390f35b34801561038857600080fd5b50610391610e13565b60405161039e9190613810565b60405180910390f35b3480156103b357600080fd5b506103bc610e39565b6040516103c99190613556565b60405180910390f35b3480156103de57600080fd5b506103f960048036038101906103f4919061382b565b610e46565b6040516104069190613556565b60405180910390f35b34801561041b57600080fd5b50610424610e6b565b6040516104319190613556565b60405180910390f35b34801561044657600080fd5b5061044f610e70565b005b34801561045d57600080fd5b506104786004803603810190610473919061386b565b611179565b60405161048f9b9a9998979695949392919061392a565b60405180910390f35b3480156104a457600080fd5b506104ad6111ed565b6040516104ba9190613556565b60405180910390f35b3480156104cf57600080fd5b506104ea60048036038101906104e5919061386b565b6111f9565b6040516104f79190613556565b60405180910390f35b34801561050c57600080fd5b506105156112c6565b6040516105229190613556565b60405180910390f35b34801561053757600080fd5b50610552600480360381019061054d9190613a13565b6112cc565b60405161055f9190613556565b60405180910390f35b34801561057457600080fd5b5061058f600480360381019061058a919061386b565b6112e4565b60405161059c9190613556565b60405180910390f35b3480156105b157600080fd5b506105ba61135e565b6040516105c79190613a61565b60405180910390f35b3480156105dc57600080fd5b506105e5611384565b6040516105f29190613a9d565b60405180910390f35b34801561060757600080fd5b50610622600480360381019061061d919061386b565b6113aa565b6040516106319392919061373d565b60405180910390f35b34801561064657600080fd5b5061064f61160a565b60405161065c9190613ad9565b60405180910390f35b34801561067157600080fd5b5061067a611630565b6040516106879190613556565b60405180910390f35b34801561069c57600080fd5b506106a5611636565b6040516106b29190613556565b60405180910390f35b3480156106c757600080fd5b506106d0611642565b6040516106dd9190613556565b60405180910390f35b3480156106f257600080fd5b506106fb61164a565b6040516107089190613b15565b60405180910390f35b34801561071d57600080fd5b5061072661166e565b6040516107339190613b3f565b60405180910390f35b34801561074857600080fd5b50610751611694565b005b34801561075f57600080fd5b5061076861171e565b6040516107759190613601565b60405180910390f35b34801561078a57600080fd5b50610793611757565b6040516107a09190613556565b60405180910390f35b6107c360048036038101906107be9190613799565b6109cc565b6040516107d09190613556565b60405180910390f35b3480156107e557600080fd5b5061080060048036038101906107fb9190613a13565b61175d565b005b34801561080e57600080fd5b506108296004803603810190610824919061386b565b6118c2565b60405161083c9796959493929190613b73565b60405180910390f35b34801561085157600080fd5b5061085a611924565b6040516108679190613556565b60405180910390f35b34801561087c57600080fd5b50610885611984565b6040516108929190613c03565b60405180910390f35b3480156108a757600080fd5b506108c260048036038101906108bd91906136fd565b6119aa565b6040516108cf9190613556565b60405180910390f35b3480156108e457600080fd5b506108ed611ab2565b6040516108fa9190613c1e565b60405180910390f35b34801561090f57600080fd5b50610918611ac5565b6040516109259190613556565b60405180910390f35b34801561093a57600080fd5b50610943611acb565b6040516109509190613556565b60405180910390f35b610961611ad7565b005b34801561096f57600080fd5b50610978611b1a565b6040516109859190613556565b60405180910390f35b34801561099a57600080fd5b506109b560048036038101906109b09190613799565b611b20565b6040516109c39291906137c6565b60405180910390f35b600060011515600a60009054906101000a900460ff16151514610a24576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a1b90613cab565b60405180910390fd5b336000813b905060008114610a6e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6590613d17565b60405180910390fd5b34633b9aca00811015610ab6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aad90613da9565b60405180910390fd5b69152d02c7e14af6800000811115610b03576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610afa90613e15565b60405180910390fd5b610b0b611b44565b506000600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050610b5a8187611ccd565b50505050919050565b633b9aca0081565b6040518060400160405280600f81526020017f466f4d6f5844204f6666696369616c000000000000000000000000000000000081525081565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600e602052816000526040600020602052806000526040600020600091509150508060000154908060010154908060020154905083565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c91576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8890613e81565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610d22576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d1990613eed565b60405180910390fd5b60001515600a60009054906101000a900460ff16151514610d78576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d6f90613f59565b60405180910390fd5b6001600a60006101000a81548160ff021916908315150217905550600160098190555042600f6000600181526020019081526020016000206003018190555061012c60085442610dc89190613fa8565b610dd29190613fa8565b600f60006001815260200190815260200160002060040181905550565b60116020528060005260406000206000915090508060000154908060010154905082565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b68056bc75e2d6310000081565b6010602052816000526040600020602052806000526040600020600091509150505481565b601e81565b60011515600a60009054906101000a900460ff16151514610ec6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ebd90613cab565b60405180910390fd5b336000813b905060008114610f10576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f0790613d17565b60405180910390fd5b6000600954905060004290506000600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600f60008581526020019081526020016000206004015483118015610fae575060001515600f600086815260200190815260200160002060050160009054906101000a900460ff161515145b8015610fd157506000600f60008681526020019081526020016000206001015414155b156110a4576001600f600086815260200190815260200160002060050160006101000a81548160ff02191690831515021790555061100d611e08565b61101682612249565b9050600081111561109f57600d600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561109d573d6000803e3d6000fd5b505b611137565b6110ad82612249565b9050600081111561113657600d600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015611134573d6000803e3d6000fd5b505b5b817fffb7a058f3489b3f4215d0517dd9bd49ccec359af5bf041d75894d2cb84385ca3383604051611169929190613fdc565b60405180910390a2505050505050565b600f6020528060005260406000206000915090508060000154908060010154908060020160009054906101000a900460ff16908060030154908060040154908060050160009054906101000a900460ff169080600601549080600701549080600801549080600901549080600a015490508b565b670de0b6b3a764000081565b60008060095490506000429050600854600f60008481526020019081526020016000206003015461122a9190613fa8565b8111801561124f57506000600f60008481526020019081526020016000206007015414155b80156112715750600f6000838152602001908152602001600020600401548111155b156112b3576112aa8485600f60008681526020019081526020016000206006015461129c9190613fa8565b61232f90919063ffffffff16565b925050506112c1565b6112bc84612360565b925050505b919050565b61012c81565b600c6020528060005260406000206000915090505481565b6000678ac7230489e8000082106112fe57604b9050611359565b670de0b6b3a7640000821015801561131d5750678ac7230489e8000082105b1561132b5760329050611359565b67016345785d8a0000821015801561134a5750670de0b6b3a764000082105b156113585760199050611359565b5b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000806009549050600f60008281526020019081526020016000206004015442118015611401575060001515600f600083815260200190815260200160002060050160009054906101000a900460ff161515145b1561158c57600080600080600f6000868152602001908152602001600020600701549250600f6000868152602001908152602001600020600601549150600f6000868152602001908152602001600020600901549350600f6000868152602001908152602001600020600801549050600089600f6000888152602001908152602001600020600101540361151f57606460308361149e9190614005565b6114a89190614076565b600d60008c8152602001908152602001600020600401546114c99190613fa8565b6114d68b878587866123d7565b600d60008d8152602001908152602001600020600501546114f79190613fa8565b600d60008d815260200190815260200160002060030154985098509850505050505050611603565b600d60008b8152602001908152602001600020600401546115438b878587866123d7565b600d60008d8152602001908152602001600020600501546115649190613fa8565b600d60008d815260200190815260200160002060030154985098509850505050505050611603565b600d6000868152602001908152602001600020600401546115c386600d6000898152602001908152602001600020600201546124d6565b600d6000888152602001908152602001600020600501546115e49190613fa8565b600d600088815260200190815260200160002060030154935093509350505b9193909250565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60085481565b67016345785d8a000081565b633b9aca0081565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61012c600854426116a59190613fa8565b6116af9190613fa8565b600f60006009548152602001908152602001600020600401819055507f18c072bc98b0b73c93817369c5f408345da097127acc038ec75ad73c261c265a61012c600854426116fd9190613fa8565b6117079190613fa8565b6040516117149190613556565b60405180910390a1565b6040518060400160405280600381526020017f465844000000000000000000000000000000000000000000000000000000000081525081565b60095481565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146117ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117e490613e81565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461187e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611875906140f3565b60405180910390fd5b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600d6020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154908060040154908060050154908060060154905087565b60008060095490506000429050600f60008381526020019081526020016000206004015481101561197a5780600f6000848152602001908152602001600020600401546119719190614113565b92505050611981565b6000925050505b90565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080429050600854600f6000868152602001908152602001600020600301546119d49190613fa8565b811180156119f957506000600f60008681526020019081526020016000206007015414155b8015611a1b5750600f6000858152602001908152602001600020600401548111155b15611a5157611a4983600f60008781526020019081526020016000206007015461256e90919063ffffffff16565b915050611aac565b600f6000858152602001908152602001600020600401548111611a9f57611a9783600f60008781526020019081526020016000206000015461256e90919063ffffffff16565b915050611aac565b611aa88361259f565b9150505b92915050565b600a60009054906101000a900460ff1681565b600b5481565b670de0b6b3a764000081565b60006001600954611ae89190613fa8565b905034600f60008381526020019081526020016000206008016000828254611b109190613fa8565b9250508190555050565b61012c81565b60126020528060005260406000206000915090508060000154908060010154905082565b600080600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008103611cc95760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e56556a9336040518263ffffffff1660e01b8152600401611bea9190613b3f565b6020604051808303816000875af1158015611c09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c2d919061415c565b905080600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555033600d600083815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5090565b600060095490506000429050600f60008381526020019081526020016000206004015481111580611d355750600f60008381526020019081526020016000206004015481118015611d3457506000600f600084815260200190815260200160002060010154145b5b15611d4b57611d4682853486612629565b611e02565b600f60008381526020019081526020016000206004015481118015611d97575060001515600f600084815260200190815260200160002060050160009054906101000a900460ff161515145b15611dd4576001600f600084815260200190815260200160002060050160006101000a81548160ff021916908315150217905550611dd3611e08565b5b34600d60008681526020019081526020016000206005016000828254611dfa9190613fa8565b925050819055505b50505050565b600060095490506000600f60008381526020019081526020016000206001015490506000600f600084815260200190815260200160002060020160009054906101000a900460ff1690506000600f60008581526020019081526020016000206008015490506000603282611e7c9190614076565b90506000606460126000866003811115611e9957611e98613898565b5b6003811115611eab57611eaa613898565b5b81526020019081526020016000206001015484611ec89190614005565b611ed29190614076565b90506000606460126000876003811115611eef57611eee613898565b5b6003811115611f0157611f00613898565b5b81526020019081526020016000206000015485611f1e9190614005565b611f289190614076565b905060006064603086611f3b9190614005565b611f459190614076565b905060008383868489611f589190614113565b611f629190614113565b611f6c9190614113565b611f769190614113565b90506000670de0b6b3a764000090506000600f60008c8152602001908152602001600020600601548286611faa9190614005565b611fb49190614076565b9050600082600f60008e81526020019081526020016000206006015483611fdb9190614005565b611fe59190614076565b86611ff09190614113565b905060008111156120185780866120079190614113565b955080846120159190613fa8565b93505b84600d60008d8152602001908152602001600020600401600082825461203e9190613fa8565b92505081905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0e30db0896040518263ffffffff1660e01b815260040160206040518083038185885af11580156120b4573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906120d991906141b5565b6120f05787876120e99190613fa8565b9650600097505b81600f60008e815260200190815260200160002060090160008282546121169190613fa8565b9250508190555060008711156121aa57600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0e30db0886040518263ffffffff1660e01b81526004016000604051808303818588803b15801561219057600080fd5b505af11580156121a4573d6000803e3d6000fd5b50505050505b600960008154809291906121bd906141e2565b91905055508b806121cd906141e2565b9c505042600f60008e81526020019081526020016000206003018190555060085461012c426121fc9190613fa8565b6122069190613fa8565b600f60008e81526020019081526020016000206004018190555083600f60008e815260200190815260200160002060080181905550505050505050505050505050565b600061226b82600d600085815260200190815260200160002060020154612d9e565b6000600d600084815260200190815260200160002060060154600d600085815260200190815260200160002060050154600d6000868152602001908152602001600020600401546122bc9190613fa8565b6122c69190613fa8565b90506000811115612326576000600d6000858152602001908152602001600020600401819055506000600d6000858152602001908152602001600020600501819055506000600d6000858152602001908152602001600020600601819055505b80915050919050565b600061234582846123409190614113565b612360565b61234e84612360565b6123589190614113565b905092915050565b6000612373670de0b6b3a7640000612e26565b6002670de0b6b3a7640000846123899190614005565b65886c8f67307061239a9190614005565b6123a49190614076565b6123ad84612e26565b6304a817c86123bc9190614005565b6123c69190613fa8565b6123d09190614076565b9050919050565b6000600e60008781526020019081526020016000206000600954815260200190815260200160002060020154670de0b6b3a76400008385670de0b6b3a7640000606460126000600f6000600954815260200190815260200160002060020160009054906101000a900460ff16600381111561245557612454613898565b5b600381111561246757612466613898565b5b8152602001908152602001600020600001548a6124849190614005565b61248e9190614076565b6124989190614005565b6124a29190614076565b886124ad9190613fa8565b6124b79190614005565b6124c19190614076565b6124cb9190614113565b905095945050505050565b6000600e6000848152602001908152602001600020600083815260200190815260200160002060020154670de0b6b3a7640000600e6000868152602001908152602001600020600085815260200190815260200160002060010154600f6000868152602001908152602001600020600901546125529190614005565b61255c9190614076565b6125669190614113565b905092915050565b60006125798361259f565b61258d83856125889190613fa8565b61259f565b6125979190614113565b905092915050565b60006309502f906d03b2a1d15167e7c5699bfde0000061260e7a0dac7055469777a6122ee4310dd6c14410500f29048400000000006b01027e72f1f1281308800000670de0b6b3a7640000876125f59190614005565b6125ff9190614005565b6126099190613fa8565b612e3b565b6126189190614113565b6126229190614076565b9050919050565b6000600e6000858152602001908152602001600020600086815260200190815260200160002060010154036126625761266183612e98565b5b68056bc75e2d63100000600f6000868152602001908152602001600020600701541080156126c95750670de0b6b3a764000082600e60008681526020019081526020016000206000878152602001908152602001600020600001546126c79190613fa8565b115b1561275f576000600e6000858152602001908152602001600020600086815260200190815260200160002060000154670de0b6b3a764000061270b9190614113565b90506000818461271b9190614113565b905080600d60008781526020019081526020016000206005015461273f9190613fa8565b600d60008781526020019081526020016000206005018190555081935050505b633b9aca0082116127a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161279c906142c2565b60405180910390fd5b60006127d083600f60008881526020019081526020016000206007015461256e90919063ffffffff16565b9050670de0b6b3a764000081106128b2576127eb8186612ef7565b83600f600087815260200190815260200160002060010154146128245783600f6000878152602001908152602001600020600101819055505b81600381111561283757612836613898565b5b600f600087815260200190815260200160002060020160009054906101000a900460ff16600381111561286d5761286c613898565b5b146128b15781600f600087815260200190815260200160002060020160006101000a81548160ff021916908360038111156128ab576128aa613898565b5b02179055505b5b600067016345785d8a00008410612a055760011515600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e5ed3d4e6040518163ffffffff1660e01b81526004016020604051808303816000875af1158015612936573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061295a91906141b5565b151503612a0457606461296c856112e4565b600b546129799190614005565b6129839190614076565b905080600d600087815260200190815260200160002060040160008282546129ab9190613fa8565b9250508190555080600b60008282546129c49190614113565b92505081905550847fae56386e6ed43cbe95193f97fa8cb9074e7240349d8fd4f3c6da2ac8dc69b6bc826040516129fb9190613556565b60405180910390a25b5b633b9aca008410158015612a195750600081145b15612be65760011515600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166337b3e5eb6040518163ffffffff1660e01b81526004016020604051808303816000875af1158015612a91573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ab591906141b5565b151503612be5576000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637fc0000f3360016040518363ffffffff1660e01b8152600401612b1c92919061431d565b6000604051808303816000875af1158015612b3b573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190612b64919061448e565b90506001600f6000898152602001908152602001600020600a016000828254612b8d9190613fa8565b925050819055503373ffffffffffffffffffffffffffffffffffffffff16877f29f9ce618760ce1967414750c3038e347e09d27a7e145f6c25fb8fd3f89fd8f083604051612bdb9190614595565b60405180910390a3505b5b81600e600087815260200190815260200160002060008881526020019081526020016000206001016000828254612c1d9190613fa8565b9250508190555083600e600087815260200190815260200160002060008881526020019081526020016000206000016000828254612c5b9190613fa8565b9250508190555081600f60008881526020019081526020016000206006016000828254612c889190613fa8565b9250508190555083600f60008881526020019081526020016000206007016000828254612cb59190613fa8565b9250508190555083601060008881526020019081526020016000206000856003811115612ce557612ce4613898565b5b6003811115612cf757612cf6613898565b5b81526020019081526020016000206000828254612d149190613fa8565b925050819055506000806000612d2c89898989613018565b9250925092506000806000612d448c8c8c8c8c613271565b9250925092508a7f2c49a56e0a4034b700f57b0e668ae3bfbb02abc8fa94286c7b206e1cca9ceceb338c8b8b8a898989604051612d889897969594939291906145b7565b60405180910390a2505050505050505050505050565b6000612daa83836124d6565b90506000811115612e215780600d60008581526020019081526020016000206005016000828254612ddb9190613fa8565b9250508190555080600e600085815260200190815260200160002060008481526020019081526020016000206002016000828254612e199190613fa8565b925050819055505b505050565b60008182612e349190614005565b9050919050565b6000806002600184612e4d9190613fa8565b612e579190614076565b90508291505b81811015612e92578091506002818285612e779190614076565b612e819190613fa8565b612e8b9190614076565b9050612e5d565b50919050565b6000600d60008381526020019081526020016000206002015414612ed757612ed681600d600084815260200190815260200160002060020154612d9e565b5b600954600d60008381526020019081526020016000206002018190555050565b60004290506000600f60008481526020019081526020016000206004015482118015612f3957506000600f600085815260200190815260200160002060010154145b15612f705781601e670de0b6b3a764000086612f559190614076565b612f5f9190614005565b612f699190613fa8565b9050612fb4565b600f600084815260200190815260200160002060040154601e670de0b6b3a764000086612f9d9190614076565b612fa79190614005565b612fb19190613fa8565b90505b8161012c612fc29190613fa8565b811015612fe95780600f600085815260200190815260200160002060040181905550613012565b8161012c612ff79190613fa8565b600f6000858152602001908152602001600020600401819055505b50505050565b600080600080606460028761302d9190614005565b6130379190614076565b90506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0e30db0836040518263ffffffff1660e01b815260040160206040518083038185885af11580156130aa573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906130cf91906141b5565b6130db57819050600091505b60006064886130ea9190614076565b9050600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ed78cf4a826040518263ffffffff1660e01b81526004016000604051808303818588803b15801561315657600080fd5b505af115801561316a573d6000803e3d6000fd5b505050505060646011600089600381111561318857613187613898565b5b600381111561319a57613199613898565b5b815260200190815260200160002060010154896131b79190614005565b6131c19190614076565b826131cc9190613fa8565b9150600082111561325b57600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0e30db0836040518263ffffffff1660e01b81526004016000604051808303818588803b15801561324157600080fd5b505af1158015613255573d6000803e3d6000fd5b50505050505b8282829550955095505050509450945094915050565b6000806000806064601160008860038111156132905761328f613898565b5b60038111156132a2576132a1613898565b5b815260200190815260200160002060000154886132bf9190614005565b6132c99190614076565b905060006064886132da9190614076565b905080600b546132ea9190613fa8565b600b8190555060646011600089600381111561330957613308613898565b5b600381111561331b5761331a613898565b5b815260200190815260200160002060010154896133389190614005565b6133429190614076565b6064600e8a6133519190614005565b61335b9190614076565b6133659190613fa8565b886133709190614113565b9750600082896133809190614113565b905060006133918c8c868b8d6133fb565b905060008111156133ab5780846133a89190614113565b93505b80826133b79190613fa8565b600f60008e815260200190815260200160002060080160008282546133dc9190613fa8565b9250508190555083838396509650965050505050955095509592505050565b600080670de0b6b3a764000090506000600f600089815260200190815260200160002060060154828761342e9190614005565b6134389190614076565b905080600f60008a815260200190815260200160002060090160008282546134609190613fa8565b9250508190555060008286836134769190614005565b6134809190614076565b9050808387600f60008d8152602001908152602001600020600901546134a69190614005565b6134b09190614076565b6134ba9190614113565b600e60008a815260200190815260200160002060008b815260200190815260200160002060020160008282546134f09190613fa8565b9250508190555082600f60008b8152602001908152602001600020600601548361351a9190614005565b6135249190614076565b8761352f9190614113565b935050505095945050505050565b6000819050919050565b6135508161353d565b82525050565b600060208201905061356b6000830184613547565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156135ab578082015181840152602081019050613590565b60008484015250505050565b6000601f19601f8301169050919050565b60006135d382613571565b6135dd818561357c565b93506135ed81856020860161358d565b6135f6816135b7565b840191505092915050565b6000602082019050818103600083015261361b81846135c8565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061366861366361365e84613623565b613643565b613623565b9050919050565b600061367a8261364d565b9050919050565b600061368c8261366f565b9050919050565b61369c81613681565b82525050565b60006020820190506136b76000830184613693565b92915050565b6000604051905090565b600080fd5b600080fd5b6136da8161353d565b81146136e557600080fd5b50565b6000813590506136f7816136d1565b92915050565b60008060408385031215613714576137136136c7565b5b6000613722858286016136e8565b9250506020613733858286016136e8565b9150509250929050565b60006060820190506137526000830186613547565b61375f6020830185613547565b61376c6040830184613547565b949350505050565b6004811061378157600080fd5b50565b60008135905061379381613774565b92915050565b6000602082840312156137af576137ae6136c7565b5b60006137bd84828501613784565b91505092915050565b60006040820190506137db6000830185613547565b6137e86020830184613547565b9392505050565b60006137fa8261366f565b9050919050565b61380a816137ef565b82525050565b60006020820190506138256000830184613801565b92915050565b60008060408385031215613842576138416136c7565b5b6000613850858286016136e8565b925050602061386185828601613784565b9150509250929050565b600060208284031215613881576138806136c7565b5b600061388f848285016136e8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600481106138d8576138d7613898565b5b50565b60008190506138e9826138c7565b919050565b60006138f9826138db565b9050919050565b613909816138ee565b82525050565b60008115159050919050565b6139248161390f565b82525050565b600061016082019050613940600083018e613547565b61394d602083018d613547565b61395a604083018c613900565b613967606083018b613547565b613974608083018a613547565b61398160a083018961391b565b61398e60c0830188613547565b61399b60e0830187613547565b6139a9610100830186613547565b6139b7610120830185613547565b6139c5610140830184613547565b9c9b505050505050505050505050565b60006139e082613623565b9050919050565b6139f0816139d5565b81146139fb57600080fd5b50565b600081359050613a0d816139e7565b92915050565b600060208284031215613a2957613a286136c7565b5b6000613a37848285016139fe565b91505092915050565b6000613a4b8261366f565b9050919050565b613a5b81613a40565b82525050565b6000602082019050613a766000830184613a52565b92915050565b6000613a878261366f565b9050919050565b613a9781613a7c565b82525050565b6000602082019050613ab26000830184613a8e565b92915050565b6000613ac38261366f565b9050919050565b613ad381613ab8565b82525050565b6000602082019050613aee6000830184613aca565b92915050565b6000613aff8261366f565b9050919050565b613b0f81613af4565b82525050565b6000602082019050613b2a6000830184613b06565b92915050565b613b39816139d5565b82525050565b6000602082019050613b546000830184613b30565b92915050565b6000819050919050565b613b6d81613b5a565b82525050565b600060e082019050613b88600083018a613b30565b613b956020830189613b64565b613ba26040830188613547565b613baf6060830187613547565b613bbc6080830186613547565b613bc960a0830185613547565b613bd660c0830184613547565b98975050505050505050565b6000613bed8261366f565b9050919050565b613bfd81613be2565b82525050565b6000602082019050613c186000830184613bf4565b92915050565b6000602082019050613c33600083018461391b565b92915050565b7f697473206e6f74207265616479207965742e2020636865636b203f657461206960008201527f6e20646973636f72640000000000000000000000000000000000000000000000602082015250565b6000613c9560298361357c565b9150613ca082613c39565b604082019050919050565b60006020820190508181036000830152613cc481613c88565b9050919050565b7f4f6e6c792048756d616e20706c732e2e2e000000000000000000000000000000600082015250565b6000613d0160118361357c565b9150613d0c82613ccb565b602082019050919050565b60006020820190508181036000830152613d3081613cf4565b9050919050565b7f706f636b6574206c696e743a206e6f7420612076616c69642063757272656e6360008201527f7900000000000000000000000000000000000000000000000000000000000000602082015250565b6000613d9360218361357c565b9150613d9e82613d37565b604082019050919050565b60006020820190508181036000830152613dc281613d86565b9050919050565b7f6e6f20766974616c696b2c206e6f000000000000000000000000000000000000600082015250565b6000613dff600e8361357c565b9150613e0a82613dc9565b602082019050919050565b60006020820190508181036000830152613e2e81613df2565b9050919050565b7f6f6e6c79207465616d206a7573742063616e2061637469766174650000000000600082015250565b6000613e6b601b8361357c565b9150613e7682613e35565b602082019050919050565b60006020820190508181036000830152613e9a81613e5e565b9050919050565b7f6d757374206c696e6b20746f206f7468657220466f4d6f334420666972737400600082015250565b6000613ed7601f8361357c565b9150613ee282613ea1565b602082019050919050565b60006020820190508181036000830152613f0681613eca565b9050919050565b7f666f6d6f336420616c7265616479206163746976617465640000000000000000600082015250565b6000613f4360188361357c565b9150613f4e82613f0d565b602082019050919050565b60006020820190508181036000830152613f7281613f36565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000613fb38261353d565b9150613fbe8361353d565b9250828201905080821115613fd657613fd5613f79565b5b92915050565b6000604082019050613ff16000830185613b30565b613ffe6020830184613547565b9392505050565b60006140108261353d565b915061401b8361353d565b92508282026140298161353d565b915082820484148315176140405761403f613f79565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006140818261353d565b915061408c8361353d565b92508261409c5761409b614047565b5b828204905092915050565b7f73696c6c79206465762c20796f7520616c726561647920646964207468617400600082015250565b60006140dd601f8361357c565b91506140e8826140a7565b602082019050919050565b6000602082019050818103600083015261410c816140d0565b9050919050565b600061411e8261353d565b91506141298361353d565b925082820390508181111561414157614140613f79565b5b92915050565b600081519050614156816136d1565b92915050565b600060208284031215614172576141716136c7565b5b600061418084828501614147565b91505092915050565b6141928161390f565b811461419d57600080fd5b50565b6000815190506141af81614189565b92915050565b6000602082840312156141cb576141ca6136c7565b5b60006141d9848285016141a0565b91505092915050565b60006141ed8261353d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361421f5761421e613f79565b5b600182019050919050565b7f706f636b6574206c696e743a20657468206c656674206973206772656174657260008201527f207468616e206d696e2065746820616c6c6f7765642028736f727279206e6f2060208201527f706f636b6574206c696e74290000000000000000000000000000000000000000604082015250565b60006142ac604c8361357c565b91506142b78261422a565b606082019050919050565b600060208201905081810360008301526142db8161429f565b9050919050565b6000819050919050565b60006143076143026142fd846142e2565b613643565b61353d565b9050919050565b614317816142ec565b82525050565b60006040820190506143326000830185613b30565b61433f602083018461430e565b9392505050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b614383826135b7565b810181811067ffffffffffffffff821117156143a2576143a161434b565b5b80604052505050565b60006143b56136bd565b90506143c1828261437a565b919050565b600067ffffffffffffffff8211156143e1576143e061434b565b5b602082029050602081019050919050565b600080fd5b600061440a614405846143c6565b6143ab565b9050808382526020820190506020840283018581111561442d5761442c6143f2565b5b835b8181101561445657806144428882614147565b84526020840193505060208101905061442f565b5050509392505050565b600082601f83011261447557614474614346565b5b81516144858482602086016143f7565b91505092915050565b6000602082840312156144a4576144a36136c7565b5b600082015167ffffffffffffffff8111156144c2576144c16136cc565b5b6144ce84828501614460565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61450c8161353d565b82525050565b600061451e8383614503565b60208301905092915050565b6000602082019050919050565b6000614542826144d7565b61454c81856144e2565b9350614557836144f3565b8060005b8381101561458857815161456f8882614512565b975061457a8361452a565b92505060018101905061455b565b5085935050505092915050565b600060208201905081810360008301526145af8184614537565b905092915050565b6000610100820190506145cd600083018b613b30565b6145da602083018a613547565b6145e76040830189613547565b6145f46060830188613547565b6146016080830187613547565b61460e60a0830186613547565b61461b60c0830185613547565b61462860e0830184613547565b999850505050505050505056fea26469706673582212203be44def5c940084cde01965f9489bed4bba7d88bfb00fb3b183d64ded8c0a0d64736f6c63430008110033',
  linkReferences: {},
  deployedLinkReferences: {}
};
