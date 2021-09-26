const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DecentralizedBank = artifacts.require('DecentralizedBank')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralizedBank', ([owner, customer]) => {
    //All testing codes go here

    let tether, rwd, dcb

    function convertUnitToWei(value){
        return web3.utils.toWei(value, 'ether')
    }

    before (async () => {
        // Load contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        dcb = await DecentralizedBank.new(rwd.address, tether.address)

        // transfer all tokens to the decentralizedbank (1 million)
        await rwd.transfer(dcb.address, convertUnitToWei('1000000'))

        // transfer 100 mock tethers to customer
        await tether.transfer(customer, convertUnitToWei('100'), {from: owner})
    })

    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name()
            assert.equal(name, 'Mock USDT')
        })
    })

    describe('Mock RWD Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Coin')
        })
    })

    describe('Decentralized Bank Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await dcb.name()
            assert.equal(name, 'Decentralized Bank')
        })

        it('contract has tokens', async () => {
            const balance = await rwd.balanceOf(dcb.address)
            assert.equal(balance, convertUnitToWei('1000000'))
        })
    })

})
