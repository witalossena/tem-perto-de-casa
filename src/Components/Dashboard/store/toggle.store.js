import React, { useState, useEffect, useContext, memo, Fragment } from "react";

import {
  makeStyles,
  Box,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  CardContent,
  ButtonGroup,
  Button,
} from "@material-ui/core";

import Api from "../../../Services/api";
import Editstore from "./store.edit";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(() => ({
  card: {
    width: "275px",
    margin: "25px",
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  FormGroup: {
    marginBottom: 16,
  },
}));

function Toggle({ store }) {
  const [checked, setChecked] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [op, setOp] = useState(Number);

  useEffect(() => {
    if (store.open_closed === 0) {
      setChecked(true);
    }
  }, []);

  async function SetStoreClose() {
    const res = await Api.put("loja", {
      id: store.id,
      open_closed: checked ? 1 : 0,
    });
    console.log(res.data);
  }

  const toggleChecked = () => {
    setChecked((prev) => !prev);
    SetStoreClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    return <Redirect to="/dashboard" />;
  };

  return (
    <Paper
      className={classes.card}
      style={{ border: checked ? '1px solid red' : null }}
    >
      <Editstore
        data={{ store: store, open: open, handleClose: handleClose }}
      />
      <CardContent>
        <FormGroup className={classes.FormGroup}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={toggleChecked} />}
            label={checked ? "loja aberta" : "loja fechada"}
          />
        </FormGroup>

        <Typography color="textPrimary" className={classes.title}>
          {store.store_name}
        </Typography>
        <Box className={classes.box}>
          <Typography color="textSecondary">taxa de entrega</Typography>
          <Typography color="textSecondary">{store.delivery_fee}</Typography>
        </Box>
        <Box className={classes.box}>
          <Typography color="textSecondary">whatsApp</Typography>
          <Typography color="textSecondary">{store.store_whats}</Typography>
        </Box>
        <Box className={classes.box}>
          <Typography color="textSecondary">slug</Typography>
          <Typography color="textSecondary">{store.store_slug}</Typography>
        </Box>
      </CardContent>

      <ButtonGroup fullWidth>
        <Button onClick={() => handleOpen()}>editar</Button>
        <Button>excluir</Button>
      </ButtonGroup>
    </Paper>
  );
}

export default memo(Toggle);
