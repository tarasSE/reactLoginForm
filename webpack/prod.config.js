const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const cssFileName = 'style-[hash].css';
const extractCSS = new ExtractTextPlugin(cssFileName);
const StylesInjectPlugin = require('./plugins/StylesInjectPlugin');
const PerformancePlugin = require('./plugins/PerformancePlugin');
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: true
});

module.exports = {
    mode: 'production',
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle-[hash].js'
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    plugins: [
        new ServiceWorkerWebpackPlugin({
            excludes: ['**/*.css'],
            entry: path.join(__dirname, '../src/service-worker.js'),
        }),
        extractCSS,
        new PurifyCSSPlugin({
            purifyOptions: {minify: true},
            paths: glob.sync(path.join(__dirname, '../src/**/*.css')),
        }),
        new CopyWebpackPlugin([
            {from: './src/content/favicon.ico', to: './content/favicon.ico'},
            {from: './src/content/manifest.json', to: './content/manifest.json'},
        ]),
        htmlPlugin,
        new StylesInjectPlugin(),
        new PerformancePlugin()
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: true,
                        collapseWhitespace: true
                    }
                }],
            },
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
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: true,
                                import: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                loaders: ['file-loader?hash=sha512&digest=hex&name=content/[hash].[ext]']
            }
        ]
    }
};