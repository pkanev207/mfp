import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter,
  Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

// marketing means go and get that remote entry file
// we are importing a very generic function and not a React component,
//  because container shouldn't assume that a child
// is using particular framework
// any necessary communication is done with callbacks or simple events
// near zero coupling
// import { mount } from "marketing/MarketingApp";
import Header from "./components/Header.js";
import Progress from "./components/Progress.js";
// import AuthApp from "./components/AuthApp.js";
// import MarketingApp from "./components/MarketingApp.js";
const AuthLazy = lazy(() => import("./components/AuthApp"));
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

// for production only:
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});
// we should use Browser History in the container and Memory history in the sub apps
// and keep all those History objects in sync
// otherwise we can have some nasty bugs due to race conditions -
// different Browser Histories are implemented differently in various libraries

// creating history manually:
const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    // BrowseRouter also creates Browser History object behind the scene
    // When we go to localhost://8080/ we create to separate objects of history - Browser and Memory
    // with initial values stored inside them = '/'. Memory initial store is '/' no matter what
    // Links correspond to the parent router - kind of scoped in nature
    // <BrowserRouter>
    // generic router:
    <Router history={history}>
      {/* in order to generate css classes in a slightly more randomize fashion */}
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <h1>Hi, from the container!</h1>
          <hr />
          <Suspense fallback={<Progress />}>
            <Switch>
              {/* <Route path="/auth" component={AuthLazy} /> */}
              {/* <Route path="/" component={MarketingLazy} /> */}
              {/* Change syntax to pass props */}
              <Route path="/auth">
                <AuthLazy
                  onSignIn={() => {
                    console.log("User signed in");
                    setIsSignedIn(true);
                  }}
                />
              </Route>
              {/* Important: put above marketing because route "/" will be matched first */}
              {/* <Route path="/dashboard" component={DashboardLazy} /> */}
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/">
                <MarketingLazy isSignedIn={isSignedIn} />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
    // </BrowserRouter>
  );
};

// Anytime we are using the same css library into production - chances are they are gonna
// make the same selectors in the different microservices and mix and match them into a style collision

// const history = useHistory();
// const handleGoBack = () => {
//   history.goBack();
// };
