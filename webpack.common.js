const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')


module.exports = {
  entry: {
    viewer3d: './src/Entrypoint.ts'
  },
  output: {
    filename: 'viewer3d.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'Viewer3D',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs)$/,
        use: {loader: 'ts-shader-loader'}
      },
      {
        test: /\.ts$/,
        use: [ {loader: 'ts-loader' } ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      three: path.resolve('./node_modules/three'),
    },
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts'],
      exclude: ['/node_modules/']
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './assets/viewer3d-static/index.html',
      filename: './index.html',
      inject: 'body',
      scriptLoading: 'blocking'
    }),
    new CopyPlugin({
      patterns: [{
        from: 'assets/viewer3d-static/',
        to: 'assets/viewer3d-static/',
        globOptions: {
          ignore: ['index.html']
        }
      }]
    })
  ]
}