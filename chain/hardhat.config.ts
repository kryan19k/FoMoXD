import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY, API_KEY } = process.env;
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  networks: {
    // goerli: {
    //   allowUnlimitedContractSize: true,
    //   url: API_URL,
    //   accounts: [PRIVATE_KEY as string],
    // },
    hardhat: {
      allowUnlimitedContractSize: true,
      // forking: {
      //   url: `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`,
      //   enabled: true,
      // },
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 100000000,
  },
};

export default config;
