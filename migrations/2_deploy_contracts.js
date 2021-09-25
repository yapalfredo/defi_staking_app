const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DecentralizedBank = artifacts.require('DecentralizedBank')

module.exports = async function(deployer, network, accounts) {
    //deploy mock usdt
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()
    
    //deploy mock usdt
    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

    //deploy mock usdt
    await deployer.deploy(DecentralizedBank, rwd.address, tether.address)
    const decentralizedbank = await DecentralizedBank.deployed()

    //Transfer all RWD coins to Decentralized Bank
    await rwd.transfer(decentralizedbank.address, '1000000000000000000000000')

    //distribute 100 tether to investor
    await tether.transfer(accounts[1], '100000000000000000000')
}

