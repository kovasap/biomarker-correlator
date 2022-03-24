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
sed -i 's/\/js\/gdrive.js/\/biomarker-correlator\/js\/gdrive.js/g' \
  release/biomarker-correlator.html
sed -i 's/\/js\/app.js/\/biomarker-correlator\/js\/app.js/g' \
  release/biomarker-correlator/js/gdrive.js
sed -i 's/\/js\/libs.js/\/biomarker-correlator\/js\/libs.js/g' \
  release/biomarker-correlator/js/gdrive.js
rm release/index.html
git add -u release/**
git commit -m "new release"
git push
