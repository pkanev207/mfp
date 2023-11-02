const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    //wtf?
    publicPath: "/packages/auth/src/bootstrap.js",
    // publicPath: "/auth/latest/",
  },
  plugins: [
    // although identical with webpack.dev, in future there might be some differences
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: { "./AuthApp": "./src/bootstrap" },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
