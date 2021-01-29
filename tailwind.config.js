module.exports = {
    purge: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                kaios: ['Open Sans'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
