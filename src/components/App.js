import React, {Component} from 'react'
import Navbar from './Navbar'
import Web3 from 'web3'

class App extends Component{

    //load the web3 library and blockchain data
    async UNSAFE_componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    //Bringing in the metamask wallet
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3){
           window.web3 = new Web3(window.web3.currentProvider)
        }  else {
            window.alert('Can not find wallet')
        }
    }

    //read the wallet from metamask
    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
    }

    //Constructor
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
        }
    }

    //Our React Codes Goes In Here
    render(){
        return (
           <div>
               <Navbar account={this.state.account}/>
           </div>
        )
    }
}

export default App;