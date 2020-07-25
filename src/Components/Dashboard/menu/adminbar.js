import React from "react";

import {
  Container,
  Typography,
  makeStyles,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "35px",
    backgroundColor: "#cacaca",
    top: 0,
    display: "flex",
    alignItems: "center",
  },
}));

const AdminBar = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Link href="/dashboard">
        <Typography>meu painel</Typography>
      </Link>
    </Container>
  );
};

export default AdminBar;
