import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Typography, Link } from "@material-ui/core";

import useStyles from "./avatar.styles";

import shopcontext from '../../context/ShopContext';

export default function AvatarComponent(props) {
  // const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
  const { user, setTokens  } = useContext(shopcontext);

  const handleLogout = () => {
    setTokens(false);
  };

  const classes = useStyles();
  const fullName = String(props.name);
  const firstLetter = fullName.match("^[A-z]");

  if (!user) {
    return (
      <div className={classes.root}>
        <Avatar className={classes.orange}></Avatar>
        <Typography>
          <Link href="/login">Faça login</Link>
        </Typography>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Avatar className={classes.orange}>{firstLetter}</Avatar>
        <Typography>
          <Link className={classes.link} href="/dashboard">
            {"Perfil"}
          </Link>
          |
          <Link className={classes.link} onClick={handleLogout}>
            {"Sair"}
          </Link>
        </Typography>
      </div>
    );
  }
}
