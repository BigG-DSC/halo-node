#!/bin/bash

# create channel artifacts folder
mkdir ~/mount/network/channel-artifacts

pushd ~/mount/network

# set the cfg path
export PATH="$PWD/../bin:$PATH"
export FABRIC_CFG_PATH=$PWD/configtx/

# create the channel creation transaction
configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel1.tx -channelID channel1

# set environment to the admin user of Bigini
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="BiginiMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/bigini.halonetwork.com/peers/peer0.bigini.halonetwork.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/bigini.halonetwork.com/users/Admin@bigini.halonetwork.com/msp
export CORE_PEER_ADDRESS=localhost:7051

# set the cfg path to the core file
export FABRIC_CFG_PATH=$PWD/../config

# create the channel
peer channel create -o localhost:7050  --ordererTLSHostnameOverride orderer.halonetwork.com -c channel1 -f ./channel-artifacts/channel1.tx --outputBlock ./channel-artifacts/channel1.block --tls --cafile ${PWD}/organizations/ordererOrganizations/halonetwork.com/orderers/orderer.halonetwork.com/msp/tlscacerts/tlsca.halonetwork.com-cert.pem

# join org1 to the channel
peer channel join -b ./channel-artifacts/channel1.block

# show the blockheight of the channel
peer channel getinfo -c channel1

# set environment to the admin user of Lattanzi
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="LattanziMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/lattanzi.halonetwork.com/peers/peer0.lattanzi.halonetwork.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/lattanzi.halonetwork.com/users/Admin@lattanzi.halonetwork.com/msp
export CORE_PEER_ADDRESS=localhost:9051

# fetch the first block from the ordering service
peer channel fetch 0 ./channel-artifacts/channel_org2.block -o localhost:7050 --ordererTLSHostnameOverride orderer.halonetwork.com -c channel1 --tls --cafile ${PWD}/organizations/ordererOrganizations/halonetwork.com/orderers/orderer.halonetwork.com/msp/tlscacerts/tlsca.halonetwork.com-cert.pem

# join org2 to the channel
peer channel join -b ./channel-artifacts/channel_org2.block

# set the cfg path
export FABRIC_CFG_PATH=$PWD/configtx/

# create the anchor update transaction for org2
configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/org2_anchor.tx -channelID channel1 -asOrg LattanziMSP

# set the cfg path to the core file
export FABRIC_CFG_PATH=$PWD/../config

# send the anchor update to the ordering service
peer channel update -o localhost:7050 -c channel1 -f ./channel-artifacts/org2_anchor.tx --ordererTLSHostnameOverride orderer.halonetwork.com --tls --cafile ${PWD}/organizations/ordererOrganizations/halonetwork.com/orderers/orderer.halonetwork.com/msp/tlscacerts/tlsca.halonetwork.com-cert.pem

# set environment to the admin user of Org1
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="BiginiMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/bigini.halonetwork.com/peers/peer0.bigini.halonetwork.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/bigini.halonetwork.com/users/Admin@bigini.halonetwork.com/msp
export CORE_PEER_ADDRESS=localhost:7051

# set the cfg path
export FABRIC_CFG_PATH=$PWD/configtx/

# create the anchor update transaction for org1
configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/org1_anchor.tx -channelID channel1 -asOrg BiginiMSP

# set the cfg path to the core file
export FABRIC_CFG_PATH=$PWD/../config

# send the anchor update to the ordering service
peer channel update -o localhost:7050 -c channel1 -f ./channel-artifacts/org1_anchor.tx  --ordererTLSHostnameOverride orderer.halonetwork.com --tls --cafile ${PWD}/organizations/ordererOrganizations/halonetwork.com/orderers/orderer.halonetwork.com/msp/tlscacerts/tlsca.halonetwork.com-cert.pem

# show the blockheight of the channel
peer channel getinfo -c channel1

popd