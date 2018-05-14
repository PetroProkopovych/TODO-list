const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        }),
    ],
    resolve: {
        alias: {
            "jquery-ui": "jquery-ui",
            modules: path.join(__dirname, "node_modules"),
        }
    }
};