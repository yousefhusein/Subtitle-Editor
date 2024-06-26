module.exports = {
    plugins: [
        require('postcss-import'),
        require('autoprefixer'),
        // Add PurgeCSS plugin and configuration
        require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.jsx'],
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        })
    ]
}
