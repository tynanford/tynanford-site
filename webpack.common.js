const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/js/index.js',
    adventures: './src/js/adventure.js'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new HtmlWebpackPlugin({
      title: 'Tynan Ford | Software Developer',
      chunks: ['index'],
      template: './src/views/index.pug',
      filename: 'index.html',
      data: {
        main: require('./src/content/index.json')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Adventures',
      chunks: ['adventures'],
      filename: 'adventures.html',
      template: './src/views/adventure.pug',
      data: {
        main: require('./src/content/adventure-page.json'),
        multiPic: require('./src/content/adventure/multi-pic-location.json'),
        singlePic: require('./src/content/adventure/single-pic-location.json')
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  output: {
    filename: 'js/[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
      test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            query: {
              pretty: true
            }
          } 
        ]
      }
    ]
  }
};
