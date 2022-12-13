import { useState } from 'react';
import CubeNft from '../../ui/CubeNft/CubeNft';
import PageHeader from '../../ui/PageHeader/PageHeader';
import { MainNft } from '../../ui/CubeNft/style';

const CubeLayout = (props: any) => {
  const noDevices = <p>Not devices</p>;
  const nfts = props?.items?.length ? [...props?.items] : [];
  if (nfts?.length < 6) {
    const diff = 6 - nfts.length;
    const defaultData = new Array(diff).fill({
      name: '',
      description: '',
      url: '',
      image: ''
    });
    nfts.push(...defaultData);
  }
  return (
    <div className="App">
      <div className="App-body">
        <div className="App-page-body">
          <PageHeader title={props.title}></PageHeader>
          <MainNft url={nfts[0]?.url}>
            <img></img>
            <div>
              <h6>{props.items?.length ? nfts[0]?.name : 'Buy puffs to get NFTs'}</h6>
              <p>{props.items?.length ? nfts[0]?.description : 'Buy puffs to get NFTs'}</p>
            </div>
          </MainNft>
          <div className="cube-wrapper">
            {nfts?.length === 0 && noDevices}
            {nfts?.length > 0 &&
              nfts?.map((info: any, index: number) => {
                if (index === 0) return;
                return <CubeNft info={info} key={index}></CubeNft>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeLayout;
