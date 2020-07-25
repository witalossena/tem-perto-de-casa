import React, { useState, useEffect, useContext, Fragment } from "react";

import Sellers from "./sellers";
import Cart from "./cart";
import shopcontext from "../../context/ShopContext";

import agreement from "./images/agreement.svg";

import {
  Grid,
  Container,
  makeStyles,
  Button,
  Typography,
  Link,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";

import Api from "../../Services/api";

import HeroBg from "./HeroBg";

const useStyles = makeStyles((theme) => ({
  GridCat: {
    display: "flex",
    marginTop: '25px',

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
      marginTop: '25px',
    },
  },
  GridLink: {
    marginBottom: "12px",
    marginRight: 12,
    display: 'flex'
  },
  CatButton: {
    // margin: "0 14px",
  },
  grid: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
  card: {
    backgroundImage: `url(${agreement})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "75px",
  },
}));

export default function Shop() {
  const [store, setStore] = useState([]);
  const [categories, setCategory] = useState([]);
  const { setLoading } = useContext(shopcontext);
  const classes = useStyles();

  useEffect(() => {
    async function getStoreData() {
      try {
        const res = await Api.get("lojas");
        setStore(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStoreData();
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await Api.get("categories");
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, []);

  if (!store) {
    return <Fragment />;
  }

  return (
    <Container style={{ minHeight: "800px" }}>
      <Cart />
      <HeroBg />
      <Grid className={classes.grid} container>
        <Grid className={classes.GridCat} item xl={12} xs={12}>
          {/* <Typography>filtrar por</Typography> */}

          {categories.map((category) => (
            <Link
              className={classes.GridLink}
              key={category.id}
              href={`categorias/${category.category_name}`}
            >
              <Button className={classes.CatButton} variant="outlined">
                {category.category_name}
              </Button>
            </Link>
          ))}
        </Grid>
      </Grid>

      <Grid container spacing={2} justify="flex-start">
        {store.map((s) => (
          <Sellers key={s.id} seller={s} data={store} />
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item lg={4} xs={12}>
          <Card>
            <CardActionArea href="/cadastrar">
              <CardContent className={classes.card} />
              <CardContent>
                <Typography align="left" variant="h6">
                  cadastre seu negócio
                </Typography>
                <Typography align="left" color="textSecondary">
                  Facilite a vida dos seus clientes
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
