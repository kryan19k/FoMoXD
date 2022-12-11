import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import NewItemFrom from '../NewItemFrom/NewItemFrom';
import { NavSideBarDiv } from './style';
import { MetaMaskInpageProvider } from '@metamask/providers';
import Swal from 'sweetalert2';
import { useSound } from '../../../contexts/sound/Sound';

// Hooks
import { useWeb3 } from '../../../contexts/providers';
import { useGameData } from '../../../contexts/gameData/GameData';
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
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
const NavSideBar = (props: any) => {
  const { connect, switchNetwork, hooks, gameContract } = useWeb3();
  const { account } = hooks.useAccount();
  const { roundData, roundId, endTime, setRoundId, fetchNewRound } = useGameData();
  const soundContext = useSound();
  console.log(
    'new Date(endTime * 1000).toLocaleTimeString()',
    endTime,
    new Date(endTime).toLocaleTimeString()
  );

  let [isShow, setIsShow] = useState(false);
  const toggleIsShow = () => {
    setIsShow(!isShow);
  };
  const onSubmit = (enterDeviceData: any) => {
    props.onSubmit(enterDeviceData);
  };

  const onClickSoundHandler = (e: React.MouseEvent) => {
    soundContext.setIsPlaying(!soundContext.isPlaying);
    Toast.fire({
      icon: 'success',
      title: `${!soundContext.isPlaying ? '🎉 Party Time' : '🤫 Shh...'}`
    });
  };

  const onClickPickRoundHandler = async (e: React.MouseEvent) => {
    const newRoundId = await gameContract?.methods?.roundID_().call();
    let index = newRoundId as number;
    const inputOptions: any = {};
    while (index > 0) {
      inputOptions[index.toString()] = index;
      index--;
    }
    const { value: roundSelected } = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: inputOptions,
      inputPlaceholder: 'Select a round',
      showCancelButton: true,
      inputValue: roundId
      // inputValidator: (value) => {
      //   return new Promise((resolve) => {
      //     if (value === 'oranges') {
      //       resolve();
      //     } else {
      //       resolve('You need to select oranges :)');
      //     }
      //   });
      // }
    });

    if (roundSelected) {
      Toast.fire({
        icon: 'success',
        title: `🎯 You are now at: ${roundSelected}`
      });
      setRoundId(roundSelected);
      fetchNewRound(roundSelected);
    }
  };

  const onClickMetaMaskHandler = (e: React.MouseEvent) => {
    new Audio('/sounds/car_trunk_O.mp3').play();
    connect();
    switchNetwork();
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
    Toast.fire({
      icon: 'success',
      title: '🦊 Connected in successfully'
    });
  };
  return (
    <Fragment>
      <NavSideBarDiv>
        <div className="nav-side-title-wrapper">
          <Link
            className="nav-side-title-icon"
            style={{ textDecoration: 'none' }}
            to="/"
            onClick={(e: React.MouseEvent) => {
              new Audio('/sounds/car_trunk_O.mp3').play();
            }}>
            <span>🧁 </span>
            <span> FomoXD </span>
          </Link>
          <div className="message">
            <span>
              {account
                ? `ROUND ${roundId} END AT: ${new Date(endTime).toLocaleTimeString()}`
                : 'You are not connected...'}
            </span>
          </div>
          <div className="nav-bar">
            <Link
              style={{ textDecoration: 'none' }}
              className="nav-bar-icon"
              to="/nfts"
              onClick={(e: React.MouseEvent) => {
                new Audio('/sounds/car_trunk_O.mp3').play();
                Toast.fire({
                  icon: 'success',
                  title: `🖼️ Here is your NFTs`
                });
              }}>
              <h5>🖼️</h5>
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              className="nav-bar-icon"
              to="/exitScam"
              onClick={async (e: React.MouseEvent) => {
                new Audio('/sounds/car_trunk_O.mp3').play();
                const newRoundId = await gameContract?.methods?.roundID_().call();
                setRoundId(newRoundId);
                fetchNewRound(newRoundId);
                Toast.fire({
                  icon: 'success',
                  title: `🎰 You are now at lastest round`
                });
              }}>
              <h5>🎰</h5>
            </Link>
            {!account ? (
              <Link
                style={{ textDecoration: 'none' }}
                className="nav-bar-icon"
                to="/exitScam"
                onClick={onClickMetaMaskHandler}>
                <h5>🦊</h5>
              </Link>
            ) : (
              <Link
                style={{ textDecoration: 'none' }}
                className="nav-bar-icon"
                to="/exitScam"
                onClick={onClickPickRoundHandler}>
                <h5>🎯</h5>
              </Link>
            )}
            <div
              style={{ textDecoration: 'none' }}
              className="nav-bar-icon"
              onClick={onClickSoundHandler}>
              <h5>{soundContext.isPlaying ? '🔊' : '🔇'}</h5>
            </div>
          </div>
        </div>
      </NavSideBarDiv>
      <NewItemFrom onClick={toggleIsShow} isShow={isShow} onSubmit={onSubmit}></NewItemFrom>
    </Fragment>
  );
};
export default NavSideBar;
