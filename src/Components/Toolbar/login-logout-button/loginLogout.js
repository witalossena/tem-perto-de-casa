import React, { useContext, Fragment } from "react";

import shopcontext from "../../../context/ShopContext";

import { Typography, Link, Box, makeStyles } from "@material-ui/core";

import ToolbarCart from "../../toolbar_cart/cart";

const useStyles = makeStyles(() => ({
  boxMenuArea: {
    display: "flex",
  },
  menuLink: {
    color: '#ffffff',
    marginRight: "8px",
    marginLeft: "8px",
    "&:hover": {
      textDecoration: "none",
        
    },
  },
}));

const Loginlogout = () => {
  const classes = useStyles();

  const { user, setTokens } = useContext(shopcontext);

  const handleLogout = () => {
    setTokens(false);
  };

  return (
    <Fragment>
      {user ? (
        <Box onClick={handleLogout}>
          <Typography variant="h6">
            <Link className={classes.menuLink} href="/login">
              sair
            </Link>
          </Typography>
        </Box>
      ) : (
        <Box className={classes.boxMenuArea}>
          <Typography variant="h6">
            <Link className={classes.menuLink} href="/login">
              Entrar
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link className={classes.menuLink} href="/cadastrar">
              Faça sua conta
            </Link>
          </Typography>
        </Box>
      )}

      <Box>
        <ToolbarCart />
      </Box>
    </Fragment>
  );
};

export default Loginlogout;
