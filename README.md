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

## Design

1. Input: List of events; each row has a timestamp and some data
1. Matching: Pair event data into single row
1. Splitting: determine what should be correlated with what
1. Input: Two files of matched events (inputs and biomarkers)
1. Aggregation: Determine how matched rows should be averaged together (and
   given the same time point) before correlation.
1. Correlation: Calculate pairwise correlations between every input and every
   biomarker.

## TODOs

 - Add timeline visualization. Candidates:
   - https://github.com/netzwerg/react-svg-timeline
     - See https://github.com/netzwerg/react-svg-timeline/issues/90
   - https://github.com/onejgordon/react-life-timeline
   - plotly like my CGM visualization
     - https://nextjournal.com/btowers/using-plotly-with-clojure
   - See https://mobile.twitter.com/timelinize for inspiration
 - Pull in data from momentodb spreadsheets
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

## To Implement: Time Based Customizable Aggregation

Currently, the tool requires you to feed aggregated data (e.g. total or daily
average over 2 months). If you instead could feed it raw data (e.g. every data
point is associated with an exact timestamp, like "ate 1 orange at 1/1/21
1:00PM"), and tell the tool to aggregate on a 2 month, 1 month, 5 day, etc.
basis, that might lead to discovering more interesting correlations! This might
also automate some aggregation work that would have to be done anyway outside
of the tool. For instance, if you are using cronometer to track food intake,
you could feed the tool an exact export and let it do the aggregation for you.

## To Implement: Time Shifting

Lots of correlations between variables exist that are not directly matched up
in a timeseries. For instance, if you were to track your caffeine consumption
and energy level on an hourly basis, there may be no correlation between the
two if you are comparing data points for that hour. However, if you instead
compare caffeine consumption with energy level for the **next** hour, you may
see a different signal. You could keep shifting hour by hour to see what shifts
lead to statistically significant correlations.

```
Time Var1 Time Var2       Time Var1 Time Var2
1pm     5  1pm   10       1pm     5  2pm   20
2pm     2  2pm   20       2pm     2  3pm   10
3pm     2  3pm   10  -->  3pm     2  4pm   10
4pm     2  4pm   10       4pm     2  5pm   10
5pm     2  5pm   10       5pm     2  6pm   10

```

This could be done on any time basis. For example, calories consumed and weight
are correlated, but with some lag. Using this technique (say with daily data)
would let you discover exactly how much lag there is.

## To Implement: Time of Day Correlations

We could use time of day as an explicit input variable in our correlations,
modifying an existing variable. This would let us for example discover that
running between 5-7pm is associated with some biomarker, but running between
8-9am is not. I'm not sure exactly the best way to do this yet.

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

### Malli (schema checking)

 - https://github.com/metosin/malli
 - https://github.com/metosin/malli/blob/master/docs/clojurescript-function-instrumentation.md

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
