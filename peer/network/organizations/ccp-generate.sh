#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $6)
    local CP=$(one_line_pem $7)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${MSP}/$2/" \
        -e "s/\${IP}/$3/" \
        -e "s/\${P0PORT}/$4/" \
        -e "s/\${CAPORT}/$5/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $6)
    local CP=$(one_line_pem $7)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${MSP}/$2/" \
        -e "s/\${IP}/$3/" \
        -e "s/\${P0PORT}/$4/" \
        -e "s/\${CAPORT}/$5/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.yaml | sed -e $'s/\\\\n/\\\n        /g'
}

ORG=bigini
MSP=BiginiMSP
IP=192.168.1.200
P0PORT=7051
CAPORT=7054
PEERPEM=../organizations/peerOrganizations/bigini.halonetwork.com/tlsca/tlsca.bigini.halonetwork.com-cert.pem
CAPEM=../organizations/peerOrganizations/bigini.halonetwork.com/ca/ca.bigini.halonetwork.com-cert.pem

echo "$(json_ccp $ORG $MSP $IP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ../organizations/peerOrganizations/bigini.halonetwork.com/connection-bigini.json
echo "$(yaml_ccp $ORG $MSP $IP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ../organizations/peerOrganizations/bigini.halonetwork.com/connection-bigini.yaml
