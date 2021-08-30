// import { load } from 'babel-register/lib/cache';
import React, { Component } from 'react';
import Web3 from 'web3';
import Color from '../abis/Color.json'
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()


  }

  async loadWeb3() {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Color.networks[networkId]
    if (networkData) {
      const abi = Color.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      // console.log(contract)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
      // load colors
      for (let i = 0; i < totalSupply; i++) {
        const color = await contract.methods.colors(i).call()
        this.setState({
          colors: [... this.state.colors, color]
        })
      }
      console.log(this.state.colors)
    }
    else {
      window.alert('wrong network')
    }
  }

  mint = (color) => {
    console.log(color)
    this.state.contract.methods.mint(color).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({
        colors: [...this.state.colors, color]
      })
    })
  }
  
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      colors: []
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const color = this.color.value
    this.mint(color)
  }

  render() {
      console.log(this.state)
      return (
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
              className="navbar-brand col-sm-3 col-md-2 mr-0"
              href="http://www.dappuniversity.com/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Color
            </a>
             <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
          </nav>
          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  {/* form goes here */}
                  <h1>Mint tokens</h1>
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="text"
                      className='form-control mb-1'
                      placeholder='e.g. #fffff'
                      ref={(input => this.color = input)}
                    />
                    <input type='submit' className='btn btn-black btn-primary'
                      value="Mint"
                    />
                  </form>
                </div>
              </main>
            </div>
            <hr />
            <div className="row text-center">
              {this.state.colors.map((color, key) => {
                return (
                  <div key={key} class="col-md-3 mb-3">
                    <div className="token" style={{backgroundColor: color}} />
                    <div>{color}</div>
                  </div>
                )}
              )}
            </div>
          </div>
        </div>
      );
    }
}

export default App;
