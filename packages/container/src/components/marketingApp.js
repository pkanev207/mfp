import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { mount } from "marketing/MarketingApp";
// we can use this approach with any other framework
// as long as this framework can render arbitrary HTML element

export default () => {
  const ref = useRef(null);
  // A copy of the Browser history:
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // argument 'location' will come from the history.listen function
      // this comes from our memory history inside marketing to the container
      onNavigate: (location) => {
        console.log("The Container noticed navigation in Marketing:", location);
        const { pathname: nextPathname } = location;
        const { pathname: currentPath } = history.location;
        // to prevent infinite loop
        if (currentPath !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
