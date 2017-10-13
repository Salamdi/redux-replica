const path = require('path')

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}