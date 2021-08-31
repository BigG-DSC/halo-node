FROM python:3.7.5-slim-buster
LABEL Gioele Bigini <gioele.bigini@gmail.com>

sudo apt install git -y
sudo apt install curl -y

curl -o "go.tar.gz" https://storage.googleapis.com/golang/go1.15.linux-amd64.tar.gz
sudo chmod +x go.tar.gz
sudo tar -C /usr/local -xzf "go.tar.gz"

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs -y
sudo touch "$HOME/.bashrc"
{
    echo "export PATH=$PATH:/usr/local/go/bin"
    echo "zsh"
} >> "$HOME/.bashrc"