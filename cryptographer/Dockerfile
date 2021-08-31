FROM python:3.7.5-slim-buster
LABEL Gioele Bigini <gioele.bigini@gmail.com>

RUN apt-get update && apt-get install -qq -y build-essential libpq-dev --no-install-recommends

ENV INSTALL_PATH /cryptographer
RUN mkdir $INSTALL_PATH
WORKDIR $INSTALL_PATH

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

RUN pip install --editable .