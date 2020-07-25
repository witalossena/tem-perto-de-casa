import React from "react";

import { useLocation } from "react-router-dom";

import { CssBaseline, Typography, Container, Box } from "@material-ui/core";

import image_404 from "./404-image.svg";

import useStyles from "./NoMatch.styles";

const NoMatch = () => {
  let location = useLocation();
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          <Box display="flex" justifyContent="center" component="div">
            {" A página"}
            <Box className={classes.noRoute} component="span">
              <code> {location.pathname} </code>
            </Box>
            {"não existe"}
          </Box>
          <Box component="div" display="flex" justifyContent="center">
            <img className={classes.image} alt="404" src={image_404} />
          </Box>
        </Typography>
      </div>
    </Container>
  );
};

export default NoMatch;
