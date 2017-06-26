const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {dfPath, dfConfig } = require('./default.js');
const OpenBrowser = require('open-browser-webpack-plugin');

console.log(process.env.NODE_ENV);

let config = Object.assign({}, dfConfig, {

    devServer: {
        publicPath: '/assets/',
        hot: true
    },

    plugins: [ ...dfConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html'
        }),
    
        new webpack.NoEmitOnErrorsPlugin()
        // new OpenBrowser({url: `http://localhost:${9000}`})
    ],

    resolve: {
        modules: [
            path.resolve(__dirname, '../node_modules'),
            dfPath.src,
            dfPath.common,
            dfPath.components,
            dfPath.layout,
            dfPath.view,
            dfPath.root
        ]
    },
    devtool: 'eval-source-map'

});


config.module.rules.push(
    // {
    //     test: /\.js$/,
    //     use: ['eslint-loader'],
    //     enforce: 'pre',
    //     include:[
    //         dfPath.src
    //     ]
    // },
    {
        test: /\.js$/,
        use: ['babel-loader'],
        include:[
            dfPath.src,
            dfPath.semantic
        ]
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    module: false,
                    localIdentName: '[local]--[hash:base64:6]'
                }
            },
            {
                loader: 'sass-loader'
            }
        ],
        include: [dfPath.common, 'node_modules']
    },
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    module: true,
                    localIdentName: '[local]--[hash:base64:6]'
                }
            },
            {
                loader: 'sass-loader'
            }
        ],
        include: [dfPath.src],
        exclude: [dfPath.common],

    }
);

module.exports = config;
