const path = require('path');

module.exports = {
    context: __dirname,
    entry: './javascript/earthquake.js',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '*']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env']
                    }
                },
            },
        ]
    },
    devtool: 'eval-source-map'
};
