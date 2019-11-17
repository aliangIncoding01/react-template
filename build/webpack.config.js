const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// happypack
const HappyPack = require('happypack');
const os = require('os');
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); //启动线程池


module.exports = {
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, '../src/index.js') // 如果不用path就是相对于根目录的路径'./src/index.js'
    ],
    module: {
        rules: [
            // babel-loader
            {
                enforce: 'pre',
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=babel'
            },
            // css-loader
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            // less-loader 'style-loader': 生成<style>标签插入到head里面，'MiniCssExtractPlugin.loader': 压缩提取成单独的css文件，二者选其一
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] // 从后往前的顺序加载,先加载预编译less,转换成css,最后压缩
            },
            // sass-loader
            {
                test: /\.sass|\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            // stylus-loader
            {
                test: /\.styl$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
            },
            // 加载img
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            // 加载字体图标
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        // 清理构建产物
        new CleanWebpackPlugin(),
        // 抽离css
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[name].[hash].css'
        }),
        // js压缩
        // new UglifyJsPlugin({
        //     test: /\.js$/,
        //     exclude: /\/node_modules/,
        //     cache: true,
        //     uglifyOptions: {}
        // }),
        // gzip
        // new CompressionPlugin({
        //     asset: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     test: /\.js$|\.css$/,
        //     threshold: 10240,
        //     minRatio: 0.8
        // }),
        // css压缩
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /(\.css|\.styl)$/,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {safe: true, discardComments: {removeAll: true}},
            canPrint: true
        }),
        // happypack
        new HappyPack({
            // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
            id: 'babel',
            // 如何处理 .js 文件，用法和 Loader 配置中一样
            loaders: [
                {
                    loader: 'babel-loader'
                }
            ],
            threadPool: HappyThreadPool
        }),
        // html压缩
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
            filename: './index.html' // 可定义html输出路径，相对于 output.path 目录
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, '../src')
        }
    }
};