const { Gateway, Wallets, } = require('fabric-network');
const fs = require('fs');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')


//const helper = require('./helper')

const query = async () => {

    try {
        //load the network configuration
        const ccpPath = path.resolve(__dirname, '..', 'config', 'connection-bigini.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // create a new file system based wallet for managing identities
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // create gateway
        const gateway = new Gateway();
        await gateway.connect(ccp, {wallet, identity: 'appUser3', discovery: {enabled: true, asLocalhost: true}});

        // create network object
        const network = await gateway.getNetwork('channel1');

        //create contract object
        const contract = network.getContract('evote');

        //invoke 
        const result = await contract.evaluateTransaction('GetAllPolls');

        //disconnect from gateway
        await gateway.disconnect();
         
        return JSON.parse(result.toString())
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error.message
    }
}

//const query = async (channelName, chaincodeName, args, fcn, username, org_name) => {
//
//    try {
//        console.log(`arguments type is------------------------------------------------------------- ${typeof args}`)
//        console.log(`length of args is------------------------------------------------------------ ${args.length}`)
//        
//        // load the network configuration
//        const ccpPath = path.resolve(__dirname, 'connection-bigini.json');
//        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
//        //const ccp = await helper.getCCP(org_name) 
//
//        // Create a new file system based wallet for managing identities.
//        const walletPath = path.join(process.cwd(), 'wallet');
//        //const walletPath = await helper.getWalletPath(org_name) //.join(process.cwd(), 'wallet');
//        const wallet = await Wallets.newFileSystemWallet(walletPath);
//        console.log(`Wallet path: ${walletPath}`);
//
//        // Check to see if we've already enrolled the user.
//        //let identity = await wallet.get(username);
//        //if (!identity) {
//        //    console.log(`An identity for the user ${username} does not exist in the wallet, so registering user`);
//        //    await helper.getRegisteredUser(username, org_name, true)
//        //    identity = await wallet.get(username);
//        //    console.log('Run the registerUser.js application before retrying');
//        //    return;
//        //}
//
//        // Create a new gateway for connecting to our peer node.
//        const gateway = new Gateway();
//        await gateway.connect(ccp, {wallet, identity: username, discovery: { enabled: true, asLocalhost: true }});
//
//        // Get the network (channel) our contract is deployed to.
//        const network = await gateway.getNetwork(channelName);
//
//        // Get the contract from the network.
//        const contract = network.getContract(chaincodeName);
//
//        //invoke 
//        const result = await contract.evaluateTransaction('GetAllPolls');
//        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
//
//        //disconnect from gateway
//        await gateway.disconnect();
//
//        result = JSON.parse(result.toString());
//        return result
//    } catch (error) {
//        console.error(`Failed to evaluate transaction: ${error}`);
//        return error.message
//    }
//}

exports.query = query