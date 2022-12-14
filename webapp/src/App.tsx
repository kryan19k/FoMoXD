import React, { useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import './App.css';
import GamesPage from './pages/GamesPage';
import NftsPage from './pages/NftPage';
import Layout from './components/layout/Layout';
import { Web3Provider } from './contexts/providers';
import SoundProvider from './contexts/sound/Sound';

import { teams, nfts } from './test/dummyData';
import GameProvider from './contexts/gameData/GameData';
(window as any).global = window;

// window.Buffer = window.Buffer || require('buffer').Buffer;
window.process = window.process || require('process');

// if (!localStorage.getItem("nfts")) {
localStorage.setItem('nfts', JSON.stringify(nfts));
// }
//if (!localStorage.getItem("teams")) {
localStorage.setItem('teams', JSON.stringify(teams));
//}

function addItem(type: string, device: any) {
  const items = localStorage.getItem(type);
  if (items) {
    localStorage.setItem(type, JSON.stringify([...JSON.parse(items), device]));
  } else {
    localStorage.setItem(type, JSON.stringify([device]));
  }
}

const App: React.FC = () => {
  const onSubmit = (device: any) => {
    if (window.location.pathname === '/exit-scam') {
      addItem('teams', { id: Math.random(), onOff: true, ...device });
    }
    if (window.location.pathname === '/nfts') {
      addItem('nfts', { id: Math.random(), onOff: true, ...device });
    }

    // setDevices((prevDevices: any) => {
    //   return [...prevDevices,]
    // })
  };
  return (
    <SoundProvider>
      <Web3Provider>
        <GameProvider>
          <Layout onSubmit={onSubmit}>
            <Switch>
              <Route path="/exit-scam" exact component={GamesPage}></Route>
              <Route path="/bad-advice/id/:id" component={GamesPage}></Route>
              <Route path="/bad-advice/address/:address" component={GamesPage}></Route>
              <Route path="/bad-advice/name/:name" component={GamesPage}></Route>
              <Route path="/nfts" component={NftsPage}></Route>
              <Route path="/" component={GamesPage}></Route>
            </Switch>
          </Layout>
        </GameProvider>
      </Web3Provider>
    </SoundProvider>
  );
};

export default App;
