import React from "react";
import ReactDOM from "react-dom";
// React-router-dom eternally uses npm history library:
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory || createMemoryHistory({ initialEntries: [initialPath] });

  if (onNavigate) {
    // build in method in the history object, will call whatever function we provide,
    // whenever the url changes - we want to call that cb
    history.listen(onNavigate);
  }  

  ReactDOM.render(<App history={history} />, el);
  // to have some kind of communication from our container - object with cbs
  return {
    // whenever the parent navigates - we want to call a function
    onParentNavigate(location) {
      console.log("The Container is navigating: ", location);
      const { pathname: nextPathname } = location;
      const { pathname: currentPath } = history.location;

      if (currentPath !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    // ot avoid undefined error
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}
// If we are running through container and we should export the mount function
export { mount };
