import React from "react";

import {
  Container,
  Typography,
  Box,
  Link,
  Grid,
  makeStyles,
} from "@material-ui/core";

function Copyright({ style }) {
  return (
    <Typography>
      {"© "}
      <Link className={style.link} href="www.tempertodecasa.com.br">
        {" "}
        Tem perto de casa{" "}
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
 
  Box: {
    backgroundColor: "#fb0404",
    height: 80,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color:'#fff'
  },
  link: {
    color: "#fff",
    fontWeight: "800"
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Container
      disableGutters
      maxWidth="xl"
      className={classes.Box}
    >
      <Copyright style={classes} />
    </Container>
  );
}
