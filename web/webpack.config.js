const path = require("path");

module.exports = {
  entry: "./index.ts",
  mode: "development",
  devServer: {
    // port: 9900,
    // client: {
    //   overlay: {
    //     errors: true,
    //     warnings: false,
    //   },
    // },

    static: {
      directory: path.join(__dirname, ""),
    },
    devMiddleware: {
      writeToDisk: (filePath) => {
        return !/\.hot-update.*$/.test(filePath);
      },
    },
  },

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
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
