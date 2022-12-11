import { useContext, useEffect, useRef, useState, useReducer, createContext, useMemo } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Swal from 'sweetalert2';
import Web3 from 'web3';
import { setupHooks } from './hooks/setupHooks';
import { loadContractWithAddress } from '../../../utils/loadContract';
import { ReactSoundProps } from 'react-sound';

const Web3Context = createContext(null);

interface Web3State {
  web3: any;
  hooks?: any;
  provider: any;
  isLoading: any;
  gameContract?: any;
  factoryContract?: any;
  connect?: any;
  switchNetwork?: any;
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
const createWeb3State = (props: Web3State) => {
  const { web3, provider, isLoading, gameContract } = props;
  return {
    web3,
    provider,
    gameContract,
    isLoading,
    hooks: setupHooks(web3, provider)
  };
};

export default function Web3Provider(props: any) {
  const { children } = props;
  const [web3Api, setWeb3Api] = useState(
    createWeb3State({
      web3: null,
      provider: null,
      factoryContract: null,
      isLoading: true
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const contractAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
      const RPC_URL = 'http://127.0.0.1:8545';
      // const metamaskProvider = window.ethereum;
      const provider =
        ((await detectEthereumProvider()) as any) || new Web3.providers.HttpProvider(RPC_URL);
      const web3 = new Web3(provider);
      const gameContract = await loadContractWithAddress('FoMoXD', contractAddress, web3);
      if (!gameContract || !web3) {
        Swal.fire({
          icon: 'info',
          title: 'Fail to connect to FoMoXD',
          showCancelButton: true,
          confirmButtonText: 'Reload',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url("")',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/nyan-cat.gif")
            left top
            no-repeat
          `
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success');
            window.location.reload();
          } else if (result.isDenied) {
            Swal.fire('Fail to connect to FoMoXD', '', 'info');
          }
        });
      }
      // await hre.ethers.getContractAt("FoMoXD", "0x742489F22807ebB4C36ca6cD95c3e1C044B7B6c8");
      // gameContract.filters.Transfer(account, null);
      // const fromMe = gameContract.filters.Transfer(account, null);
      // provider.on(fromMe, (from: string, to: string, amount: any, event: any) => {
      //   console.log('Transfer|sent', { from, to, amount, event });
      //   // queryTokenBalance(window)
      // });

      // const toMe = gameContract.filters.Transfer(null, account);
      // provider.on(toMe, (from: string, to: string, amount: any, event: any) => {
      //   console.log('Transfer|received', { from, to, amount, event });
      //   // queryTokenBalance(window)
      // });

      const [account] = await web3.eth.getAccounts();
      if (provider) {
        setWeb3Api(
          createWeb3State({
            web3,
            gameContract,
            provider,
            isLoading: false
          })
        );
        Toast.fire({
          icon: 'success',
          title: 'Connected to Metamask.'
        });
      } else if (!account) {
        setWeb3Api((api) => ({
          ...api,
          isLoading: false
        }));
        Toast.fire({
          icon: 'error',
          title: 'Please, install Metamask.'
        });
      } else {
        setWeb3Api((api) => ({
          ...api,
          isLoading: false
        }));
        Toast.fire({
          icon: 'error',
          title: 'Please, install Metamask.'
        });
      }
    };
    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api;
    return {
      ...web3Api,
      isWeb3Loaded: web3 != null,
      requireInstall: !isLoading && !web3,
      connect: provider
        ? async () => {
            try {
              await provider.request({ method: 'eth_requestAccounts' });
            } catch (error) {
              Toast.fire({
                icon: 'error',
                title: 'Can not connect to metamask, try to reload your browser please.'
              });
              // window.location.reload();
            }
          }
        : () => {
            Toast.fire({
              icon: 'error',
              title: 'Can not connect to metamask, try to reload your browser please.'
            });
          },
      switchNetwork: provider
        ? async (chainId: string = '31337') => {
            try {
              await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x' + (31337).toString(16) }]
              });
            } catch (error) {
              Toast.fire({
                icon: 'error',
                title: 'Fail to switch network!'
              });
            }
          }
        : () => {
            Toast.fire({
              icon: 'error',
              title: 'Fail to switch network!'
            });
          }
    };
  }, [web3Api]);

  return (
    // @ts-ignore
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3(): Web3State {
  // @ts-ignore
  return useContext(Web3Context);
}

export function useHooks(cb: any) {
  const { hooks } = useWeb3() as unknown as Web3State;
  return cb(hooks);
}
