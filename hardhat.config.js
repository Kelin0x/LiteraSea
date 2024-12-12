require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    linea_sepolia: {
      url: "https://linea-sepolia.infura.io/v3/048b968430aa428ea649b5599680185f",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
