'use strict';

const webpack           = require('webpack');<% if (includeDevServer) { %>
const HtmlWebpackPlugin = require('html-webpack-plugin');<% } %>
const util              = require('./util');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: {
        'example': './src/index.ts'
    },

    output: {
        path         : util.fromRoot('dist/lib-umd'),
        publicPath   : '/',
        filename     : '[name].js',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'umd',
        library      : 'fdsg'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test  : /\.ts$/,
                loader: {
                    loader : 'awesome-typescript-loader',
                    options: {
                        declaration: false,
                        sourceMap  : true
                    }
                }
            }
        ]
    }<% if (includeDevServer) { %>,
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ],
    devServer: {
        historyApiFallback: true,
        port              : 8002,
        stats             : 'minimal',
        open              : true,
        proxy             : {
            '/api/*': {
                target: 'http://localhost:8001',
                secure: false
            }
        }
    }<% } %>
};
