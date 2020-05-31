const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
// const moment = require(`moment`);
// require('moment-precise-range-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new MomentLocalesPlugin({
        localesToKeep: ['es-us'],
    }),
  ],
};
