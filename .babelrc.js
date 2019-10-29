module.exports = {
    presets: [ 'next/babel' ],
    plugins: [
        'inline-react-svg',
        [
            'module-resolver',
            {
                'root': ['.'],
                'alias': {
                    'resources': './src/resources',
                    'constants': './src/constants',
                    'helpers': './src/helpers'
                }
            }
        ]
    ]
}