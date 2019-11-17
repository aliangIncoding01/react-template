const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
    mode: 'development', // 定义环境
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        publicPath: '/',
        contentBase: path.resolve(__dirname, 'src'),
        historyApiFallback: true,
        // 允许开发服务器访问本地服务器的包JSON文件，防止跨域
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        open: true // 自动打开页面
    },
    plugins: [
        // 打包全局常量
        new webpack.DefinePlugin({
            _ENV_: JSON.stringify('dev')
        })
    ]
});