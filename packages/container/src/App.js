import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
// marketing means go and get that remote entry file
// we are importing a very generic function and not a React component,
//  because container shouldn't assume that a child
// is using particular framework
// any necessary communication is done with callbacks or simple events
// near zero coupling
// import { mount } from "marketing/MarketingApp";
import MarketingApp from "./components/marketingApp.js";
import Header from "./components/Header.js";
// for production only:
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  return (
    <BrowserRouter generateClassName={generateClassName}>
      <StylesProvider>
        <div>
          <Header />
          <h1>Hi, from the container!</h1>
          <hr />
          <MarketingApp />
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};

// Anytime we are using the same css library into production - chances are they are gonna
// make the same selectors in the different microservices and mix and match them into a style collision
