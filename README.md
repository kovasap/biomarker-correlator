# Biomarker Correlator

We want to make 

## Libraries to use:

 - CSV upload and parsing: https://mrmcc3.github.io/blog/posts/csv-with-clojurescript/
 - Stats: https://github.com/MastodonC/kixi.stats
 - Parallelism: https://github.com/jtkDvlp/cljs-workers

## Development Commands

### Development mode

Run the app:
```
npm install
npx shadow-cljs watch app
```

Run tests (results should appear in the browser at localhost:8021):
```
npx shadow-cljs watch test
```

### Building for production

```
./release.bash
```

This will put all the final artifacts in the "release" directory.
