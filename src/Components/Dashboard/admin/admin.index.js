import React, { useState, useEffect, useContext, memo } from "react";

import ToggleStore from "../store/toggle.store";
import { Container, makeStyles } from "@material-ui/core";

import shopcontext from "../../../context/ShopContext";
import Api from "../../../Services/api";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "flex-start",
  },
}));

function AdminIndex() {
  const classes = useStyles();
  const {user } = useContext(shopcontext);
  const [ store, setStore ] = useState([])

  useEffect(() => {
    async function getUserStore() {
      const res = await Api.post("user/store", {
        user_id: user.user.id,
      });
      setStore(res.data);
    }

    getUserStore();
  }, []);

  return (
    <Container maxWidth="xl" className={classes.container}>
      {store.map((Store) => (
        <ToggleStore key={Store.id} store={Store} />
      ))}
    </Container>
  );
}

export default memo(AdminIndex);
