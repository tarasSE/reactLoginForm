const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const extractCSS = new ExtractTextPlugin('style-[hash].css');
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    chunksSortMode: 'dependency',
    inject: 'body'
});

module.exports = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle-[hash].js'
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    plugins: [
        extractCSS,
        htmlPlugin,
        new CopyWebpackPlugin([
            {from: './src/content/favicon.ico', to: './content/favicon.ico'},
            {from: './src/content/manifest.json', to: './content/manifest.json'},
            {from: './src/registerServiceWorker.js', to: './registerServiceWorker.js'},
            {from: './src/service-worker.js', to: './service-worker.js'},
        ]),
        new PurifyCSSPlugin({
            purifyOptions: {minify: true},
            paths: glob.sync(path.join(__dirname, '../src/**/*.css')),
        })
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