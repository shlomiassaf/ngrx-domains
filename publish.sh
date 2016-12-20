#!/bin/bash

rm -rf ./src/ngrx-domains

tsc --project tsconfig.lib.json 2> /dev/null

if [ $? -eq 0 ]
then
  echo "Compilation OK, publishing"
  cp README.md ./src/ngrx-domains
  cp lib/package.json ./src/ngrx-domains
  NPM_USER=$(npm whoami 2> /dev/null)
  if [ "${NPM_USER}" != "shlomiassaf" ]; then
    echo "You must be logged in as 'shlomiassaf' to publish. Use 'npm login'."
    exit
  fi

  set -ex

  npm publish --access public ./src/ngrx-domains

else
  echo "Compilation failed" >&2
fi
