const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');



module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    context: path.resolve(__dirname, 'src'),
    entry: "./scripts/main.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:3000',
        }
      ],
        port: 8080,
        open: true,
        hot: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets:['@babel/preset-env']
            }
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin ({
        filename: 'index.html',
        template: './index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from:'./assets/images/*.png', to:'assets/images/[name][ext]', },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css', 
      }),
    ],
    optimization: {
      minimize: isProd,
      minimizer: isProd ? [new TerserPlugin()] : [],
    }
  };
}
