import React from "react";
import { Switch, Route, BrowserRouter, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import SignIn from "./components/Signin.js";
import SignUp from "./components/Signup.js";

const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

export default ({ history }) => {
  return (
    <div>
      {/* we should replace Browser History with Memory History - just Router */}
      <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
          <Switch>
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />
          </Switch>
        </StylesProvider>
      </Router>
    </div>
  );
};
