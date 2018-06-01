#!/bin/bash
set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read -r VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  if [[ -z $SKIP_TESTS ]]; then
    npm run lint
  fi

  # remove old builds
  rm -rf ./packages/core/components
  rm -rf ./packages/core/css
  rm -rf ./packages/core/js
  rm -rf ./packages/core/less
  rm -rf ./packages/core/modules
  rm -rf ./packages/core/utils
  rm -rf ./packages/core/*.js
  rm -rf ./packages/core/*.less
  rm -rf ./packages/react/components
  rm -rf ./packages/react/runtime-helpers
  rm -rf ./packages/react/utils
  rm -rf ./packages/react/*.js
  rm -rf ./packages/react/*.map
  rm -rf ./packages/vue/components
  rm -rf ./packages/vue/runtime-helpers
  rm -rf ./packages/vue/utils
  rm -rf ./packages/vue/*.js
  rm -rf ./packages/vue/*.map

  # build
  VERSION=$VERSION npm run build:prod

  # update packages
  # using subshells to avoid having to cd back
  (
    (
      cd packages/core
      npm version "$VERSION"
      npm publish
    )
    (
      cd packages/vue
      npm version "$VERSION"
      npm publish
    )
    (
      cd packages/react
      npm version "$VERSION"
      npm publish
    )
  )

  # commit
  git add -A
  git add -f \
    packages/**/*.*
  git commit -m "$VERSION Release"

  # publish
  git push origin refs/tags/v"$VERSION"
  git push
fi