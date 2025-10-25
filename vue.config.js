// vue.config.js
// eslint-disable-next-line no-undef
module.exports = {
    // eslint-disable-next-line no-undef
    publicPath:process.env.NODE_ENV === 'production'
        ? '/Post-it'
        : '/'
}