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
                16: '16px',
                20: '20px',
                24: '24px',
                32: '32px',
                48: '48px',
            },
            minWidth: {
                0: '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                full: '100%',
            },
            height: {
                16: '16px',
                20: '20px',
                24: '24px',
                32: '32px',
                48: '48px',
            },
            boxShadow: {
                DEFAULT:
                    '0 1px 3px 0 rgba(0, 0, 0, 0.32), 0 1px 2px 0 rgba(0, 0, 0, 0.24)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
