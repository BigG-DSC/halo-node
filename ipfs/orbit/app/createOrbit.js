const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const fs = require('fs');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')

const createOrbit = async () => {

    try {
        const ipfsOptions = { repo: './ipfs',}
        const ipfs = await IPFS.create(ipfsOptions)
        const orbitdb = await OrbitDB.createInstance(ipfs)

        const options = {
            accessController: {
              write: [
                orbitdb.identity.id,
              ]
            }
          }

        const db = await orbitdb.keyvalue('balance')
        await db.put('name', 'hello')
        return db.address.toString()
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error.message
    }
}

exports.createOrbit = createOrbit