#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

function createOrg3 {
	infoln "Enrolling the CA admin"
	mkdir -p ../organizations/peerOrganizations/external.halonetwork.com/

	export FABRIC_CA_CLIENT_HOME=${PWD}/../organizations/peerOrganizations/external.halonetwork.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:11054 --caname ca-external --tls.certfiles ${PWD}/fabric-ca/org3/tls-cert.pem
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-external.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-external.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-external.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-external.pem
    OrganizationalUnitIdentifier: orderer' > ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/msp/config.yaml

	infoln "Registering peer0"
  set -x
	fabric-ca-client register --caname ca-external --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/fabric-ca/external/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-external --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/fabric-ca/external/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-external --id.name externaladmin --id.secret externaladminpw --id.type admin --tls.certfiles ${PWD}/fabric-ca/org3/tls-cert.pem
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
	fabric-ca-client enroll -u https://peer0:peer0pw@localhost:11054 --caname ca-external -M ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/msp --csr.hosts peer0.external.halonetwork.com --tls.certfiles ${PWD}/fabric-ca/org3/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/msp/config.yaml ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/msp/config.yaml

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:11054 --caname ca-external -M ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/tls --enrollment.profile tls --csr.hosts peer0.external.halonetwork.com --csr.hosts localhost --tls.certfiles ${PWD}/fabric-ca/org3/tls-cert.pem
  { set +x; } 2>/dev/null


  cp ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/tls/tlscacerts/* ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/tls/ca.crt
  cp ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/tls/signcerts/* ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/tls/server.crt
  cp ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/tls/keystore/* ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/tls/server.key

  mkdir ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/msp/tlscacerts
  cp ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/tls/tlscacerts/* ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/msp/tlscacerts/ca.crt

  mkdir ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/tlsca
  cp ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/tls/tlscacerts/* ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/tlsca/tlsca.external.halonetwork.com-cert.pem

  mkdir ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/ca
  cp ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/peers/peer0.external.halonetwork.com/msp/cacerts/* ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/ca/ca.external.halonetwork.com-cert.pem

  infoln "Generating the user msp"
  set -x
	fabric-ca-client enroll -u https://user1:user1pw@localhost:11054 --caname ca-external -M ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/users/User1@external.halonetwork.com/msp --tls.certfiles ${PWD}/fabric-ca/org3/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/msp/config.yaml ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/users/User1@external.halonetwork.com/msp/config.yaml

  infoln "Generating the org admin msp"
  set -x
	fabric-ca-client enroll -u https://externaladmin:externaladminpw@localhost:11054 --caname ca-external -M ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/users/Admin@external.halonetwork.com/msp --tls.certfiles ${PWD}/fabric-ca/org3/tls-cert.pem
  { set +x; } 2>/dev/null

  cp ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/msp/config.yaml ${PWD}/../organizations/peerOrganizations/external.halonetwork.com/users/Admin@external.halonetwork.com/msp/config.yaml
}

createOrg3