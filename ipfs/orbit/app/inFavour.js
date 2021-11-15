const { Gateway, Wallets, } = require('fabric-network');
const fs = require('fs');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')

const inFavour = async (votingRecord) => {

    try {
        // load the network configuration
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

        // create contract object
        const contract = network.getContract('evote');

        // invoke 
        const result = await contract.submitTransaction('InFavour', votingRecord);

        // disconnect from gateway
        await gateway.disconnect();
         
        return "The vote has been registered in the ledger"
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error.message
    }
}

exports.inFavour = inFavour