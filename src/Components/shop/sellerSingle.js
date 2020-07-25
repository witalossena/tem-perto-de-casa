import React, { useContext, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  Button,
  TextField,
  DialogContent,
  Container,
  DialogTitle,
  Box,
  Paper,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

import food_image from "../Data/pizza.jpeg";

import Cart from "./cart";

import ShopContext from "../../context/ShopContext";

import ToolbarCart from "../toolbar_cart/cart";

import InfoStoreList from "./informationStoreList/InformationStoreList";

const useStyles = makeStyles((theme) => ({
  ListMargin: {
    marginBottom: -5,
  },
  icon: {
    fontSize: 18,
    marginRight: 5,
  },
  btn: {
    background: "#fb0404",
    color: "#fff",
    marginTop: theme.spacing(2),
    "&:hover": {
      background: "#fb0529",
    },
  },
  List: {
    [theme.breakpoints.down("md")]: {
      width: "350px",
    },
  },
  card: {
    display: "flex",
    margin: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  media: {
    height: "100%",
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      width: "50%",
    },
  },
  CardActionArea: {
    display: "flex",
    justifyContent: "flex-start",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  box: {
    marginBottom: theme.spacing(3),
    display: "flex",
    alignItems: "center",
  },
  cartOptionImg: {
    width: "80px",
    height: "80px",
    marginRight: "30px",
  },
}));

const PriceFormatter = (TotalPrice) => {
  if (!TotalPrice) {
    return false;
  }
  const valorFormatado = TotalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return valorFormatado;
};

export default function SellerSingle({ data }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [obs, setObs] = useState();
  const [mobile, setmobile] = useState(false);
  const context = useContext(ShopContext);

  const handleClose = () => {
    const product = context.cartOptions;
    setOpen(false);
    context.removeFromDialog(product);
  };

  const handleOpen = (p, image) => {
    const data = { ...p, url: image };
    setOpen(true);
    context.addDialog(data);
  };

  useEffect(() => {
    if (window.innerWidth <= 576) {
      setmobile(true);
    } else {
      setmobile(false);
    }
  }, [mobile]);

  const c = (item, obs, store) => {
    const arr = [...item];

    if (obs) {
      arr[0].observations = obs;
    } else {
      obs = "Nenhuma obervação";
      arr[0].observations = obs;
    }

    context.addProductToCart(...arr);
    context.handleStore(store);
    handleClose();
  };

  if (data.produto.length === 0) {
    return (
      <Container maxWidth="xl" style={{ minHeight: "800px" }}>
        <Grid container spacing={4}>
          <Grid item lg={12}>
            <Skeleton variant="rect" width="100%" height={375} />
          </Grid>
          <Grid item lg={4}>
            <Skeleton variant="rect" width={210} height={118} />
          </Grid>
          <Grid item lg={4}>
            <Skeleton variant="rect" width={210} height={118} />
          </Grid>

          <Grid item lg={4}>
            <Skeleton variant="rect" width={210} height={118} />
          </Grid>

          <Grid item lg={4}>
            <Skeleton variant="rect" width={210} height={118} />
          </Grid>

          <Grid item lg={4}>
            <Skeleton variant="rect" width={210} height={118} />
          </Grid>

          <Grid item lg={4}>
            <Skeleton variant="rect" width={210} height={118} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <InfoStoreList loja={data.store} />
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container spacing={2}>
          {data.produto.map((p) => (
            <Grid key={p.id} item lg={3} xl={4} md={4}>
              <Card>
                <CardActionArea
                  disabled={data.store.open_closed === "0" ? true : false}
                  onClick={() => handleOpen(p, food_image)}
                  className={classes.CardActionArea}
                >
                  <CardMedia
                    component="img"
                    className={classes.media}
                    image={food_image}
                    title={p.product_name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {p.product_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {p.product_description}
                    </Typography>
                    <Typography variant="h6" component="h2">
                      {PriceFormatter(p.product_price)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog onClose={handleClose} fullWidth maxWidth="sm" open={open}>
        <DialogContent>
          <DialogTitle>{"Detalhes do item"}</DialogTitle>
          {context.cartOptions.map((itemCart) => (
            <Container
              key={itemCart.id}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Box className={classes.box}>
                <img src={itemCart.url} className={classes.cartOptionImg} />
                <div>
                  <Typography> {itemCart.product_name} </Typography>
                  <Typography variant="h6" component="h2">
                    {PriceFormatter(itemCart.product_price)}
                  </Typography>
                </div>
              </Box>

              <TextField
                multiline={true}
                rows={2}
                label="Alguma observação?"
                onChange={(e) => setObs(e.target.value)}
              />

              <Button
                variant="contained"
                className={classes.btn}
                onClick={() => c(context.cartOptions, obs, data.store)}
              >
                adicionar ao carrinho
              </Button>
            </Container>
          ))}
        </DialogContent>
      </Dialog>
      <Cart />
      {mobile ? (
        <Box style={{ position: "fixed", right: "0", bottom: "0" }}>
          <ToolbarCart color={"primary"} overlap={"circle"} />
        </Box>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
