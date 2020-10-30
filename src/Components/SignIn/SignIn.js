import React from "react";

import {
    Avatar,
    CssBaseline,
    Grid,
    Box,
    Typography,
    Container,
    makeStyles,
    Paper,
} from "@material-ui/core";
import appInstalation from "../shop/images/app_installation.svg";

import Loginform from "../forms/login.form";

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

const SignIn = () => {
    const classes = useStyles();

    return ( <
        Container className = { classes.container }
        component = "main"
        maxWidth = "xl" >
        <
        Grid container >
        <
        Grid className = { classes.grid }
        item lg = { 8 }
        xs = { 1 } >
        <
        img src = { appInstalation }
        alt = "loja" / >
        <
        /Grid> <
        Grid item lg = { 4 }
        xs = { 12 } >
        <
        Paper elevation = { 4 }
        className = { classes.paper } >
        <
        Typography className = { classes.registerTitle }
        variant = "h4" >
        Entre com sua conta <
        /Typography> <
        Loginform / >
        <
        /Paper> <
        /Grid> <
        /Grid> <
        /Container>
    );
};

export default SignIn;