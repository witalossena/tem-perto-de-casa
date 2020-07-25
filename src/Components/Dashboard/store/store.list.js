import React, { useEffect, useState, useContext, Fragment } from "react";

import shopcontext from "../../../context/ShopContext";

import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  Button,
} from "@material-ui/core";


import ListProduct from '../products/listproducts'

import Api from "../../../Services/api";

function ListStore() {
  const { user } = useContext(shopcontext);
  const [store, setStore] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await Api.post("products", {
        user: user.user,
      });
      setStore(res.data.lojas);
    }

    if (user.user) {
      loadData();
    }
  }, []);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>nome</TableCell>
              <TableCell>whatsapp</TableCell>
              <TableCell>slug</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {store.map((row) => (
              <TableRow hover onClick={() => console.log("o")} key={row.id}>
                <TableCell>{row.store_name}</TableCell>
                <TableCell>{row.store_whats}</TableCell>
                <TableCell>{row.store_slug}</TableCell>
                <TableCell>
                  <Button color="primary" variant="contained">
                    editar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color="secondary" variant="contained">
                    ver produtos
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>









    </Fragment>
  );
}

export default ListStore;
