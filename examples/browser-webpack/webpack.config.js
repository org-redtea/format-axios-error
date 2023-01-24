module.exports = {
  resolve: {
    extensions: ['*', '.js'],
  },
  entry: './example.js',
  // Webpack now produces builds that are incompatible with IE11:
  // https://webpack.js.org/migrate/5/#turn-off-es2015-syntax-in-runtime-code-if-necessary
  target: ['web', 'es5'],
  mode: 'production',
};
