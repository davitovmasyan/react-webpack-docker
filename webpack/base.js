const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')

exports.devServer = ({host, port, hot} = {}) => ({
    devServer: {
        stats: 'errors-only',
        host,
        port,
        hot,
        historyApiFallback: true,
        overlay: {
            errors: true,
            warnings: true,
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
})

exports.cleanup = paths => ({
    plugins: [
        new CleanWebpackPlugin(paths, {root: process.cwd(), verbose: false}),
    ],
})

exports.sourceMaps = method => ({
    devtool: method,
})

exports.minifyJavaScript = () => ({
    plugins: [new UglifyWebpackPlugin({sourceMap: true})],
})
