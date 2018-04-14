const path = require('path')
const merge = require('webpack-merge')
const glob = require('glob')
require('dotenv').config(path.resolve('./.env'))

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const base = require('./base')
const loaders = require('./loaders')

const paths = {
    base: path.resolve('src'),
    app: path.resolve('src/index.js'),
    dist: path.resolve('dist'),
    template: path.resolve('src/index.html'),
    public: path.resolve('public'),
}

const commonConfig = merge([
    {
        target: 'web',
        context: paths.base,
        entry: [
          'react-hot-loader/patch',
          paths.app
        ],
        output: {
            filename: '[name].[hash].js',
            publicPath: '/',
            path: paths.dist,
        },
        resolve: {
            extensions: ['.js'],
        },
        mode: process.env.NODE_ENV,
        plugins: [
            new HtmlWebpackPlugin({
                template: paths.template,
            }),
            new CaseSensitivePathsPlugin(),
        ],
    },

    base.cleanup(paths.dist),

    loaders.loadStyles({
        pathSrc: paths.base,
        options: {
            sourceMap: true
        }
    }),

    loaders.loadFonts({
        options: {
            name: 'fonts/[name].[ext]',
        },
    }),

    loaders.loadJs(),

    loaders.loadImages({
        limit: 8192,
        name: 'images/[name].[ext]'
    }),
    loaders.loadImagesFromFolder()
])

const developmentConfig = merge([
    base.sourceMaps('cheap-module-source-map'),
    base.devServer({host: process.env.HOST, port: process.env.PORT, hot: !!process.env.HOT})
])

const productionConfig = merge([
    base.sourceMaps('source-map'),

    loaders.minifyJavaScript(),

    loaders.purifyCSS({
        paths: glob.sync(`${paths.base}/**/*.js?(x)`, { nodir: true }),
        minimize: true,
    }),

    loaders.scopeHoisting(),
    // loaders.attachRevision(),
])

module.exports = () => {
    const config = merge(commonConfig, process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig);

    return config;
}
