'use strict';

// Libraries imports
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const bodyParser = require('body-parser');
const http = require('http')
const express = require('express')
const app = express();
const cors = require('cors');
const constants = require('./config/constants.json')

// Local imports
const dbLib = require("./app/storage/orbit.js"); 
const createOrbit = require('./app/storage/createOrbit')
const getDbAddress = require('./app/getDbAddress')
const storeData = require('./app/storage/storeData')

// Server config
logger.level = 'debug';
const host = process.env.HOST || constants.host;
const port = process.env.PORT || constants.port;
app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Global variables
let db;

async function start() {
    try {
        // Open the Database
        db = await dbLib.openDb();

        // Start up the Express web server
        app.listen(port).on("error", expressErrorHandler);
        logger.info('****************** SERVER STARTED ************************');
        logger.info('***************  http://%s:%s  ******************', host, port);

        // Handle generic errors thrown by the express application.
        function expressErrorHandler(err) {
            if (err.code === "EADDRINUSE")
                console.error(`Port ${port} is already in use. Is this program already running?`);
            else console.error(JSON.stringify(err, null, 2));

            console.error("Express could not start!");
            process.exit(0);
        }

        // Allow any computer to access this API.
        app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
        });

        // Endpoints
        app.get('/isAlive', async function (req, res) {
            try {
                var message = db.address.toString();
        
                const response_payload = {
                    result: message,
                    error: null,
                    errorData: null
                }
                
                res.send(response_payload);
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                return error.message
            }
        });
        
        app.post('/getData', async function (req, res) {
            try {
                
                //const message = db.get('adsa-sasdas-dsadas').map((e) => e);
                const message = db.query((doc) => doc);
        
                const response_payload = {
                    result: message,
                    error: null,
                    errorData: null
                }
        
                res.send(response_payload);
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                return error.message
            }
        });
        
        app.post('/storeData', async function (req, res) {
            try {
                const token = req.body.token;
                const content = req.body.content;
                const testNumber = req.body.testNumber;

                db.put({ _id: token, doc: content, views: testNumber })

                const response_payload = {
                    result: "the result has been stored succesfully in the cyberspace",
                    error: null,
                    errorData: null
                }
        
                res.send(response_payload);
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                return error.message
            }
        });

    } catch(err) {
        console.error(`Error in price-server.js: `,err);
    }
}

start();

//app.get('/channels/:channelName/chaincodes/:chaincodeName', async function (req, res) {
//    try {
//        logger.debug('==================== QUERY BY CHAINCODE ==================');
//
//        var channelName = req.params.channelName;
//        var chaincodeName = req.params.chaincodeName;
//        console.log(`chaincode name is :${chaincodeName}`)
//        let args = req.query.args;
//        let fcn = req.query.fcn;
//        let peer = req.query.peer;
//
//        logger.debug('channelName : ' + channelName);
//        logger.debug('chaincodeName : ' + chaincodeName);
//        logger.debug('fcn : ' + fcn);
//        logger.debug('args : ' + args);
//
//        if (!chaincodeName) {
//            res.json(getErrorMessage('\'chaincodeName\''));
//            return;
//        }
//        if (!channelName) {
//            res.json(getErrorMessage('\'channelName\''));
//            return;
//        }
//        if (!fcn) {
//            res.json(getErrorMessage('\'fcn\''));
//            return;
//        }
//        if (!args) {
//            res.json(getErrorMessage('\'args\''));
//            return;
//        }
//        console.log('args==========', args);
//        args = args.replace(/'/g, '"');
//        args = JSON.parse(args);
//        logger.debug(args);
//
//        let message = await query.query(channelName, chaincodeName, args, fcn, req.username, req.orgname);
//
//        const response_payload = {
//            result: message,
//            error: null,
//            errorData: null
//        }
//
//        res.send(response_payload);
//    } catch (error) {
//        const response_payload = {
//            result: null,
//            error: error.name,
//            errorData: error.message
//        }
//        res.send(response_payload)
//    }
//});