const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

const extractCSS = new ExtractTextPlugin('style.css');
const htmlPlugin = new HtmlWebpackPlugin({
    template: './public/index.html',
    chunksSortMode: 'dependency',
    inject: 'body'
});

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: [
        'react-hot-loader/patch', './src/index'
    ],
    resolve: {
        extensions: ['.jsx', '.js']
    },
    output: {
        path: path.resolve(__dirname, '../dev-build'),
        filename: 'bundle.js',
        chunkFilename: 'chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['@babel/preset-env', {useBuiltIns: 'entry'}],
                        '@babel/preset-react'
                    ],
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        stats: {
            children: false
        },
        hot: true,
        contentBase: '../dev-build',
        watchOptions: {
            ignored: /node_modules/
        }
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9000,
            proxy: {
                target: 'http://localhost:9060'
            }
        }, {
            reload: false
        }),
        htmlPlugin,
        extractCSS,
        new writeFilePlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackNotifierPlugin({
            title: 'Login form'
        })
    ]
};
