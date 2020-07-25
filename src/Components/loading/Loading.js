import React, { useContext } from "react";

import { Container, LinearProgress } from "@material-ui/core";

import shopContext from "../../context/ShopContext";

function Loading() {
  const { loading } = useContext(shopContext);

  if (loading === true) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  } else {
    return null;
  }
}

export default Loading;
