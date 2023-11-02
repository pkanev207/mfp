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
    // tf is that?
    // Browser tries to load this script by taking current domain + path and adding "main.js" onto the end
    // <script src="main.js"></script>
    // we need http://localhost:8082/main.js - Path can be customized by adding a publicPath
    // publicPath: "/container/latest/"
    path: path.resolve(__dirname, "../dist"),
    publicPath: "http://localhost:8080/",
    // if publicPath is never set, scripts are loaded up from the remoteEntry.js file
    // relative to the URL that we loaded remoteEntry.js from!
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        auth: "auth@http://localhost:8082/remoteEntry.js",
        // marketing: `marketing@${domain}/marketing/remoteEntry.js`,
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8083/remoteEntry.js",
      },
      // hence the many loaded js files in the browser
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
