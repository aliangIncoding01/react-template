const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../output/'), // 输出构建产物目录
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all',
            minChunks: 1,
            minSize: 0,
            maxInitialRequests: 5,
            maxAsyncRequests: 5,
            cacheGroups: {
                // 打包第三方文件
                vendor: {
                    test: /node_modules/,
                    chunks: 'all',
                    name: 'vendor',
                    priority: -10,
                    enforce: true
                },
                // 打包公共库文件
                common: {
                    test: /common\/|lib\//,
                    chunks: 'all',
                    name: 'common',
                    priority: -20,
                    enforce: true
                }
            }
        }
    }
});