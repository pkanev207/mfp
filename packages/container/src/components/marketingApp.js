import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";
// we can use this approach with any other framework
// as long as this framework can render arbitrary HTML element

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  });

  return <div ref={ref} />;
};
