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
        
        before(async () => {
            result = await socialNetwork.createPost('this is my first post', {from: author})
            postCount = await socialNetwork.postCount()
        })

        it('creates posts', async () => {
            assert.equal(postCount, 1)
            //to mention the event
            const event = result.logs[0].args
          
            //success case
            assert.equal(event.id.toNumber(),postCount.toNumber(), 'ID is correct')
            assert.equal(event.content,'this is my first post', 'content is correct')
            assert.equal(event.tipAmount,'0', 'amount is correct')
            assert.equal(event.author,author, 'Author is correct')
            //failure case
            await socialNetwork.createPost('', {from: author}).should.be.rejected;
        })

        it('list all the posts', async () => {
            const post = await socialNetwork.posts(postCount)

            assert.equal(post.id.toNumber(),postCount.toNumber(), 'ID is correct')
            assert.equal(post.content,'this is my first post', 'content is correct')
            assert.equal(post.tipAmount,'0', 'amount is correct')
            assert.equal(post.author,author, 'Author is correct')

        })
        it('allow users to tip the post', async () => {

            //Track the author balance before transaction
            let oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            //then we'll convert it into big number
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

            result = await socialNetwork.tipPost(postCount, {from: tipper, value: web3.utils.toWei('1', 'Ether')})
            const event = result.logs[0].args
            
            //success case
            assert.equal(event.id.toNumber(),postCount.toNumber(), 'ID is correct')
            assert.equal(event.content,'this is my first post', 'content is correct')
            assert.equal(event.tipAmount,'1000000000000000000', 'amount is correct')
            assert.equal(event.author,author, 'Author is correct')

            //Track the author balance after transaction
            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            //then we'll convert it into big number
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            //the tip amount
            let tipAmount
            tipAmount = web3.utils.toWei('1', 'Ether')
            tipAmount = new web3.utils.BN(tipAmount)

            const expectedBalance = oldAuthorBalance.add(tipAmount)

            assert.equal(newAuthorBalance.toString(), expectedBalance.toString())


        //Failure: tries to tip a post that does not exist
        result = await socialNetwork.tipPost(99, {from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected


        })
    })
})