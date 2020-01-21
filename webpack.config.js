const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");

const ENV = process.env.NODE_ENV || 'development';

const WORKIP = "10.91.37.19";
const HOMEIP = ""

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: ENV,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template:"./src/index.ejs"
    }),
    new webpack.DefinePlugin({
      "HOME_URL": JSON.stringify("http://sites.mercer.com/sites/MercerStrategy/SitePages/test%20page.aspx"),
      "SITE_DOMAIN": JSON.stringify("http://sites.mercer.com/sites/MercerStrategy")
    })
  ],
  externals: {
    jquery: 'jQuery'
  },
  module: {
      rules: [
          {
            test: /\.(scss|css)$/,
            use: [
              {loader: "style-loader"},
              {
                  loader: "css-loader",
                  options: {
                      modules: {
                        mode: "local",
                        localIdentName: (ENV == "production") ? '[hash:base64:4]' : '[name]__[local]___[hash:base64:4]'
                      }            
                  }
              },
              {loader: "sass-loader"}
            ]
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, 'src'),
            use: {
              loader: "babel-loader"
            }
          }
      ]
  },
  resolve: {
    "alias": {
        "react": "preact-compat",
        "react-dom": "preact-compat"
      }
  },
  devServer: {
      contentBase: "./src",
      watchContentBase: true,
      host: "0.0.0.0",
      publicPath: "http://10.3.57.245:8080/",
      sockHost: "10.3.57.245",
      sockPort: "8080",
      disableHostCheck: true
  },
  devtool: ENV==='production' ? 'source-map' : 'eval'
};