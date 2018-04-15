const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')

exports.devServer = ({host, port}, hotReload) => ({
    devServer: {
        stats: 'errors-only',
        host,
        port,
        hot: hotReload,
        historyApiFallback: true,
        overlay: {
            errors: true,
            warnings: true,
        },
    },
    plugins: [
        ... hotReload ? [new webpack.HotModuleReplacementPlugin()] : [],
        new webpack.DefinePlugin({
            'process.env.HOT_RELOAD': hotReload
        }),
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
