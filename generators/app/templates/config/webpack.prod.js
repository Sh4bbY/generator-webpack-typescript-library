'use strict';

const webpack = require('webpack');
const util    = require('./util');

module.exports = {
    devtool: 'source-map',

    entry: {
        'formatter'    : './src/index.ts',
        'formatter.min': './src/index.ts'
    },

    output: {
        path          : util.fromRoot('dist/lib-umd'),
        filename      : '[name].js',
        libraryTarget : 'umd',
        library       : 'fdsg',
        umdNamedDefine: true
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
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true, include: /\.min\.js/}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|de|fr/)
    ]
};
