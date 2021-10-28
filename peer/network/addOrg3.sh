#!/bin/bash

# remove the old materials
pushd $PWD
rm -fr organizations/ordererOrganizations/*
rm -fr organizations/peerOrganizations/*
pwd
# deploy the ca
docker-compose -f ./docker/docker-compose-ca.yaml up -d
popd

sleep 10

#export PATH="$PWD/../bin:$PATH"
#
## generate crypto materials
#pushd ~/hlf/network
#./organizations/fabric-ca/registerEnroll.sh
#
## set the cfg path
#export FABRIC_CFG_PATH=$PWD/configtx/
#
## create the genesis block
#configtxgen -profile TwoOrgsOrdererGenesis -channelID system-channel -outputBlock ./system-genesis-block/genesis.block 
#popd