const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

// 需要path.resolve方法返回绝对路径，使用到path的时候才不会报错
const appSrc = path.resolve(__dirname, '../src');
const appDist = path.resolve(__dirname, '../dist');
const appPublic = path.resolve(__dirname, '../public');
const appIndex = path.resolve(appSrc, 'index.js');
const appHtml = path.resolve(appPublic, 'index.html');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development', // 开发模式
  entry: appIndex,
  output: {
    filename: 'public/js/[name].[hash:8].js',
    path: appDist,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appHtml,
      filename: 'index.html',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserWebpackPlugin({
      url: 'http://localhost:3227/'
    }),
  ],
  resolve: {
    alias: {
      src: appSrc,
      utils: path.resolve(__dirname, '/src/utils'),
      pages: path.resolve(__dirname, '/src/pages'),
      components: path.resolve(__dirname, '../src/components'),
    },
    // 强制只从项目的 node_modules 中查找模块
    modules: [path.resolve(__dirname, '../node_modules')],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader?cacheDirectory',
        include: [ appSrc ],
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader'
        },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local].[hash:8]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      // 解析图片资源
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      // 解析 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      // 解析数据资源
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      // 解析数据资源
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },
      // 解析 MakeDown 文件
      {
        test: /\.md$/,
        use: [
          'html-loader',
          'markdown-loader'
        ]
      }
    ],
  },
  devServer: {
    contentBase: appPublic,
    hot: true,
    host: 'localhost',
    port: 3227,
    // 是否将错误显示在浏览器蒙层
    overlay: true,
    inline: true,
    // 仅打印错误信息
    stats: 'errors-only',
    // 设置代理
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'https://www.easy-mock.com/project/5ce14be8b98ae54df02ce8a8',
        pathRewrite: {
          '^/api/': '/',
        },
      },
    },
  },
  devtool: 'inline-source-map', // 在报错的时候形成资源映射，快速定位错误
};
