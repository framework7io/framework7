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
  rm -rf ./packages/core/lazy-components
  rm -rf ./packages/core/css
  rm -rf ./packages/core/js
  rm -rf ./packages/core/less
  rm -rf ./packages/core/modules
  rm -rf ./packages/core/utils
  rm -rf ./packages/core/icons
  rm -rf ./packages/core/*.js
  rm -rf ./packages/core/*.ts
  rm -rf ./packages/core/*.less
  rm -rf ./packages/react/components
  rm -rf ./packages/react/runtime-helpers
  rm -rf ./packages/react/utils
  rm -rf ./packages/react/*.js
  rm -rf ./packages/react/*.ts
  rm -rf ./packages/react/*.map
  rm -rf ./packages/vue/components
  rm -rf ./packages/vue/runtime-helpers
  rm -rf ./packages/vue/utils
  rm -rf ./packages/vue/*.js
  rm -rf ./packages/vue/*.ts
  rm -rf ./packages/vue/*.map

  # build
  VERSION=$VERSION npm run build:prod

  # update dependencies
  npm run release-update-dependencies

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

  # Build Production Kitchen Sink
  npm run ks:prod

  # commit
  git add -A
  git commit -m "$VERSION release"

  # publish
  git push
  git tag v"$VERSION"
  git push origin --tags

  # Create assets
  echo "Generate assets"
  (
    (
      cd packages/core
      tar -zcvf ../framework7.tar.gz ./*
    )
    (
      cd packages/react
      tar -zcvf ../framework7-react.tar.gz ./*
    )
    (
      cd packages/vue
      tar -zcvf ../framework7-vue.tar.gz ./*
    )
  )

  # Read TOKEN
  token=$(<./.github-access-token)

  echo "Creating release"
  API_JSON=$(printf '{"tag_name": "v%s","name": "v%s","body": "Release of version %s","draft": false,"prerelease": false}' $VERSION $VERSION $VERSION)
  curl --data "$API_JSON" https://api.github.com/repos/framework7io/framework7/releases?access_token=$token

  # Upload assets
  echo "Uploading release assets"
  source "scripts/release-asset.sh" github_api_token=$token tag=v$VERSION filename=./packages/framework7.tar.gz
  source "scripts/release-asset.sh" github_api_token=$token tag=v$VERSION filename=./packages/framework7-react.tar.gz
  source "scripts/release-asset.sh" github_api_token=$token tag=v$VERSION filename=./packages/framework7-vue.tar.gz

  # Remove generated assets
  rm -rf ./packages/*.tar.gz

  echo "Done"

fi