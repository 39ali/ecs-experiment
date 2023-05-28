const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const is_webgl = process.env.webgl ? true : false;

module.exports = {
  entry: "./index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "./lib/mylib"),
      outDir: "./../../pkg",
      extraArgs: is_webgl ? "-- --features webgl" : "-- --features webgpu",
    }),

    // Have this example work in Edge which doesn't ship `TextEncoder` or
    // `TextDecoder` at this time.
    new webpack.ProvidePlugin({
      TextDecoder: ["text-encoding", "TextDecoder"],
      TextEncoder: ["text-encoding", "TextEncoder"],
    }),
  ],
  //   mode: "development",
  experiments: {
    asyncWebAssembly: true,
  },

  //   devServer: {
  //     // static: {
  //     //   directory: path.join(__dirname, ""),
  //     // },
  //     devMiddleware: {
  //       writeToDisk: (filePath) => {
  //         return !/\.hot-update.*$/.test(filePath);
  //       },
  //     },
  //   },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
