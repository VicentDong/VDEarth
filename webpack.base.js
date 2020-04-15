const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'VDTimeline.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'VDTimeline',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsPlugin(),
    // new copyWebpackPlugin([
    //   {
    //     from: __dirname + '/src/fonts', //打包的静态资源目录地址
    //     to: './fonts', //打包到dist下面的public
    //   },
    //   {
    //     from: __dirname + '/src/data', //打包的静态资源目录地址
    //     to: './data', //打包到dist下面的public
    //   },
    //   {
    //     from: __dirname + '/src/icons', //打包的静态资源目录地址
    //     to: './icons', //打包到dist下面的public
    //   },
    // ]),
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|gif|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: './',
          },
        },
      },
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },

      // {
      //   test: /\.(jsx|js)$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
};
