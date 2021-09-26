const decentralizedbank = artifacts.require('DecentralizedBank')

module.exports = async function issueRewards(callback){
    let dcb = await decentralizedbank.deployed()
    await dcb.issueTokens()
    console.log("Tokens have been issue successfully")
    callback()
}