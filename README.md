# Biomarker Correlator

We want to make 

## Libraries to use:

 - CSV upload and parsing: https://mrmcc3.github.io/blog/posts/csv-with-clojurescript/
 - Stats: https://github.com/MastodonC/kixi.stats
 - Parallelism: https://github.com/jtkDvlp/cljs-workers
 - CSS: https://github.com/noprompt/garden

## Useful documentation

### React/Reagent

 - https://purelyfunctional.tv/guide/reagent/
 - https://github.com/reagent-project/reagent#examples
 - https://github.com/reagent-project/reagent/blob/master/doc/CreatingReagentComponents.md

### Spec

 - https://github.com/metosin/spec-tools/blob/master/docs/02_data_specs.md
 - https://github.com/gnl/ghostwheel
 - Tutorial: https://www.youtube.com/watch?v=5OuOnJXLxVE

### Stats

 - https://cljdoc.org/d/kixi/stats/0.5.4/doc/readme
 - https://github.com/MastodonC/kixi.stats/blob/master/src/kixi/stats/core.cljc

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
