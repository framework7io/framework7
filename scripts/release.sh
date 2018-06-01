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

  # build
  VERSION=$VERSION npm run build:prod

  # update packages
  # using subshells to avoid having to cd back
  (
    (
      cd dist/core
      npm version "$VERSION"
      # npm publish
    )
    (
      cd dist/vue
      npm version "$VERSION"
      # npm publish
    )
    (
      cd dist/react
      npm version "$VERSION"
      # npm publish
    )
  )

  # commit
  # git add -A
  # git add -f \
  #   dist/**/*.*
  # git commit -m "$VERSION Release"

  # # tag version
  # npm version "$VERSION" --message "build: release $VERSION"

  # # publish
  # git push origin refs/tags/v"$VERSION"
  # git push
fi