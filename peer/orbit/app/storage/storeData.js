const IpfsClient = require('ipfs-http-client')
const OrbitDB = require('orbit-db')
const fs = require('fs');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')

const storeData = async (address) => {

    try {
        const ipfs = IpfsClient.create('http://localhost:5001')
        const orbitdb = await OrbitDB.createInstance(ipfs)

        //const db = await orbitdb.docstore(address)
        return "ciao"//db.address.toString()
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error.message
    }
}

exports.storeData = storeData