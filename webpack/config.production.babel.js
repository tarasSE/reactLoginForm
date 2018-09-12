import webpack from "webpack";
import path from "path";
import glob from "glob";
import ServiceWorkerWebpackPlugin from "serviceworker-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import PurifyCSSPlugin from "purifycss-webpack";
import StylesInjectPlugin from "./plugins/StylesInjectPlugin";
import PerformancePlugin from "./plugins/PerformancePlugin";

const cssFileName = 'style-[hash].css';
const extractCSS = new ExtractTextPlugin(cssFileName);
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
        new PerformancePlugin(),
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