/*
  orbitDB test

  Creates a publically writable DB.
  Adds a series of test key-value pairs.
*/

"use strict"

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
let ipfs // handle for IPFS instance.
let db // handle for orbit DB.

const util = require("util");
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
};


module.exports = {
  openDb
}


// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
// Note that these options need to be passed to IPFS in
// all examples in this document even if not specfied so.
const ipfsOptions = { 
  repo: "./ipfs" 
}

// Returns a promise that resolves to a handle of the DB.
async function openDb() {
  try {
    // Create IPFS instance
    ipfs = await IPFS.create(ipfsOptions)

    //ipfs.swarm.connect('/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star');
    //ipfs.swarm.connect('/ip4/198.46.197.197/tcp/4001/ipfs/QmdXiwDtfKsfnZ6RwEcovoWsdpyEybmmRpVDXmpm5cpk2s'); // Connect to ipfs.p2pvps.net

    // Create OrbitDB instance
    const orbitdb = await OrbitDB.createInstance(ipfs)

    const access = {
      // Give write access to everyone
      write: ['*'],
    }

    // Load the DB.
    db = await orbitdb.docstore('balance', access)
    await db.load()

    console.log(`database string: ${db.address.toString()}`)
    //console.log(`db public key: ${db.key.getPublic('hex')}`)

    // React when the database is updated.
    db.events.on('replicated', () => {
      console.log(`Database replicated. Check for new prices.`)
    })

    return db;

  } catch(err) {
    return console.error(err);
  }
}