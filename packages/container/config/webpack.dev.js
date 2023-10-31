const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // this name never actually gets used for anything
      name: "container",
      remotes: {
        // if we write import statement inside our container
        // and ask for something called "marketing" - it will be on that remote entry file
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      // If we want to be specific about the versions and the exact modules - we don't use this shortcut
      // with package.json, instead we write each one
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
