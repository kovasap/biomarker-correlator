const webpack = require("webpack");

module.exports = {
  plugins: [
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
          process: 'process/browser',
      }),
  ],
  resolve: {
    alias: {
      // https://github.com/adazzle/react-data-grid/issues/2787#issuecomment-1024239953
      "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
      "react/jsx-runtime": "react/jsx-runtime.js",
      "csv-parse/lib/sync": "csv-parse/sync",
      "csv-stringify/lib/sync": "csv-stringify/sync",
    },
    fallback: {
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
    },
  },
}
