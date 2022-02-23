# Biomarker Correlator

## TODOs

 - Add an embedded youtube video explaining overview of process.
 - Add "Time" as a new input field derived from the date range to track how
   different biomarkers track through time (perhaps independently of any other
   input).
 - Add a new aggregation function that weights the importance of each biomarker
   by its contribution to Levine's age calculator.

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
 - https://github.com/reagent-project/reagent/blob/master/doc/InteropWithReact.md#creating-reagent-components-from-react-components

### Spec

 - https://github.com/metosin/spec-tools/blob/master/docs/02_data_specs.md
 - https://github.com/gnl/ghostwheel
 - Tutorial: https://www.youtube.com/watch?v=5OuOnJXLxVE

To use print statements `(prn)` in a ghostwheel `>defn`, you need to add 
`{::g/ignore-fx true}` right after the function docstring to avoid
"side-effect" errors.


### Stats

 - https://cljdoc.org/d/kixi/stats/0.5.4/doc/readme
 - https://github.com/MastodonC/kixi.stats/blob/master/src/kixi/stats/core.cljc

## Development Commands

### Development mode

Run the app:
```
npm install
clj -A:shadow-cljs watch app
npx webpack --entry ./target/index.js --output-path public/js/libs.js
clj -A:shadow-cljs watch app
```

Webpack is used because of https://github.com/thheller/shadow-cljs/issues/981

Run tests (results should appear in the browser at localhost:8021):
```
clj -A:shadow-cljs watch test
```

### Building for production

```
./release.bash
```

This will put all the final artifacts in the "release" directory.
