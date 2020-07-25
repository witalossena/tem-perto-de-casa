import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import seller_image from "./seller_image.webp";
import china_in_box from "./china_in_box.webp";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  Avatar,
  Typography,
  Link,
  Grid,
  Paper,
} from "@material-ui/core";

import { Link as RouterLink, useLocation, useParams } from "react-router-dom";

const height = "80px";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "118px",
    width: "100%",
  },
  image: {
    height: height,
  },
  cardAction: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "5px",
  },
  grid: {
    marginBottom: "8px",
    marginTop: "16px",
  },
}));

const id = Math.floor(Math.random() * 2);

export default function Sellers({ seller, data }) {
  const classes = useStyles();
  const location = useLocation();
  const { cat } = useParams();

  const isCatPage = () => {
    if (cat) {
      return location.pathname.replace(
        `/categorias/${cat}`,
        `/categorias/${cat}/lojas/${seller.store_slug}`
      );
    } else {
      return `/lojas/${seller.store_slug}`;
    }
  };

  return (
    <Grid className={classes.grid} item lg={4} xl={4} xs={12} >
      <Link href={`${isCatPage()}`} underline="none">
        <Card component={Paper} className={classes.card}>
          <CardActionArea className={classes.cardAction}>
            <img
              src={id === 1 ? seller_image : china_in_box}
              className={classes.image}
            />

            <CardContent>
              <Typography variant="h6"> {seller.store_name}</Typography>

              <Typography color="textSecondary" variant="body2" component="p">
                {seller.store_address}
              </Typography>

              <Typography color="textSecondary" variant="body2" component="p">
                {seller.store_whats}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
}
