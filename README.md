
<!-- (SPDX-License-Identifier: CC-BY-4.0) -->  <!-- Ensure there is a newline before, and after, this line -->

# OrbitDB Module Branch

This implementation is embedded in the Halo Node, the application used to secure and share your personal data on the Halo Network.
The following implementation has been tested on Docker.


# Release Notes

| Docker Version   | Docker-Compose Version                                           |
| --               | --                                                               |
| [v4.5.0 (74594)] | [v3.9](https://hyperledger-fabric.readthedocs.io/en/release-2.2) |

---

# Quick start

## Prerequisites

* Deploy 2 machines accessible from their Public IP
* Install Docker
* Install Docker Compose
  * **Note:**
    The following docker images are automatically pulled from Docker Hub when starting docker-compose.

    * [NodeJS 12](https://hub.docker.com/_/node)

## Deploy OrbitDB
* Move the node folder into both the machines
* Enter the first machine and start the containers:
  ```
  $ cd node/
  $ docker-compose up --build
  ```
* Search in the log for the Multiaddress ip and copy it. It should be in the form:
  ```
  "/ip4/127.0.0.1/tcp/4001/p2p/QmVpVbEw6RPnXwbvyNhwpCT94eMtN8rwioEDWGdGSc9K4m"
  ```
* Enter the second machine open config.json in the config folder. 
* Copy the Multiaddress ip into broadcast by putting the Public IP of the first machine:
  ```
  "/ip4/<Public IP first machine>/tcp/4001/p2p/QmVpVbEw6RPnXwbvyNhwpCT94eMtN8rwioEDWGdGSc9K4m"
  ```
* Start the containers in the second machine:
  ```
  $ cd node/
  $ docker-compose up --build
  ```
  
## Endpoint
* POST /orbit/connect
* GET /orbit/disconnect
* GET /orbit/clean
* GET /orbit/address
* GET /orbit/multiaddress
* GET /orbit/getalldata
* GET /orbit/getdata
* POST /orbit/storedata

# License

Halo Node source code is released under License Attribution-NonCommercial 4.0 International license. You may obtain a copy of the license, titled CC-BY-NC-4.0, at https://creativecommons.org/licenses/by-nc/4.0/.