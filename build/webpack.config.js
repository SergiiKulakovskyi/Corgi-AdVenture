const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const project = require('../project.config')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = (file) => inProject(project.srcDir, file)

const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'

const config = {
    entry: {
        main: [
            inProjectSrc(project.main),
        ],
    },
    devtool: project.sourcemaps ? 'source-map' : false,
    output: {
        path: inProject(project.outDir),
        filename: __DEV__ ? '[name].js' : '[name].[chunkhash].js',
        publicPath: project.publicPath,
    },
    resolve: {
        modules: [
            inProject(project.srcDir),
            'node_modules',
        ],
        extensions: ['*', '.js', '.jsx', '.json'],
    },
    externals: project.externals,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(Object.assign({
            'process.env': { NODE_ENV: JSON.stringify(project.env) },
            __DEV__,
            __TEST__,
            __PROD__,
        }, project.globals))
    ]
}

// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
    filename: 'styles/[name].[contenthash].css',
    allChunks: true,
    disable: __DEV__,
})

config.module.rules.push({
    test: /\.(sass|scss)$/,
    loader: extractStyles.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: project.sourcemaps,
                    minimize: {
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions'],
                        },
                        discardComments: {
                            removeAll: true,
                        },
                        discardUnused: false,
                        mergeIdents: false,
                        reduceIdents: false,
                        safe: true,
                        sourcemap: project.sourcemaps,
                    },
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: project.sourcemaps,
                    includePaths: [
                        inProjectSrc('styles'),
                    ],
                },
            }
        ],
    })
})
config.plugins.push(extractStyles)

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
    template: inProjectSrc('index.html'),
    inject: true,
    minify: {
        collapseWhitespace: true,
    },
}))

// Development Tools
// ------------------------------------
if (__DEV__) {
    config.entry.main.push(
        `webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`
    )
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    )
}

// Bundle Splitting
// ------------------------------------
if (!__TEST__) {
    const bundles = ['manifest']

    if (project.vendors && project.vendors.length) {
        bundles.unshift('vendor')
        config.entry.vendor = project.vendors
    }
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ names: bundles }))
}

// Production Optimizations
// ------------------------------------
if (__PROD__) {
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: !!config.devtool,
            comments: false,
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
        })
    )
}

module.exports = config
