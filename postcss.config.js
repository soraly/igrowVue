module.exports = {
    // parser: 'sugarss',
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {},
        'precss': {},
        'postcss-salad': {},
        'postcss-pxtorem': {
            rootValue: 50,
            unitPrecision: 2,
            propList: ['*','!font*'],
        }
    }
}