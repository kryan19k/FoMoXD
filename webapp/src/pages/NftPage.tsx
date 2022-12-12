import { Fragment, useContext, useState } from 'react';
import CubeLayout from '../components/layout/CubeLayout/CubeLayout';
import Sound, { ReactSoundProps } from 'react-sound';
import { useWeb3 } from '../contexts/providers';
import { useSound } from '../contexts/sound/Sound';
import { useGameData } from '../contexts/gameData/GameData';

const NftsPage = () => {
  const soundContext = useSound();
  const game = useGameData();
  const { playerData } = game;
  console.log('game~', game);
  console.log('playerData~', playerData.nfts);
  const nfts = localStorage.getItem('nfts');

  return (
    <Fragment>
      <Sound
        url="/sounds/Jigglypuff.mp3"
        playStatus={soundContext?.isPlaying ? 'PLAYING' : 'STOPPED'}
        loop={true}
        autoLoad={true}
        volume={30}
      />
      ;<CubeLayout items={nfts ? JSON.parse(nfts) : []} title={'PUFFS NFTS'}></CubeLayout>;
    </Fragment>
  );
};
export default NftsPage;
