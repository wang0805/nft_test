const { assert } = require('chai')

const Color = artifacts.require('./Color.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

describe('Color', function () {
    let contract;

    beforeEach(async () => {
        contract = await Color.deployed()
    })

    it('deploys successfully', async () => {
        const address = contract.address
        // console.log(address)
        assert.notEqual(address, '')
        assert.notEqual(address, 0x0)
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })
    
    it('has a name', async () => {
        const name = await contract.name()
        assert.equal(name, 'Color')
    })

    it('has a symbol', async () => {
        const symbol = await contract.symbol()
        assert.equal( symbol, 'COLOR')
    })
        
})

describe('minting', function () {
    let contract;

    beforeEach(async () => {
        contract = await Color.deployed()
    })

    it('creates a new token', async () => {
        const results = await contract.mint('EC058E')
        const totalSupply = await contract.totalSupply()
        //SUCCESS
        assert.equal(totalSupply, 1)
        const event = results.logs[0].args
        assert.equal(event.tokenId.toNumber(), 1, 'ID is correct')
        // console.log("event from", event.from, event.to)

        await contract.mint('EC058E').should.be.rejected;

    })
})

describe('indexing', function () {
    let contract;

    beforeEach(async () => {
        contract = await Color.deployed()
    })

    it('lists colors', async () => {
        it('list colors', async () => {
            await contract.mint('#5486E4')
            await contract.mint('#FFFFFF')
            await contract.mint('000000')
            const totalSupply = await contract.totalSupply()
            console.logt(totalSupply)

            let color
            let result = []

            for (let i = 0; i < totalSupply; i++){
                color = await contract.colors(i)
                result.push(color)
            }

            let expected = ['5486E4', 'FFFFFF', '000000']
            assert.equal(result.join(',',expected.join(',')))
        })
        
    })
})