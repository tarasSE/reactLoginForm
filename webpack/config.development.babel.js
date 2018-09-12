import webpack from "webpack";
import ServiceWorkerWebpackPlugin from "serviceworker-webpack-plugin";
import writeFilePlugin from "write-file-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import BrowserSyncPlugin from "browser-sync-webpack-plugin";
import WebpackNotifierPlugin from "webpack-notifier";
import path from "path";

const extractCSS = new ExtractTextPlugin('style.css');
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: true
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
    plugins: [
        new ServiceWorkerWebpackPlugin({
            excludes: ['**/*.css'],
            entry: path.join(__dirname, '../src/service-worker.js'),
        }),
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
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                loaders: ['file-loader?hash=sha512&digest=hex&name=content/[hash].[ext]']
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
    }
};
