import React, { useEffect, useState, memo } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Container,
  Typography,

} from "@material-ui/core";



import Api from "../../Services/api";


import SellerSingle from "./sellerSingle";

import { useParams, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  Container: {
    minHeight: "800px",
  },
}));

function SingleProduct() {
  let location = useLocation();

  const classes = useStyles();
  const { store_name } = useParams();
  const [loja, setLoja] = useState([]);
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    Api.get(`/lojas/${store_name}`)
      .then((res) => {
        if (res.data.error === "erro") {
        }
        setLoja(res.data.store);
        setProduto(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [store_name]);

  const NoData = () => {
    return (
      <Container>
        <Typography variant="h3">{`A loja ou restaurante ${location.pathname.replace(
          "/lojas/",
          ""
        )} não existe`}</Typography>
      </Container>
    );
  };

  return (
    <Container maxWidth="xl" disableGutters className={classes.Container}>
      {loja ? (
        <SellerSingle data={{ produto: produto, store: loja }} />
      ) : (
        <NoData />
      )}
    </Container>
  );
}
export default memo(SingleProduct);
