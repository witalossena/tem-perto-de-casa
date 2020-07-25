import React, { Fragment } from "react";

import capa from "../capa.jpg";

import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { PlaceIcon, MotorcycleIcon, PhoneAndroidIcon } from "../icons";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: "gray",
  },

  ListMargin: {
    marginBottom: -5,
  },
  icon: {
    fontSize: 18,
    marginRight: 5,
  },
  Btn: {
    marginRight: theme.spacing(1),
    marginBottom: 10,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  BtnContainer: {
    [theme.breakpoints.down("md")]: {
      alignItems: "flex-start",
      flexDirection: "column",
    },
  },
  List: {
    [theme.breakpoints.down("md")]: {
      width: "350px",
    },
  },
  card: {
    maxWidth: 800,
    display: "flex",
    margin: theme.spacing(1),
  },
  media: {
    height: "50%",
    width: "50%",
  },
  cardContent: {
    width: "235px",
  },
  capa: {
    width: "100%",
    height: "100%",
  },
  box: {
    backgroundImage: `url(${capa})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "22vh",
  },
  title: {
    color: "#fafafa",
    fontSize: 60,
  },
  subTitle: {
    color: "#fafafa",
    fontSize: 16,
  },
}));

const InformationStoreList = ({ loja }) => {
  const classes = useStyles();

  return (
    <Container disableGutters maxWidth="xl">
      <Box className={classes.box}>
        <Container maxWidth="xl">
          <Typography className={classes.title} variant="h3">
            {loja.store_name}
          </Typography>
          <Typography
            className={classes.subTitle}
            variant="body2"
            component="p"
          >
            {loja.store_description}
          </Typography>
        </Container>
      </Box>

      <Paper elevation={1}>
        <List>
          <ListItem>
            <ListItemIcon>
              <PlaceIcon />
              <ListItemText secondary={loja.store_address} />
            </ListItemIcon>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <PhoneAndroidIcon />
              <ListItemText secondary={loja.store_phone} />
            </ListItemIcon>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default InformationStoreList;
