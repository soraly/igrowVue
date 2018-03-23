var path = require('path')
var webpack = require('webpack')
var nested = require('postcss-nested');
var cssnext = require('postcss-cssnext');
var flexFallback = require('postcss-flex-fallback');
var cssimport = require('postcss-import')
var salad = require('postcss-salad')
module.exports = {
    entry: './src/src/index.js',
    output: {
        path: path.resolve(__dirname, '/dist'),
        // publicPath: '/dist/',
        filename: 'dist2copy.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    //postcss: [cssimport(),cssnext()],
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    },
                    // other vue-loader options go here
                }
            },
            {
                test: /\.css/,
                //use: [ 'css-loader','style-loader'],
                loader: 'style-loader!css-loader!postcss-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/,'src/src/utils/webuploader.igrow.js']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, 'src/src'),
            'vueWebuploader': path.resolve(__dirname, '../src/src/utils/webuploader.igrow.js'),
        }
    },
    devServer: {
        host: "192.168.1.109",
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        port: '4567',
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
