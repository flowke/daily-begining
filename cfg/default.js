const BabiliPlugin = require("babili-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
let dfPath = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    common: path.resolve(__dirname, '../src/common'),
    components: path.resolve(__dirname, '../src/components'),
    layout: path.resolve(__dirname, '../src/layout'),
    view: path.resolve(__dirname, '../src/view'),
    root: path.resolve(__dirname, '../'),
    semantic: path.resolve(__dirname, '../semantic'),
    reduxes: path.resolve(__dirname, '../src/reduxes'),
    layouts: path.resolve(__dirname, '../src/layouts')
}

let env = process.env.NODE_ENV;

env = env ? env : 'development';

let dfConfig = {
    entry: [
        './src/app.js'
    ],

    output: {
        path: path.resolve(__dirname, '../dist/assets'),
        filename: env === 'production' ? '[name]_[hash:8].js' : 'main.js',
        publicPath: '/assets/'
    },

    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: ['url-loader?limit=8192'],
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/font-woff']
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/octet-stream']
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: ['file-loader']
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=image/svg+xml']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Component: ['react', 'Component'],
            PT: 'prop-types',
            KV: 'react-konva',
            push: ['react-router-redux', 'push']
        }),
        // new OpenBrowser({url: `http://localhost:${9000}`})
    ],
}

module.exports = {
    dfPath,
    dfConfig
};
