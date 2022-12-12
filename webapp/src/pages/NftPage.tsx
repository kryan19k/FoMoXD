import { Fragment, useContext, useState, useEffect } from 'react';
import CubeLayout from '../components/layout/CubeLayout/CubeLayout';
import Sound, { ReactSoundProps } from 'react-sound';
import { useSound } from '../contexts/sound/Sound';
import { useGameData } from '../contexts/gameData/GameData';
import { useWeb3 } from '../contexts/providers';
import { loadContractWithAddress } from '../utils/loadContract';
import config from '../config';
const { FOMO_CONTRACT_ADDRESS, RPC_URL, FOMOERC721_CONTRACT_ADDRESS } = config;

const NftsPage = () => {
  const soundContext = useSound();
  const { web3, gameContract, foMoERC721 } = useWeb3();
  const game = useGameData();
  const { playerData, roundId } = game;

  console.log('foMoERC721🤫🤫🤡🤡🤡🤫🤫', foMoERC721, playerData, roundId);

  useEffect(() => {
    const timer = setInterval(async () => {
      const jsonNfts = [];
      console.log('🥳🥳🥳🥳🥳playerData~', playerData.nfts);
      if (playerData?.nfts?.length > 0) {
        for (const { tokenId, roundId } of playerData?.nfts) {
          const meta = await foMoERC721.methods.getRoundTokenURI(roundId, tokenId).call();
          console.log('🧁meta~~', meta);
          const fetchData = await fetch(meta, {
            method: 'GET'
          });
          console.log('fetchData ~~', fetchData);
          const res = (await fetchData?.json()) as { image: string };
          console.log('🤡🤡', res);
          // nfts.push({ ...res, url: 'https://ipfs.io/ipfs/' + res.image.split('ipfs://')[1] });
          jsonNfts.push({
            ...res,
            url: 'https://gateway.pinata.cloud/ipfs/' + res.image.split('ipfs://')[1]
          });
          console.log('💰💰💰💰~~~~~~~~~', jsonNfts);
        }
      }
    }, 2000);
  }, [playerData.nfts]);

  // const foMoERC721 = await loadContractWithAddress('FoMoERC721', foMoERC721Address, web3);
  // console.log('game~', game);

  console.log('🥳playerData~', playerData.nfts);
  let nfts = localStorage.getItem('nfts') as string;
  if (playerData?.nfts) {
  }

  return (
    <Fragment>
      <Sound
        url="/sounds/Jigglypuff.mp3"
        playStatus={soundContext?.isPlaying ? 'PLAYING' : 'STOPPED'}
        loop={true}
        autoLoad={true}
        volume={30}
      />
      ;
      <CubeLayout
        items={playerData?.nfts?.length > 0 ? playerData.nfts : JSON.parse(nfts)}
        title={'PUFFS NFTS'}></CubeLayout>
      ;
    </Fragment>
  );
};
export default NftsPage;
