# Dockerfile for IPFS (https://ipfs.io/)
# Data is stored under /root/.ipfs/
FROM golang:1.14
LABEL maintainer "Gioele Bigini <devbigdsc@gmail.com>"

ENV DEBIAN_FRONTEND noninteractive

# Install ipfs using ipfs-update and initialize
RUN go get -u github.com/ipfs/ipfs-update \
    && ipfs-update install latest \
    && ipfs init

# config the api endpoint, may introduce security risk to expose API_PORT public
RUN ipfs config Addresses.API /ip4/0.0.0.0/tcp/5002
RUN ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8080

# by default, run `ipfs daemon` to start as a running node
ENTRYPOINT ["ipfs"]
CMD ["daemon"]