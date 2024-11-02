const path = require('path');

module.exports = {
  entry: './lib/ReactivityProxy.js',
  devtool: "source-map",
  output: {
    filename: 'reactivity-proxy.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['minify']
            ]
          }
        }
      }
    ]
  }
};