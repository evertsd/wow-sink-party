const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    getParty: './src/lambdas/getParty.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  output: {
    path: path.resolve(__dirname, 'lambdas/bundles'),
    filename: '[name]/index.js',
    libraryTarget: 'umd'
  }
};
