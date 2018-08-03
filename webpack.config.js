const path = require('path');

const react = {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, '/src/components/ClientApp.jsx'),
  output: {
    path: path.join(__dirname, '/public/js'),
    filename: 'bundle.js',
      //filename: 'bundle.[chunkhash].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = react;
