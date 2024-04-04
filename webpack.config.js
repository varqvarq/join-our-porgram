const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: "./scripts/main.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, './dist'),
      clean: true,
    },

    devtool: 'inline-source-map',
    devServer: {
      
      static: {
        directory: path.join(__dirname, './dist'),
      },
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:3000',
          pathRewrite: { '^/api': '' },
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
        {
          test: /\.(png|svg|jpg|jpeg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        }   
      ],
    },
    plugins: [
      new HtmlWebpackPlugin ({
        filename: 'index.html',
        template: './index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: path.resolve(__dirname, 'src/assets/images/'),
          to: path.resolve(__dirname, 'dist/assets/images')
        }]
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css', 
      }),
    ],
    optimization: {
      minimize: isProd,
      minimizer: [
        `...`,
        new TerserPlugin(),
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                [ 'mozjpeg', {progressive: true}]
              ],
            },
          },
        }),
        // new ImageminWebpWebpackPlugin(),
      ]
    }
  };
}
