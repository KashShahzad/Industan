import React, {Component} from 'react';
import Web3 from 'web3'
import NavBar from './components/NavBar'
import './App.css';

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3(){
    if (window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    //load accounts
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
  }

  constructor(props){
    super(props)
    this.state = {
      account: ''
    }
  }

  render(){
    return (
      <div className="App">
        <NavBar account = {this.state.account}/>
        <div></div>
      </div>
    );
  }
  
}

export default App;
