const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CSSExtract = new ExtractTextPlugin('styles.[chunkhash].css')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


exports.isVendor = module => /node_modules/.test(module.resource)

exports.loadJs = () => ({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
})

exports.loadStyles = ({pathSrc, options}) => ({
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: options
                        },
                        {
                            loader: 'sass-loader',
                            options: options
                        }
                    ]
                })
            },
        ],
    },
    plugins: [
        CSSExtract
    ]
})

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
})

exports.loadImages = options => ({
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)/,
                use: [
                    {
                        loader: 'url-loader',
                        options,
                    },
                ],
            },
        ],
    },
})

exports.loadImagesFromFolder = () => ({
    plugins: [
        new CopyWebpackPlugin([
            {
                from:'../public/images',
                to:'images'
            }
        ])
    ],
})

exports.minifyJavaScript = () => ({
    plugins: [new UglifyWebpackPlugin({ sourceMap: true })],
})


exports.scopeHoisting = () => ({
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
})

exports.attachRevision = () => ({
    plugins: [
        new webpack.BannerPlugin({
            banner: new GitRevisionPlugin().version(),
        }),
    ],
})

exports.purifyCSS = ({ paths, minimize }) => ({
    plugins: [new PurifyCSSPlugin({
        paths,
        minimize,
        purifyOptions: {
            whitelist: ['*purify*'],
        },
    })],
})
