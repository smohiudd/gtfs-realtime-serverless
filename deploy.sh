#!/usr/bin/env bash
function npm-do { (PATH=$(npm bin):$PATH; eval $@;) }

npm install --force
echo $(npm-do node_modules/.bin/serverless deploy)
