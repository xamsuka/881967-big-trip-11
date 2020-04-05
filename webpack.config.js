const path = require('path');

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
  }
};
