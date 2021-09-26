pragma solidity > 0.5.0;
import './RWD.sol';
import './Tether.sol';


contract DecentralizedBank {
    string public name = 'Decentralized Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping (address => uint) public stakingBalance;
    mapping (address => bool) public hasStaked; 
    mapping (address => bool) public isStaking;

    constructor(RWD _rwd, Tether _musdt) public {
        rwd = _rwd;
        tether = _musdt;
        owner = msg.sender;
    }

    //staking function
    function depositTokens(uint _amount) public {
        //require staking amount to be greater than zero
        require(_amount > 0, 'Amount cannot be 0');

        //Transfer mUSDT to this contract for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        //update staking balance
        stakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    //unstaking function
    function withdrawTokens() public {
        //require the amount to be greater than zero
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, 'staking balance can not be less than zero');

        //transfer tokens to the specified contract address from dcb
        tether.transfer(msg.sender, balance);
        // update the staking balance
        stakingBalance[msg.sender] = 0;
        // update staking status
        isStaking[msg.sender] = false;
    }

    // issue rewards tokens
    function issueTokens() public {
        //require the owner to issue tokens only
        require(msg.sender == owner, 'Caller must be the owner!');

        for (uint i = 0; i < stakers.length; i++){
            address recepient = stakers[i];
            uint256 balance = stakingBalance[recepient] / 9; //reward has a ratio of 1/9 per deposit
            if (balance > 0) {
                rwd.transfer(recepient, balance);
            }            
        }
    }
}