const path = require("path");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

// const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    // for caching issues
    // all the files will use this as a template to figure out how to name them:
    filename: "[name].[contenthash].js",
    // publicPath: "/container/latest/"
    // path: path.resolve(__dirname, "../dist"),
    publicPath: path.resolve(__dirname, "../dist"),
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        // marketing: `marketing@${domain}/marketing/remoteEntry.js`,
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
