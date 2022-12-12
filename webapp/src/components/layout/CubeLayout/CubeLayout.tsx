import { useState } from 'react';
import CubeNft from '../../ui/CubeNft/CubeNft';
import PageHeader from '../../ui/PageHeader/PageHeader';
import { MainNft } from '../../ui/CubeNft/style';
import config from '../../../config';
const { NFT_BASE_URL } = config;

const CubeLayout = (props: any) => {
  const noDevices = <p>Not devices</p>;
  const [devices, setDevices] = useState(props.items);
  return (
    <div className="App">
      <div className="App-body">
        <div className="App-page-body">
          <PageHeader title={props.title}></PageHeader>
          <MainNft url={devices[0].url}>
            {/* <MainNft url={`${NFT_BASE_URL}/${devices[0].id}.png`}> */}
            <img></img>
            <div>
              <h6>{devices[0].name ? devices[0].name : '#17 MYSTREY PUFF'}</h6>
              <p>Last sale: 5 ETH</p>
            </div>
          </MainNft>
          <div className="cube-wrapper">
            {devices.length === 0 && noDevices}
            {devices.length > 0 &&
              devices.map((info: any, index: number) => {
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
