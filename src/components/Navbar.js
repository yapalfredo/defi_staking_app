import React, {Component} from 'react'
import bankImg from '../bank.png'

class Navbar extends Component {
    //Our React Codes Goes In Here
    render(){
        return (
            <nav className='navbar navbar-dark fixed-top shadow p-0'
                 style={{backgroundColor:'#000066', height: '50px'}}>
                     <a className='navbar-brand col-sm-3 col-md-2 mr-0'
                     style={{color: 'white'}}><img src={bankImg} width='30' height='30' className='d-inline-block align-top' alt='bank'/> &nbsp; 
                     FreedomApp Decentralized Banking
                     </a>
                     <ul className='navbar-nav px-3'>
                         <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
                             <small style={{color: 'white'}}>ACCOUNT NUMBER: <span style={{color: '#33FF00'}}>{this.props.account}</span></small>
                         </li>
                     </ul>
            </nav>
        )
    }
}

export default Navbar;