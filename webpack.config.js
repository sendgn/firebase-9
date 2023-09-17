const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    // get an absolute path
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // bundle up every time we make a change inside index.js
  watch: true
}
