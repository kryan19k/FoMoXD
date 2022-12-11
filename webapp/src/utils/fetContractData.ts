import Swal from 'sweetalert2';
export const loadRoundData = async () => {};
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
  gameContract: any;
  web3: any;
  account: any;
  constructor(gameContract: any, web3: any, account: any) {
    this.gameContract = gameContract;
    this.web3 = web3;
    this.account = account;
  }
  async buyPuffs(opt: { activeTeamIndex: number; puffsToETH: number; wantXPuffs: any }) {
    const { wantXPuffs, activeTeamIndex, puffsToETH } = opt;
    console.log('activeTeamIndex', activeTeamIndex);

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
    await this.gameContract.methods
      ?.buyPuffXAddr(activeTeamIndex - 1)
      .send({ from: this.account, value: this.web3.utils.toWei(puffsToETH, 'ether') })
      .then((receipt: any) => {
        console.log('events-->', receipt?.events);
        console.log('events.returnValues-->', receipt?.events[0]?.returnValues);
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
      })
      .catch((e: any) => {
        console.log('buy e????', e);
        Toast.fire({
          icon: 'error',
          title: `Fail to withdraw.`
        });
      });
  }

  async withdraw() {
    await this.gameContract.methods
      ?.withdraw()
      .send({ from: this.account })
      .then(function (receipt: any) {
        Toast.fire({
          icon: 'success',
          title: `💰 Withdraw.`
        });
        console.log('withdraw newContractInstance???', receipt); // instance with the new contract address
        console.log('withdraw events-->', receipt?.events);
        console.log('withdraw events.returnValues-->', receipt?.events[0]?.returnValues);
      })
      .catch((e: any) => {
        console.log('withdraw e????', e);
        Toast.fire({
          icon: 'error',
          title: `Fail to withdraw.`
        });
      });
  }
}
