require('babel-register');
require('babel-polyfill');
require('dotenv').config()
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    // truffle migrate --network kovan
    kovan: {
      provider: function() {
        return new HDWalletProvider(process.env.PRIVATEKEY, process.env.KOVAN_INFURA)
      },
      network_id: '42'
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
