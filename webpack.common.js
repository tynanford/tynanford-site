const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/modules/index.js',
    about: './src/modules/about.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production',
      chunks: ['index'],
      template: './src/template.html'
    }),
    new HtmlWebpackPlugin({
      title: 'About',
      chunks: ['about'],
      filename: 'about.html',
      template: './src/template.html'
    })
  ],
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
