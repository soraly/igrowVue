var cooking = require('cooking');
var path = require('path');
var dependencies = require('./package.json').dependencies;

var pkg = {};

console.log(dependencies,'dependencies')
Object.keys(dependencies).forEach(function(key) {
    pkg[key] = key;
});
cooking.set({
    entry: './src/src/index.js',
    dist: './dist/',
    clean: false,
    template: false,
    format: 'cjs',
    minimize: false,
    moduleName: 'MINT',
    extractCSS: 'style.css',
    extends: ['vue2', 'saladcss', 'buble'],
    externals: Object.assign({
        vue: 'vue'
    }, pkg),
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.join(__dirname, 'src/src'),
        // 'vueWebuploader': path.resolve(__dirname, 'src/src/utils/webuploader.igrow.js'),
    }
})

cooking.add('output.filename', 'mintlzx.js');
cooking.add('performance.hints', false);
cooking.add('loader.js.exclude', /node_modules|lib/);

module.exports = cooking.resolve()