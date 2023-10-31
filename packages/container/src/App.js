import React from "react";
// marketing means go and get that remote entry file
// we are importing a very generic function and not a React component,
//  because container shouldn't assume that a child
// is using particular framework
// any necessary communication is done with callbacks or simple events
// near zero coupling
// import { mount } from "marketing/MarketingApp";
import MarketingApp from "./components/marketingApp.js";

export default () => {
  return (
    <div>
      <h1>Hi, from the container!</h1>
      <hr />
      <MarketingApp />
    </div>
  );
};
