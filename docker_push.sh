#!/bin/bash

echo "Build number: ${TRAVIS_BUILD_NUMBER}"
echo "Build ID: ${TRAVIS_BUILD_ID}"
echo "Commit message: ${TRAVIS_COMMIT_MESSAGE}"

# Login to repository
docker login -u "$DOCKER_USER" -p "$DOCKER_PASSWORD"

# Build image
docker build -t "saniaky/planner-ui:$TRAVIS_BUILD_NUMBER" -t "saniaky/planner-ui:latest" .

# Push to repository
docker push "saniaky/planner-ui:$TRAVIS_BUILD_NUMBER"
docker push "saniaky/planner-ui:latest"
