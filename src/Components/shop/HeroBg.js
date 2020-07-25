import React, { useState } from "react";

import hero_bg from "./hero_bg.jpg";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  herobgBox: {
    width: "100%",
    height: "345px",
    backgroundImage: `url(${hero_bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
}));

const HeroBg = () => {
  const classes = useStyles();
  return <Box className={classes.herobgBox} />;
}

export default HeroBg;
