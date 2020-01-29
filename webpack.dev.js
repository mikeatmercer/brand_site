const merge = require('webpack-merge'); 
const common = require('./webpack.common.js');
const WORKIP = "10.91.37.19";
const HOMEIP = "10.3.57.245";
const webpack = require("webpack");
module.exports = merge(common, {
    devServer: {
        contentBase: "./src",
        watchContentBase: true,
        host: "0.0.0.0",
        publicPath: `http://${WORKIP}:8080/`,
        sockHost: WORKIP,
        sockPort: "8080",
        disableHostCheck: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
})