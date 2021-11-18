#!/bin/bash

pushd ~/Documents/GitHub/halo-node/peer/network/docker
docker-compose -f ./docker-compose.yaml up -d
popd