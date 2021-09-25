pragma solidity > 0.5.0;
import './RWD.sol';
import './Tether.sol';


contract DecentralizedBank {
    string public name = 'Decentralized Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    constructor(RWD _rwd, Tether _musdt) public {
        rwd = _rwd;
        tether = _musdt;
    }
}