#!/bin/bash

# remove the old materials
sudo rm -fr ~/Documents/GitHub/halo-node/peer/network/organizations/ordererOrganizations/*
sudo rm -fr ~/Documents/GitHub/halo-node/peer/network/organizations/peerOrganizations/*
sudo rm -fr ~/Documents/GitHub/halo-node/peer/network/system-genesis-block/*

# deploy the ca
pushd ~/Documents/GitHub/halo-node/peer/network/docker
docker-compose -f ./docker-compose-ca.yaml up -d
popd

sleep 10

# generate crypto materials
pushd ~/Documents/GitHub/halo-node/peer/network
export PATH="$PWD/../bin:$PATH"
./organizations/fabric-ca/registerEnroll.sh
popd