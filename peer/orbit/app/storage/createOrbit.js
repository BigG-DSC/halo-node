const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const fs = require('fs');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')

const createOrbit = async () => {

    try {
        const db = await orbitdb.docstore('balance', options)
        result = db.address.toString()

        return result
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error.message
    }
}

exports.createOrbit = createOrbit