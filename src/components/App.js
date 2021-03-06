import React, {Component} from 'react'
import Navbar from './Navbar'
import Web3 from 'web3'
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralizedBank from '../truffle_abis/DecentralizedBank.json'
import Main from './Main'
import ParticleSettings from './ParticleSettings'

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

    async loadBlockchainData() {
        const web3 = window.web3
        //read the wallet from metamask
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        const networkId = await web3.eth.net.getId()
        
        //Load Tether contract
        const tetherData = Tether.networks[networkId]
        if (tetherData){
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({tether: tether})
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString() })
            //console.log(this.state.tetherBalance)
            
        } else {
            window.alert('Error! Tether contract is not deployed | No Network Detected')
        }

        //Load RWD Contract
        const rwdData = RWD.networks[networkId]
        if (rwdData){
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd: rwd})
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString() })
            //console.log(this.state.rwdBalance)
            
        } else {
            window.alert('Error! RWD contract is not deployed | No Network Detected')
        }

        //Load DecentralizedBank
        const dcbData = DecentralizedBank.networks[networkId]
        if (dcbData){
            const dcb = new web3.eth.Contract(DecentralizedBank.abi, dcbData.address)
            this.setState({decentralizedBank: dcb})
            let stakingBalance = await dcb.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance.toString() })
            //console.log(this.state.stakingBalance)
            
        } else {
            window.alert('Error! DecentralizedBank contract is not deployed | No Network Detected')
        }
        this.setState({loading: false})
    }

    stakeTokens = amount => {
        this.setState({loading: true })
         this.state.tether.methods.approve(this.state.decentralizedBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
          this.state.decentralizedBank.methods.depositTokens(amount).send({from: this.state.account}).on('transactionHash',  hash => {
             this.setState({loading:false})            
          })
        })
      }

    //unstake function
    unstakeTokens = () => {
        this.setState({loading: true})
         this.state.decentralizedBank.methods.withdrawTokens().send({from: this.state.account}).on('transactionHash', hash => {
             this.setState({loading: false})
        })
    }

    //Constructor
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            tether: {},
            rwd: {},
            decentralizedBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true
        }
    }


    //Our React Codes Goes In Here
    render(){
        let content
        if (this.state.loading){
            content = <p id='loader' className='text-center' style={{margin: '30px', color: '#000066'}}>Loading Please</p>
        }else {
            content = <Main tetherBalance={this.state.tetherBalance}
                            rwdBalance={this.state.rwdBalance} 
                            stakingBalance={this.state.stakingBalance} 
                            stakeTokens={this.stakeTokens} 
                            unstakeTokens={this.unstakeTokens}
                            />
        }

        return (
            <div className='App' style={{position: 'relative'}}>
                <div style={{position: 'absolute'}}>
                        <ParticleSettings />
                </div>
                <Navbar account={this.state.account}/>
                <div className='container-fluid mt-5'>
                    <div className='row'>
                        <main role='main' className='col-lg-12 ml-auto mr-auto'
                                style={{maxWidth:'600px', minHeight: '100vm'}}>
                                <div>
                                {content}
                                </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;