const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractCSS = new ExtractTextPlugin('style.css');
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    chunksSortMode: 'dependency',
    inject: 'body'
});

module.exports = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    plugins: [
        extractCSS,
        htmlPlugin,
        new CopyWebpackPlugin([
            { from: './src/content/favicon.ico', to: './content/favicon.ico' },
            { from: './src/content/manifest.json', to: './content/manifest.json' },
        ]),
    ],
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
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: true,
                                import: true,
                                minimize: true
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