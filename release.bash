#!/bin/bash

npx webpack --entry ./target/index.js --output-path public/js/libs.js
clj -A:shadow-cljs release app

mkdir release
cp -r public/* release/
mkdir -p release/biomarker-correlator
mv release/js release/biomarker-correlator/js
mv release/css release/biomarker-correlator/css
sed -i 's/\/css\/site.css/\/biomarker-correlator\/css\/site.css/g' \
  release/biomarker-correlator.html
sed -i 's/\/js\/app.js/\/biomarker-correlator\/js\/app.js/g' \
  release/biomarker-correlator.html
rm release/index.html
git add release/**
git commit -m "new release"
git push
