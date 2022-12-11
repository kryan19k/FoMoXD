import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { network, ethers, upgrades, waffle } from "hardhat";
import SnapshotHepler from "./SnapshotHelper";
import { minETHAllowed_, Teams } from "./testConfig";
import { formatUnits, parseEther, parseUnits } from "ethers/lib/utils";
import { SimpleNumOracle__factory } from "../typechain-types";
const { deployMockContract, provider } = waffle;

describe("FoMoXD", function () {
  async function deployFoMoFixture() {
    const [owner, player1, player2, player3, dev1, dev2, otherAccount] =
      await ethers.getSigners();
    const FoMoERC20 = await ethers.getContractFactory("FoMoERC20");
    const foMoERC20 = await FoMoERC20.deploy(10 ** 6, "FoMoERC20", "FXD");

    const FoMoERC721 = await ethers.getContractFactory("FoMoERC721");
    const foMoERC721 = await upgrades.deployProxy(FoMoERC721, [
      "fomoERC721",
      "FMO",
    ]);

    const PlayerBook = await ethers.getContractFactory("PlayerBook");
    const playerBook = await PlayerBook.deploy();

    const Divies = await ethers.getContractFactory("Divies");
    const divies = await Divies.deploy();

    const Community = await ethers.getContractFactory("Community");
    const community = await Community.deploy(
      [owner.address, dev1.address, dev2.address],
      2
    );

    const NumOracle = await ethers.getContractFactory("SimpleNumOracle");
    const numOracle = await NumOracle.deploy(1);
    const mockedNumOracle = await deployMockContract(
      owner,
      SimpleNumOracle__factory.abi
    );

    const FoMoXD = await ethers.getContractFactory("FoMoXD");
    const foMoXD = await FoMoXD.deploy(
      playerBook.address,
      community.address,
      foMoERC20.address,
      foMoERC721.address,
      divies.address,
      mockedNumOracle.address
    );
    await mockedNumOracle.mock.setFoMoGame.returns();
    await mockedNumOracle.setFoMoGame(foMoXD.address);
    await mockedNumOracle.mock.isAirdrop.returns(false);
    await mockedNumOracle.mock.isAirdropNfts.returns(false);

    await numOracle.setFoMoGame(foMoXD.address);
    await foMoERC721.setFoMoGame(foMoXD.address);

    const otherFoMo = await FoMoXD.deploy(
      playerBook.address,
      community.address,
      foMoERC20.address,
      foMoERC721.address,
      divies.address,
      mockedNumOracle.address
    );

    await foMoXD.setOtherFomo(otherFoMo.address);

    const snapshot = new SnapshotHepler(foMoXD);

    return {
      owner,
      foMoXD,
      otherFoMo,
      snapshot,
      player1,
      player2,
      player3,
      otherAccount,
      dev1,
      dev2,
      mockedNumOracle,
      foMoERC721,
    };
  }

  describe("Deployment", function () {
    it("Should activate game and begin new round", async function () {
      const { foMoXD, snapshot } = await loadFixture(deployFoMoFixture);
      let { roundID_, activated_, roundInitTime_, roundGapTime_ } =
        await snapshot.getConfigSnapshot();
      expect(activated_).to.equal(false);
      expect(roundID_).to.equal(0);
      await foMoXD.activate();
      ({ roundID_, activated_ } = await snapshot.getConfigSnapshot());
      const roundData = await snapshot.getRoundSnapshot(+roundID_);
      const {
        winnerId,
        winnerTeamId,
        endTime,
        ended,
        startTime,
        puffs,
        eth,
        pot,
        mask,
      } = roundData;
      expect(activated_).to.equal(true);
      expect(roundID_).to.equal(1);
      expect(winnerId).to.equal(0);
      expect(winnerTeamId).to.equal(0);
      expect(ended).to.equal(false);
      expect(puffs).to.equal(0);
      expect(eth).to.equal(0);
      expect(pot).to.equal(0);
      expect(mask).to.equal(0);
      expect(+endTime - +startTime).to.equal(+roundGapTime_ + +roundInitTime_);
    });
  });

  describe("Purchase Puffs", function () {
    describe("States", function () {
      describe("Player Id", function () {
        it("Should assign player id increasing (by 1) & init player data", async function () {
          const { foMoXD, snapshot } = await loadFixture(deployFoMoFixture);
          const players = await ethers.getSigners();
          await foMoXD.activate();
          /* ------------------------ Puffs ----------------------- */
          let lastPuffsGot = Infinity;
          for (const [index, p] of players.entries()) {
            const depositETHAmount = +parseUnits("1000", "gwei") + 1;
            await foMoXD.connect(p).buyPuffXAddr(Teams.CHOCO, {
              value: depositETHAmount,
            });
            expect(await foMoXD.connect(p).playerIDxAddr_(p.address)).to.equal(
              index + 1
            );
            const { player_, playerRoundsData_ } =
              await snapshot.getPlayerSnapshot(1, index + 1);
            const {
              addr, // player address
              // name, // player name
              winningVault, // winnings vault
              generalVault, // general vault
              affiliateVault, // affiliate vault
              lastRound, // last round played
              lastAffiliateId, // last affiliate id used
            } = player_;
            const { eth, puffs, mask } = playerRoundsData_;
            expect(lastRound).to.equal(1);
            expect(addr).to.equal(p.address);
            expect(winningVault).to.equal(0);
            expect(generalVault).to.equal(0);
            expect(affiliateVault).to.equal(0);
            expect(lastAffiliateId).to.equal(0);
            expect(eth).to.equal(depositETHAmount);
            /* -------------- puff price should goes up ------------- */
            expect(+puffs).to.gte(0);
            expect(+puffs).to.lte(lastPuffsGot);
            expect(mask).to.gte(0);
            lastPuffsGot = +puffs;
          }
        });
      });

      describe("Puffs Price", function () {
        it("Should be able to buy X puffs with predictable price", async function () {
          const { foMoXD, snapshot, player1, player2, player3, otherAccount } =
            await loadFixture(deployFoMoFixture);
          const puffsQty = 5n * 10n ** 18n;
          const value = await foMoXD.iWantXPuffs(puffsQty);
          await foMoXD.activate();
          /* ------------------------ Puffs ----------------------- */
          await foMoXD.connect(player1).buyPuffXAddr(Teams.CHOCO, {
            value,
          });
          await foMoXD.connect(player1).playerIDxAddr_(player1.address);
          let { player_, playerRoundsData_ } = await snapshot.getPlayerSnapshot(
            1,
            1
          );
          const { eth, puffs, mask } = playerRoundsData_;
          expect(eth).to.equal(value);
          expect(puffs).to.equal(puffsQty);
          expect(mask).to.equal(0);
        });
      });

      describe("Timers", function () {
        it("Should add up times purchase at least 1 key", async function () {
          const { foMoXD, snapshot, player1 } = await loadFixture(
            deployFoMoFixture
          );
          const { roundIncTime_ } = await snapshot.getConfigSnapshot();
          await foMoXD.activate();
          await time.increase(240);
          for (const [index, puffsQty] of [1, 2, 3, 4].entries()) {
            const timeLeftBeforePurchases = await foMoXD.getTimeLeft();
            const value = await foMoXD.iWantXPuffs(
              BigInt(puffsQty) * 10n ** 18n
            );
            await foMoXD.connect(player1).buyPuffXAddr(Teams.CHOCO, {
              value: value,
            });
            const timeLeftAfterPurchases = await foMoXD.getTimeLeft();
            expect(
              +timeLeftAfterPurchases -
                +timeLeftBeforePurchases -
                +roundIncTime_ * puffsQty
            ).lte(1);
            let roundData = await snapshot.getRoundSnapshot(1);
            const { winnerId, winnerTeamId, endTime, ended, startTime } =
              roundData;
            expect(ended).to.eql(false);
            expect(+winnerTeamId).to.eql(0);
            expect(+winnerId).to.eql(1);
            expect(endTime).to.gte(startTime);
          }
        });

        it("Should end game when purchase after round end time", async function () {
          const { foMoXD, snapshot, player1, player2 } = await loadFixture(
            deployFoMoFixture
          );
          await foMoXD.activate();
          const value = await foMoXD.iWantXPuffs(BigInt(1) * 10n ** 18n);
          await foMoXD.connect(player1).buyPuffXAddr(Teams.BANA, {
            value: value,
          });
          let roundData = await snapshot.getRoundSnapshot(1);
          let { winnerId, winnerTeamId, endTime, ended, startTime } = roundData;
          expect(ended).to.eql(false);
          expect(+winnerTeamId).to.eql(1);
          expect(+winnerId).to.eql(1);
          expect(endTime).to.gte(startTime);

          await time.increase(10 * 60);

          await foMoXD.connect(player2).buyPuffXAddr(Teams.CHOCO, {
            value: value,
          });
          let { player_: player_2, playerRoundsData_: playerRoundsData_2 } =
            await snapshot.getPlayerSnapshot(1, 2);

          // Should add player2 msg.value to generalVault
          expect(player_2.generalVault).to.equal(value);
          roundData = await snapshot.getRoundSnapshot(1);
          ({ winnerId, winnerTeamId, endTime, ended, startTime } = roundData);

          expect(winnerId).to.equal(1);
          expect(winnerTeamId).to.equal(Teams.BANA);
          expect(ended).to.equal(true);
        });
      });

      describe("Rounds", function () {
        it("Should add up rounds value, eth, puffs...", async function () {
          let lastEth;
          let lastPuffs;
          let lastMask;
          const { foMoXD, snapshot } = await loadFixture(deployFoMoFixture);
          await foMoXD.activate();
          const players = await ethers.getSigners();
          for (const [index, p] of players.entries()) {
            const depositETHAmount = +parseUnits("1000", "gwei") + 1;
            await foMoXD.connect(p).buyPuffXAddr(Teams.CHOCO, {
              value: depositETHAmount,
            });
            let { playerRoundsData_ } = await snapshot.getPlayerSnapshot(
              1,
              index + 1
            );
            lastEth = lastEth
              ? playerRoundsData_.eth.add(lastEth)
              : playerRoundsData_.eth;
            lastPuffs = lastPuffs
              ? playerRoundsData_.puffs.add(lastPuffs)
              : playerRoundsData_.puffs;
            lastMask = lastMask
              ? playerRoundsData_.mask.add(lastMask)
              : playerRoundsData_.mask;
          }
          const roundData = await snapshot.getRoundSnapshot(1);
          expect(roundData.puffs).to.lte(lastPuffs); // 精度差異
          expect(roundData.eth).to.equal(lastEth);
          expect(roundData.mask).to.gte(lastMask);
        });
      });
    });

    // describe("Validations", function () {});

    describe("Events", function () {
      it("Should emit an event on purchase", async function () {
        const { foMoXD, player1, mockedNumOracle } = await loadFixture(
          deployFoMoFixture
        );
        await mockedNumOracle.mock.isAirdrop.returns(false);
        await mockedNumOracle.mock.isAirdropNfts.returns(false);
        await foMoXD.activate();
        await expect(
          foMoXD.connect(player1).buyPuffXAddr(Teams.CHOCO, {
            value: parseUnits("1", "ether"),
          })
        ).to.emit(foMoXD, "onBuyPuff");
      });

      describe("Airdrop", function () {
        it("Should emit an event on ETH airdrop", async function () {
          const { foMoXD, player1, mockedNumOracle } = await loadFixture(
            deployFoMoFixture
          );
          await mockedNumOracle.mock.isAirdrop.returns(true);
          await foMoXD.activate();
          await expect(
            foMoXD.connect(player1).buyPuffXAddr(Teams.CHOCO, {
              value: parseUnits("1", "ether"),
            })
          ).to.emit(foMoXD, "onEthAirdrop");
        });

        it("Should emit an event on NFT airdrop", async function () {
          const { foMoXD, player1, mockedNumOracle, foMoERC721 } =
            await loadFixture(deployFoMoFixture);
          await mockedNumOracle.mock.isAirdropNfts.returns(true);
          await foMoXD.activate();
          await expect(
            foMoXD.connect(player1).buyPuffXAddr(Teams.CHOCO, {
              value: parseUnits("1", "ether"),
            })
          ).to.emit(foMoXD, "onNftAirdrop");
          const nftOwnedByUser = await foMoERC721.balance(player1.address);
          await expect(nftOwnedByUser).to.equal(1);
        });
      });
    });

    // describe("Transfers", function () {
    //   it("Should transfer the funds to the owner", async function () {});
    // });
  });

  describe("Withdraw", function () {
    describe("States", function () {
      it("Should transfer ETH to player and update mask", async function () {
        const { foMoXD, player1, snapshot } = await loadFixture(
          deployFoMoFixture
        );
        await foMoXD.activate();
        /* ------------------------ Puffs ----------------------- */
        const depositETHAmount = parseUnits("1", "ether");
        await foMoXD.connect(player1).buyPuffXAddr(Teams.CHOCO, {
          value: depositETHAmount,
        });
        let {
          player_: player_XWithdraw,
          playerRoundsData_: playerRoundsData__XWithdraw,
        } = await snapshot.getPlayerSnapshot(1, 1);
        await foMoXD.connect(player1).withdraw();
        let { eth, puffs, mask } = playerRoundsData__XWithdraw;
        expect(eth).to.equal(depositETHAmount);
        expect(mask).to.equal(0);
        expect(() => foMoXD.connect(player1).withdraw()).to.changeEtherBalance(
          player1,
          mask
        );
        let {
          player_: player_HasWithdraw,
          playerRoundsData_: playerRoundsData_HasWithdraw,
        } = await snapshot.getPlayerSnapshot(1, 1);
        ({ eth, puffs, mask } = playerRoundsData_HasWithdraw);
        expect(eth).to.equal(depositETHAmount);
        expect(mask).to.gte(0);
        expect(mask).to.lte(depositETHAmount);
      });
    });

    // describe("Validations", function () {});
    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { foMoXD, player1, snapshot } = await loadFixture(
          deployFoMoFixture
        );
        await foMoXD.activate();
        const depositETHAmount = parseUnits("1", "ether");
        await foMoXD.connect(player1).buyPuffXAddr(Teams.CHOCO, {
          value: depositETHAmount,
        });
        await expect(foMoXD.withdraw()).to.emit(foMoXD, "onWithdraw");
      });
    });
    // describe("Transfers", function () {
    //   it("Should transfer the funds to the owner", async function () {});
    // });
  });
});
