
<!-- (SPDX-License-Identifier: CC-BY-4.0) -->  <!-- Ensure there is a newline before, and after, this line -->

# Halo Node

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/hyperledger/blockchain-explorer?sort=semver)](https://github.com/hyperledger/blockchain-explorer/releases)
<!-- badges -->

![](docs/images/Halo_Hyperledger_Logo.png)

Halo Node is the application used to secure and share you personal data on the Halo Network. Built and maintained by Gioele Bigini, it is an open source project part of the Industrial Innovation PhD granted to Gioele Bigini during 2019, supervised by Prof. Emanuele Lattanzi. The following implementation has been tested on Ubuntu 18.


# Release Notes

| Hyperledger Explorer Version                      | Fabric Version Supported                                         |
| --                                                | --                                                               |
| [v1.1.7](release_notes/v1.1.7.md)                 | [v2.2](https://hyperledger-fabric.readthedocs.io/en/release-2.2) |

---

# Quick start

## Prerequisites

* Running [halo Network](https://github.com/BigG-DSC/halo-network)
* Docker
* Docker Compose
  * **Note:**
    The following docker images are automatically pulled from Docker Hub when starting docker-compose.

    * [Hyperledger Fabric peer docker repository](https://hub.docker.com/r/hyperledger/fabric-peer)

## Start the Halo Node


  ```
  $ docker-compose up --build

  ```


# License

Halo Node source code is released under License Attribution-NonCommercial 4.0 International license. You may obtain a copy of the license, titled CC-BY-NC-4.0, at https://creativecommons.org/licenses/by-nc/4.0/.