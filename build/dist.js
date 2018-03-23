const path = require('path');

module.exports = {
    entry: './src/src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/dist/',
        libraryTarget: "commonjs",
        filename: 'buildlzx2.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
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
}

// if (process.env.NODE_ENV === 'production') {
//     module.exports.devtool = '#source-map'
//     // http://vue-loader.vuejs.org/en/workflow/production.html
//     module.exports.plugins = (module.exports.plugins || []).concat([
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: '"production"'
//             }
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             sourceMap: true,
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.LoaderOptionsPlugin({
//             minimize: true
//         })
//     ])
// }


// var cooking = require('cooking');
// var config = require('./config');
//
// cooking.set({
//     entry: './src/index.js',
//     dist: './lib/',
//     clean: false,
//     template: false,
//     format: 'cjs',
//     minimize: false,
//     moduleName: 'MINT',
//     extractCSS: 'style.css',
//     extends: ['vue2', 'saladcss', 'buble'],
//     alias: config.alias,
//     externals: config.pkg
// });
//
// cooking.remove('output.publicPath');
// cooking.add('output.filename', 'mint-ui.common.js');
// cooking.add('performance.hints', false);
// cooking.add('loader.js.exclude', config.jsexclude);
//
// module.exports = cooking.resolve();