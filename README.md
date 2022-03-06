
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

* Docker
* Docker Compose
  * **Note:**
    The following docker images are automatically pulled from Docker Hub when starting docker-compose.

    * [NodeJS 12](https://hub.docker.com/r/hyperledger/fabric-peer)

## Start OrbitDB


  ```
  $ docker-compose up --build

  ```


# License

Halo Node source code is released under License Attribution-NonCommercial 4.0 International license. You may obtain a copy of the license, titled CC-BY-NC-4.0, at https://creativecommons.org/licenses/by-nc/4.0/.