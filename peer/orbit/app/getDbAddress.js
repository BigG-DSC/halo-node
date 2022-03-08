const IpfsClient = require('ipfs-http-client')
const OrbitDB = require('orbit-db')
const fs = require('fs');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')

const getDbAddress = async (address) => {

    try {
        //const ipfs = ipfsClient.create({host: 'localhost', port: '5001', protocol: 'http'})
        const ipfs = ipfsClient.create('/ip4/0.0.0.0/tcp/5001')
        const orbitdb = await OrbitDB.createInstance(ipfs)

        const db = await orbitdb.docstore(address)
        
        return db.address.toString()
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error.message
    }
}

exports.getDbAddress = getDbAddress