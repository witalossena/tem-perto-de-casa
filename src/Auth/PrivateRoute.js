import React, { useContext } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import shopcontext from "../context/ShopContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  let history = useHistory();
  const { user } = useContext(shopcontext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : history.push("/login")
      }
    />
  );
}
