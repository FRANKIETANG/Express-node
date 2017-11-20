const path = require('path'),
  webpack = require('webpack')

module.exports = {
  entry: './src/js/app/index.js',
  output: {
    filename: './public/js/index.js'
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: ["style-loader", "css-loader", "less-loader"]
    }]
  },
  resolve: {
    alias: {
      mod: path.resolve(__dirname, './js/mod/'),
      jquery: path.resolve(__dirname, './js/lib/jquery-3.2.1.min.js'),
      less: path.resolve(__dirname, './less')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ]
};