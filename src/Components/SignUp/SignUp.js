import React from "react";

import { makeStyles } from "@material-ui/core";

import { Box, Typography, Container, Grid, Paper } from "@material-ui/core";

import RegisterForm from "../forms/register.form";

import appInstalation from "../shop/images/app_installation.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#",
    height: "800px",
    display: "flex",
    alignItems: "center",
  },
  paper: {
    paddingTop: "175px",
    paddingBottom: "175px",
    paddingRight: "18px",
    paddingLeft: "18px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "75px",
      paddingBottom: "75px",
    },
  },
  registerTitle: {
    fontWeight: "500",
  },
  grid: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const SignUp = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth="xl">
      <Grid container>
        <Grid className={classes.grid} item lg={8} xs={1}>
          <img src={appInstalation} />
        </Grid>
        <Grid item lg={4} xs={12}>
          <Paper elevation={4} className={classes.paper}>
            <Typography className={classes.registerTitle} variant="h4">
              Cadastre sua loja
            </Typography>
            <RegisterForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
