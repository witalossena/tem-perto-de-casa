import React, { useContext, useEffect, Fragment } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core";

import PrivateRoute from "./Auth/PrivateRoute";
import shopcontext from "./context/ShopContext";

import {
  SignUp,
  SignIn,
  PasswordRecover,
  Dashboard,
  NoMatch,
  Footer,
} from "./import_index";

import MenuNav from "./Components/Toolbar";
import SingleProduct from "./Components/shop/productSingle";
import Shop from "./Components/shop";

import Category from "./Components/shop/categories/category";

const useStyles = makeStyles((theme) => ({
  AppmarginTop: {
    marginTop: "150px",
    height: "800px",  
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
    },
  },
}));

function App() {
  const classes = useStyles();
  const { setTokens, adminArea } = useContext(shopcontext);

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    setTokens(user_data);
  }, []);

  return (
    <div className={classes.AppmarginTop}>
      <Router>
        {adminArea ? <Fragment /> : <Route path="*" component={MenuNav} />}
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/cadastrar" component={SignUp} />
          <Route exact path="/recuperar-senha" component={PasswordRecover} />
          <Route exact path="/lojas/:store_name" component={SingleProduct} />
          <Route exact path="/categorias/:cat" component={Category} />
          <Route
            exact
            path="/categorias/:cat/lojas/:store_name"
            component={SingleProduct}
          />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route component={NoMatch} />
        </Switch>
        {adminArea ? <Fragment /> : <Route path="*" component={Footer} />}
      </Router>
    </div>
  );
}

export default App;
