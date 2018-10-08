const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/modules/index.js',
    adventures: './src/modules/adventure.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Tynan Ford | Software Developer',
      chunks: ['index'],
      template: './src/views/template.pug',
      favicon: './src/logo.png',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Adventures',
      chunks: ['adventures'],
      filename: 'adventures.html',
      template: './src/adventure.html',
      favicon: './src/logo.png'
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
              pretty: true,
              data: {
                test: 'asdf'
              }
            }
          } 
        ]
      }
    ]
  }
};

node: {
  fs: 'empty'
}
