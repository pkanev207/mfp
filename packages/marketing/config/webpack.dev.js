const { merge } = require("webpack-merge");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    // historyApiFallback: true,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    // new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new ModuleFederationPlugin({
      // Webpack is gonna declare a global variable with that name
      name: "marketing",
      filename: "remoteEntry.js",
      // designate which file we want to make available to the outside world
      exposes: {
        // whenever someone asks for this - we give him that... bootstrap.js
        "./MarketingApp": "./src/bootstrap",
      },
      // shared: ["react", "react-dom"],
      shared: packageJson.dependencies,
    }),
  ],
};
// devConfig is gonna to override or take priority over similar set ups
// in the commonConfig, because it comes second
module.exports = merge(commonConfig, devConfig);

// React debounce search - useEffect - with search value, as dependency,
// when changed - cancel the previous and trigger a new one
