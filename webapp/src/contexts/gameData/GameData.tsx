import { useContext, useEffect, useState, createContext } from 'react';
import { useWeb3 } from '../providers';
import GameHelper from '../../utils/fetContractData';

interface PlayerData {
  eth: number;
  puffs: number;
  mask: number;
  winningVault: number;
  generalVault: number;
  affiliateVault: number;
  ntfs: [];
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
  playerData: { nfts: [] },
  withdraw: () => {},
  foMoERC721: {}
});

export default function GameProvider(props: any) {
  const { gameContract, web3, account, foMoERC721 } = useWeb3();
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
    affiliateVault: 0,
    ntfs: []
  });
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const helper = new GameHelper({
    gameContract,
    web3,
    account,
    setPlayerData,
    setEndTime,
    setRoundData,
    roundId,
    foMoERC721
  });

  useEffect(() => {
    const timer = setInterval(async () => {
      if (!endTime && gameContract) {
        // console.log('Game Data useEffect🤫', endTime, account, gameContract, foMoERC721);
        const newRoundId = await gameContract?.methods?.roundID_().call();
        setRoundId(newRoundId);
        await helper.fetchNewRound(newRoundId);
        await helper.initEventListener();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [web3, gameContract, endTime, foMoERC721]);

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
    playerData,
    foMoERC721
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
