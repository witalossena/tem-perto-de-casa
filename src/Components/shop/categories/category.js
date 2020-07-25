import React, { useState, useEffect } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

import HeroBg from "../HeroBg";

import Api from "../../../Services/api";
import Sellers from "../../shop/sellers";

import { useParams } from "react-router-dom";

import { Container, Grid } from "@material-ui/core";

function Categories() {
  const [data, setData] = useState([]);
  const { cat } = useParams();

  useEffect(() => {
    async function getStoreCategory() {
      const res = await Api.get(`categories/${cat}`);
      setData(res.data.store);
    }
    getStoreCategory();
  }, []);

  function Variants() {
    return (
      <div>
        <Skeleton variant="text" />
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="rect" width={210} height={118} />
      </div>
    );
  }

  return (
    <Container maxWidth="lg">
      <HeroBg />
      <Grid container spacing={2} justify="space-between">
        {data ? (
          data.map((store) => <Sellers key={store.id} seller={store} />)
        ) : (
          <>
            <Variants />
            <Variants />
            <Variants />
          </>
        )}
      </Grid>
    </Container>
  );
}

export default Categories;
