module.exports = {
    purge: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                kaios: ['Open Sans'],
            },
            colors: {
                // Base color: #57b1dc
                shakespeare: {
                    50: '#f7fbfd',
                    100: '#eef7fc',
                    200: '#d5ecf6',
                    300: '#bce0f1',
                    400: '#89c8e7',
                    500: '#57b1dc',
                    600: '#4e9fc6',
                    700: '#4185a5',
                    800: '#346a84',
                    900: '#2b576c',
                },
            },
            width: {
                '48px': '48px',
            },
            height: {
                '48px': '48px',
            },
            truncate: {
                lines: {
                    3: '3',
                    5: '5',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('tailwindcss-truncate-multiline')()],
}
