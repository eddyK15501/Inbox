const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const mnemonic = "west veteran soup warm edge faith win play dumb logic term orange";
const url = "https://rinkeby.infura.io/v3/1072fceafc0d4c7eb0f2f84a61292237";
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(mnemonic, url);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["You've got mail!"] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
