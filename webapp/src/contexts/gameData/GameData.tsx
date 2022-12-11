import { useContext, useEffect, useRef, useState, useReducer, createContext, useMemo } from 'react';
import { useWeb3 } from '../providers';
import Swal from 'sweetalert2';
import GameHelper from '../../utils/fetContractData';
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

interface PlayerData {
  eth: number;
  puffs: number;
  mask: number;
  winningVault: number;
  generalVault: number;
  affiliateVault: number;
}

interface RoundData {
  winnerId?: number;
  winnerTeamId?: number;
  /* ------------------------ Time ------------------------ */
  startTime?: number;
  endTime?: number;
  ended?: boolean;
  /* ------------------------- $$$ ------------------------ */
  puffs?: number;
  eth?: number;
  pot?: number;
  mask?: number;
}

export const GameContext = createContext({
  roundId: 0,
  roundData: { puffs: 0, pot: 0, mask: 0, ended: false },
  endTime: 0,
  setEndTime: () => {},
  setRoundData: () => {},
  setActiveTeamIndex: (num: number) => {},
  activeTeamIndex: null,
  buyPuffs: () => {},
  wantXPuffs: null,
  setWantXPuffs: () => {},
  puffsToETH: 0,
  setPuffsToETH: () => {},
  setRoundId: (num: number) => {},
  fetchNewRound: (num: number) => {},
  playerData: {},
  withdraw: () => {}
});

export default function GameProvider(props: any) {
  const { gameContract, web3, account } = useWeb3();
  const [roundId, setRoundId] = useState(0);
  const [wantXPuffs, setWantXPuffs] = useState(0);
  const [puffsToETH, setPuffsToETH] = useState(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [roundData, setRoundData] = useState<RoundData>({
    winnerId: 0,
    winnerTeamId: 0,
    ended: false,
    puffs: 0,
    eth: 0,
    pot: 0,
    mask: 0
  });
  const [playerData, setPlayerData] = useState<PlayerData>({
    eth: 0,
    puffs: 0,
    mask: 0,
    winningVault: 0,
    generalVault: 0,
    affiliateVault: 0
  });
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const helper = new GameHelper({
    gameContract,
    web3,
    account,
    setPlayerData,
    setEndTime,
    setRoundData,
    roundId
  });

  useEffect(() => {
    const timer = setInterval(async () => {
      if (!endTime) {
        console.log('🤫', endTime, account);
        const newRoundId = await gameContract?.methods?.roundID_().call();
        setRoundId(newRoundId);

        await helper.fetchNewRound(newRoundId);
        await helper.initEventListener();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [web3, gameContract, endTime]);

  const value = {
    endTime,
    setEndTime,
    roundData,
    setRoundData,
    setActiveTeamIndex,
    activeTeamIndex,
    buyPuffs: (a: any) => {
      helper.buyPuffs({
        puffsToETH,
        activeTeamIndex,
        wantXPuffs,
        ...a
      });
    },
    withdraw: () => {
      helper.withdraw();
    },
    wantXPuffs,
    setWantXPuffs,
    puffsToETH,
    setPuffsToETH,
    roundId,
    setRoundId,
    fetchNewRound: (rId: number) => {
      helper.fetchNewRound(rId);
    },
    playerData
  };
  // @ts-ignore
  return <GameContext.Provider value={value}>{props.children}</GameContext.Provider>;
}

export function useGameData() {
  return useContext(GameContext);
}

// gameContract.filters.Transfer(account, null);
// const fromMe = gameContract.filters.Transfer(account, null);
// provider.on(fromMe, (from: string, to: string, amount: any, event: any) => {
//   console.log('Transfer|sent', { from, to, amount, event });
//   // queryTokenBalance(window)
// });
