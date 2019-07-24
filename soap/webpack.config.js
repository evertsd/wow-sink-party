const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  mode: 'production',
  target: 'node',
  // entry: slsw.lib.entry,
  entry: {
    getParty: './src/lambdas/getParty.ts'
  },
  externals: {
    'firebase-admin': 'commonjs firebase-admin'
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
    // path: path.resolve(__dirname, 'lambdas/bundles'),
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name]/index.js',
    libraryTarget: 'commonjs'
  }
};
