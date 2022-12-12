import { Fragment, useState, useEffect, useContext } from 'react';
import Cube from '../components/ui/Cube/Cube';
import PageHeader from '../components/ui/PageHeader/PageHeader';
import Tabs from '../components/ui/Tabs/Tabs';
import CountdownTimer from '../components/Timer/Timer';
import Sound, { ReactSoundProps } from 'react-sound';
import Swal from 'sweetalert2';
import { useSound } from '../contexts/sound/Sound';
import { useGameData } from '../contexts/gameData/GameData';

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

const GamesPage = (props: any) => {
  const soundContext = useSound();
  const game = useGameData();
  const {
    endTime,
    setEndTime,
    roundData,
    setRoundData,
    setActiveTeamIndex,
    activeTeamIndex,
    buyPuffs,
    wantXPuffs,
    setWantXPuffs,
    puffsToETH,
    setPuffsToETH,
    playerData,
    withdraw,
    roundId
  } = game;
  const teams = JSON.parse(localStorage.getItem('teams') as string);
  const noTeams = <p>Not devices</p>;
  const handleTeamClick = (index: number) => setActiveTeamIndex(index);
  const checkTeamActive = (index: number) => (activeTeamIndex === index ? true : false);
  return (
    <div>
      <div className="App">
        <div className="App-body">
          <div className="App-page-body">
            <Sound
              url="/sounds/Yes and No at the Same Time - half.cool.mp3"
              playStatus={soundContext?.isPlaying ? 'PLAYING' : 'STOPPED'}
              loop={true}
              autoLoad={true}
              volume={30}
              onError={() => {
                Toast.fire({
                  icon: 'error',
                  title: `🔊 Fail to load music.`
                });
              }}
            />
            <CountdownTimer targetDate={endTime} isGameEnd={roundData.ended} />
            <PageHeader
              title={activeTeamIndex ? 'Buy Puffs' : 'CHOOSE YOUR TEAM'}
              isShowBuyButton={activeTeamIndex !== 0}
              activeIndex={activeTeamIndex}
              buyPuffs={buyPuffs}></PageHeader>
            <div className="cube-wrapper">
              {teams.length === 0 && noTeams}
              {teams.length > 0 &&
                teams.map((info: any, index: number) => {
                  return (
                    <Cube
                      info={info}
                      key={info.id}
                      state={checkTeamActive(index + 1)}
                      onClick={() => {
                        checkTeamActive(index + 1)
                          ? new Audio('/sounds/mobile_phone_O.mp3').play()
                          : new Audio('/sounds/mobile_phone_C.mp3').play();
                        handleTeamClick(index + 1);
                      }}></Cube>
                  );
                })}
            </div>
            <Tabs
              roundId={roundId}
              roundData={roundData}
              playerData={playerData}
              wantXPuffs={wantXPuffs}
              withdraw={withdraw}
              setWantXPuffs={setWantXPuffs}
              puffsToETH={puffsToETH}
              setPuffsToETH={setPuffsToETH}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
