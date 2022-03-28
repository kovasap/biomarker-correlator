# Biomarker Correlator

## Purpose

The purpose of this tool is to (1) make it easier for individuals to find
correlations between metrics about themselves, and (2) motivate individuals to
do whatever manual work is necessary to keep up their personal tracking. The
motivation piece could come from the pleasure of interacting with this tool
and/or the habit-changing insights that it might produce for a given person.

In the context of a user's greater quantified self efforts, this tool would
consume data from a user's personal data storage system and present them with
visualizations.  For me, this personal data storage system is sheets in my
Google Drive, but for others it may be different. In this sense, this tool is
similar to my other project https://github.com/kovasap/autojournal. See
https://kovasap.github.io/docs/health-and-longevity/tracking-health/ for more
context here.

## TODOs

 - Pull in data from momentodb spreadsheets
 - Create aggregation system that can take timeseries data and turn it into
   periods of time which can be used as individual data points for
   correlations.
    - It would be really cool if we could use time of day as part of this
      correlation somehow. For example, running between 5-7pm is associated
      with some biomarker, but running between 8-9am is not.
 - Use hazard ratios and progression of biomarkers over time to try to come up
   with a "years of life saved" if a certain biomarker is made optimal.
 - Add an embedded youtube video explaining overview of process.
 - Add "Time" as a new input field derived from the date range to track how
   different biomarkers track through time (perhaps independently of any other
   input).
 - Add a new aggregation function that weights the importance of each biomarker
   by its contribution to Levine's age calculator.
 - Add air quality and weather data, ideally pulled from an API automatically.
   - Weather data could come from
     https://www.visualcrossing.com/weather/weather-data-services
   - See https://www.reddit.com/r/datasets/comments/t4tyan/historical_weather_and_air_quality_api_andor_bulk/

 - Add more ACM datasets:

   ```
Hi Kovas, in the study below, I'd use the ACM plots for UK Biobank (Figure 4), but not the other study, as the Biobank study sample size is 23x larger. Uric acid, albumin, BUN, alkaline phosphatase are of relevance.

https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0241558

MCV: https://pubmed.ncbi.nlm.nih.gov/26630695/

Hemoglobin: https://pubmed.ncbi.nlm.nih.gov/29378732/
   ```

## Libraries to use:

 - CSV upload and parsing: https://mrmcc3.github.io/blog/posts/csv-with-clojurescript/
 - Stats: https://github.com/MastodonC/kixi.stats
 - Parallelism: https://github.com/jtkDvlp/cljs-workers
 - CSS: https://github.com/noprompt/garden

## Useful documentation

### Data Extraction from Papers

Use [tabula](https://github.com/tabulapdf/tabula#other-platforms-eg-linux),
then copy paste the result and format using vim with
https://github.com/mechatroner/rainbow_csv!

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
