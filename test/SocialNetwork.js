const SocialNetwork = artifacts.require('SocialNetwork.sol')

//we use chai as assertion library along the mocha framework for testing

require('chai')
    .use(require('chai-as-promised'))
    .should()
    
//all the tests must be written inside the call back function which appear as argument of contract
//deployer is the account which deployes the smart contract, author is the one who creates post and tipper is the one who tips each post
contract('SocialNetwork', ([deployer, author, tipper]) => {
    let socialNetwork;

    before(async () => {
        socialNetwork = await SocialNetwork.deployed()
      })

    describe('deployment', async() =>{
        it('deployed successfully',async() => {
            const address = await socialNetwork.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async() => {
            const name = await socialNetwork.name()
            assert.equal(name, 'abc')
        } )
    })

    describe('posts', async ()=>{
        let result, postCount
        it('creates posts', async () => {
            result = await socialNetwork.createPost('this is my first post', {from: author})
            postCount = await socialNetwork.postCount()
            assert.equal(postCount, 1)
            //to mention the event
            const event = result.logs[0].args
            console.log(event)
            //success case
            assert.equal(event.id.toNumber(),postCount.toNumber(), 'ID is correct')
            assert.equal(event.content,'this is my first post', 'content is correct')
            assert.equal(event.tipAmount,'0', 'amount is correct')
            assert.equal(event.author,author, 'Author is correct')
            //failure case
            await socialNetwork.createPost('', {from: author}).should.be.rejected;
        })
        // it('list all the posts', async () => {

        // })
        // it('allow users to tip the post', async () => {

        // })
    })
})