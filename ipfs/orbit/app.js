'use strict';
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const bodyParser = require('body-parser');
const http = require('http')
const express = require('express')
const app = express();
const cors = require('cors');
const constants = require('./config/constants.json')

const host = process.env.HOST || constants.host;
const port = process.env.PORT || constants.port;

const createOrbit = require('./app/createOrbit')
const getDbAddress = require('./app/getDbAddress')

let dbAddress = ""

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

logger.level = 'debug';

var server = http.createServer(app).listen(port, function () { console.log(`Server started on ${port}`) });
logger.info('****************** SERVER STARTED ************************');
logger.info('***************  http://%s:%s  ******************', host, port);
server.timeout = 240000;

function getErrorMessage(field) {
    var response = {
        success: false,
        message: field + ' field is missing or Invalid in the request'
    };
    return response;
}

app.get('/createOrbit', async function (req, res) {
    try {
        let message = await createOrbit.createOrbit();
        dbAddress = message;

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

app.post('/getDbAddress', async function (req, res) {
    try {
        var address = req.body.address;

        let message = await getDbAddress.getDbAddress(address);

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