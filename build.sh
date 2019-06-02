#! /bin/bash

npm install -g portalize

curl -u "$NEXUS_USERNAME:$NEXUS_PASSWORD" "$NEXUS_ENDPOINT/repository/$NEXUS_REPOSITORY/artifacts/latest.tar.gz" -o portal.tar.gz

env PORTALIZE_ARCHIVE_NAME=portal.tar.gz portalize restore ./build/portalize.config.json

rm portal.tar.gz

docker build -f ./build/Dockerfile -t webapp .

rm -rf portal

