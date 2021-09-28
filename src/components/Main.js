import React, {Component} from 'react'
import tetherImg from '../tether.png'
import Airdrop from './Airdrop'

class Main extends Component {
    //Our React Codes Goes In Here
    render(){
        return (
            <div id='content' className='mt-3'>
                <table className='table text-muted text-center'>
                    <thead>
                        <tr style={{color: 'white'}}>
                            <th scope='col'>STAKING BALANCE</th>
                            <th scope='col'>REWARD BALANCE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{color: 'white'}}>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} mUSDT</td>
                            <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} RWD</td>
                        </tr>
                    </tbody>
                </table>

                <div className='card mb-2' style={{opacity: '.9'}}>
                    <form onSubmit={
                        e => {
                            e.preventDefault()
                            let amount = this.input.value.toString()
                            amount = window.web3.utils.toWei(amount, 'Ether')
                            this.props.stakeTokens(amount)
                        }
                    } className='mb-3' >

                        <div style={{borderSpacing: '0 1em'}}>
                            <label className='float-left' style={{marginLeft: '15px'}}><strong>Stake Tokens</strong></label>
                            <span className='float-right' style={{marginRight: '8px'}}>Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')}</span>
                            <div className='input-group mb-4'>
                                
                                <input 
                                ref={ input => this.input = input }
                                type='number' placeholder='0' required />

                                <div className='input-group-open'>
                                    <div className='input-group-text'>
                                        <img src={tetherImg} alt='tether' height='30px' width='30px' />
                                        &nbsp;&nbsp;&nbsp; mUSDT
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary btn-lg btn-block'>Deposit</button>
                        </div>
                    </form>
                    <button 
                    onClick={
                        e => {
                            e.preventDefault()
                            this.props.unstakeTokens()
                        }
                    }
                    type='submit' className='btn btn-primary btn-lg btn-block'>Withdraw</button>
                    <div className='card-body text-center' style={{color: '#000066'}}>Airdrop <Airdrop stakingBalance={this.props.stakingBalance}/></div>
                </div>
            </div>
        )
    }
}

export default Main;