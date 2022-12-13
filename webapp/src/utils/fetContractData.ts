import Swal from 'sweetalert2';
import Web3Lib from 'web3';
export const TeamsArr = ['🍫 ', '🍌 ', '🍓 ', '🥝 '];

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export default class GameHelper {
  fomoXdContract: any;
  foMoERC721: any;
  web3: any;
  account: any;
  setPlayerData: any;
  setEndTime: any;
  setRoundData: any;
  roundId: number;
  playerId: number = 0;

  constructor(opt: {
    fomoXdContract: any;
    foMoERC721: any;
    web3: any;
    account: any;
    setPlayerData: any;
    setEndTime: any;
    setRoundData: any;
    roundId: number;
  }) {
    const {
      fomoXdContract,
      foMoERC721,
      web3,
      account,
      setPlayerData,
      setEndTime,
      setRoundData,
      roundId
    } = opt;
    this.fomoXdContract = fomoXdContract;
    this.web3 = web3;
    this.account = account;
    this.setPlayerData = setPlayerData;
    this.setEndTime = setEndTime;
    this.setRoundData = setRoundData;
    this.foMoERC721 = foMoERC721;
    this.roundId = roundId;
  }
  async buyPuffs(opt: { activeTeamIndex: number; puffsToETH: number; wantXPuffs: any }) {
    const { wantXPuffs, activeTeamIndex, puffsToETH } = opt;
    new Audio('/sounds/coin.wav').play();
    if (wantXPuffs <= 0 || puffsToETH <= 0) {
      Toast.fire({
        icon: 'error',
        title: `🧁 Please add up puffs.`
      });
    } else if (!activeTeamIndex) {
      Toast.fire({
        icon: 'error',
        title: `🎯 Please select teams.`
      });
    } else {
      // pay ${Number(puffsToETH).toFixed(6)}
      Swal.fire({
        title: `Sure to to buy for ${wantXPuffs} puffs in ${
          TeamsArr[activeTeamIndex - 1 > 0 ? activeTeamIndex - 1 : 0]
        }team?`,
        showCancelButton: true,
        confirmButtonText: 'Give me puffs',
        cancelButtonText: 'Exit Scam',
        padding: '3em',
        color: '#716add',
        text: 'Make Sure You See This Cute Pic.',
        imageUrl: 'https://media.giphy.com/media/Ga1uKRbTv1lABGqBtv/giphy.gif',
        imageWidth: 350,
        imageAlt: 'Custom image',
        backdrop: `
            rgba(0,0,123,0.4)
            url("/nyan-cat.gif")
            left top
            no-repeat
          `
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.buyPuffXAddr({
            activeTeamIndex,
            puffsToETH
          });
        } else {
          Swal.fire({
            title: 'Puffsssss~~~',
            padding: '5em',
            color: '#716add',
            background: '#fff url(https://media.giphy.com/media/UmLKVhZSLBQmk/giphy.gif)',
            showConfirmButton: false,
            timer: 2500,
            backdrop: `
            rgba(0,0,123,0.4)
            url("/nyan-cat.gif")
            left top
            no-repeat
          `
          });
        }
      });
    }
  }

  async buyPuffXAddr(opt: { activeTeamIndex: number; puffsToETH: number }) {
    const { activeTeamIndex, puffsToETH } = opt;
    await this.fomoXdContract.methods
      ?.buyPuffXAddr(activeTeamIndex - 1)
      .send({ from: this.account, value: this.web3.utils.toWei(puffsToETH, 'ether') })
      .then((receipt: any) => {
        if (receipt?.events?.onNftAirdrop) {
          Swal.fire({
            title: `You Got an NFT Air Drop!`,
            showCancelButton: true,
            confirmButtonText: 'Go',
            cancelButtonText: 'No thx.',
            padding: '3em',
            color: '#716add',
            text: 'You Got an NFT',
            imageUrl: 'https://media.giphy.com/media/oHB0VofpRubjW/giphy.gif',
            imageWidth: 350,
            imageAlt: 'Custom image',
            backdrop: `
            rgba(0,0,123,0.4)
            url("/nyan-cat.gif")
            left top
            no-repeat
          `
          }).then(async (result) => {
            if (result.isConfirmed) {
              window.location.pathname = '/nfts';
            }
          });
        }
        if (receipt?.events?.onEthAirdrop) {
          Swal.fire({
            title: 'Moon~~~',
            padding: '5em',
            color: '#716add',
            background:
              '#fff url(https://media.giphy.com/media/3o6Zt6JnZK8AU2qi9W/giphy-downsized-large.gif)',
            showConfirmButton: false,
            timer: 2500,
            backdrop: ` rgba(0,0,123,0.4) url("/nyan-cat.gif") left top no-repeat`
          });
        }
      })
      .catch((e: any) => {
        console.error(e);
        Toast.fire({
          icon: 'error',
          title: `🧁 Fail to Buy Puffs.`
        });
      });
  }

  async withdraw() {
    await this.fomoXdContract.methods
      ?.withdraw()
      .send({ from: this.account })
      .then(function (receipt: any) {
        Toast.fire({
          icon: 'success',
          title: `💰 Success to withdraw ${Web3Lib.utils.fromWei(
            receipt?.events?.onWithdraw?.returnValues?.ethOut,
            'ether'
          )} ETH.`
        });
      })
      .catch((e: any) => {
        console.error(e);
        Toast.fire({
          icon: 'error',
          title: `🤡 Fail to withdraw.`
        });
      });
  }

  async fetchPlayerRoundData(_roundId: number) {
    this.playerId = await this.fomoXdContract?.methods?.playerIDxAddr_(this.account).call();
    const newPlayerData = await this.fomoXdContract?.methods?.player_(this.playerId).call();
    const newPlayerRoundData = await this.fomoXdContract?.methods
      ?.playerRoundsData_(this.playerId, _roundId)
      .call();

    this.fomoXdContract
      .getPastEvents('onNftAirdrop', {
        filter: { playerAddr: this.account },
        fromBlock: 0,
        toBlock: 'latest'
      })
      .then(async (events: any) => {
        const lastNfts = [];
        for (const e of events) {
          const nowRoundId = e?.returnValues?.roundId;
          lastNfts.push(
            ...e?.returnValues?.tokenIds.map((e: number) => {
              return { tokenId: e, roundId: nowRoundId };
            })
          );
          this.setPlayerData({ ...newPlayerRoundData, ...newPlayerData, nfts: lastNfts });
        }
      });
    return this.playerId;
  }

  async fetchNewRound(_roundId: number) {
    const r = await this.fomoXdContract?.methods?.roundData_(_roundId).call();
    const playerId = await this.fetchPlayerRoundData(_roundId);
    console.log(
      'fetchNewRound~',
      _roundId,
      r,
      this.account,
      new Date(r.endTime * 1000).toLocaleTimeString(),
      r.winnerId,
      playerId === r.winnerId
    );
    this.setRoundData({ ...r, isWinner: playerId === r.winnerId });
    this.setEndTime(r.endTime * 1000);
  }

  async initEventListener() {
    this.fomoXdContract.events
      .allEvents({
        // filter: {
        //   from: [
        //     // 🥵 it doesn't work...
        //     '0x00000000AE347930bD1E7B0F35588b92280f9e75',
        //     '0x8EB871bbB6F754a04bCa23881A7D25A30aAD3f23',
        //     '0xc2A856c3afF2110c1171B8f942256d40E980C726'
        //   ]
        // }
      })
      .on('data', async (event: any) => {
        console.log('✅ New Events!', this.roundId, event);
        await this.fetchNewRound(this.roundId);
      });

    this.fomoXdContract.events
      .NewEndTime()
      .on('data', (event: any) => {
        Toast.fire({
          icon: 'success',
          title: `⏳ New End Time.`
        });
        this.setEndTime(+event?.returnValues?.timeStamp * 1000);
      })
      .on('error', function (error: any, receipt: any) {
        Toast.fire({
          icon: 'error',
          title: `⏳ New End Time.`
        });
      });

    this.fomoXdContract.events.onWithdraw().on('data', (event: any) => {
      if (event?.returnValues?.playerAddress !== this.account) {
        Toast.fire({
          icon: 'success',
          title: `🤑 PlayerId: ${
            event?.returnValues?.playerID
          } just siphoned ${Web3Lib.utils.fromWei(
            event?.returnValues?.ethOut,
            'ether'
          )} ETH from FoMo.`
        });
      }

      // this.foMoERC721.events
      //   .allEvents(
      //     {
      //       filter: { to: this.account },
      //       fromBlock: 0,
      //       toBlock: 'latest'
      //     },
      //     function (error: Error, events: any) {
      //       console.log('events~~~~', events);
      //     }
      //   )
      //   .then(function (events: any) {
      //     console.log('getPastEvents Err!', events);
      //   });
    });

    this.fomoXdContract.events.onEndRound().on('data', (event: any) => {
      const { roundId, winnerId, winnerTeamId, endTime, generalShare, winnerShare } =
        event?.returnValues;
      if (winnerId == this.playerId) {
        Swal.fire({
          title: `You won the game!`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'No thx.',
          padding: '3em',
          color: '#716add',
          text: `You eon ${Web3Lib.utils.fromWei(winnerShare, 'ether')}`,
          imageUrl: 'https://media.giphy.com/media/r95kAgBEzeapljl1ft/giphy.gif',
          imageWidth: 350,
          imageAlt: 'Custom image',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/nyan-cat.gif")
            left top
            no-repeat
          `
        }).then(async (result) => {
          if (result.isConfirmed) {
            window.location.pathname = '/nfts';
          }
        });
      } else {
        Swal.fire({
          title: `Game Over!`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'No thx.',
          padding: '3em',
          color: '#716add',
          text: `Winner won ${Web3Lib.utils.fromWei(winnerShare, 'ether')}`,
          imageUrl: 'https://media.giphy.com/media/r95kAgBEzeapljl1ft/giphy.gif',
          imageWidth: 350,
          imageAlt: 'Custom image',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/nyan-cat.gif")
            left top
            no-repeat
          `
        }).then(async (result) => {
          if (result.isConfirmed) {
            window.location.pathname = '/';
          }
        });
      }
    });
  }
}
