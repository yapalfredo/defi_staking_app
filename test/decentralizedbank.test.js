
const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DecentralizedBank = artifacts.require('DecentralizedBank')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralizedBank', accounts => {
    //All testing codes go here
    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            let tether = await Tether.new()
            const name = await tether.name()
            assert.equal(name, 'Mock USDT')
        })
    })

})
