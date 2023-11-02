import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { mount } from "auth/AuthApp";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: (location) => {
        console.log("The Container noticed navigation in Marketing:", location);
        const { pathname: nextPathname } = location;
        const { pathname: currentPath } = history.location;

        if (currentPath !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
      // onSignIn: () => {
      //   console.log("User signed in");
      //   // change the name:
      //   onSignIn();
      // },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
