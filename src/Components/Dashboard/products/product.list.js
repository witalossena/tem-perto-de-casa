import React, { useEffect, useState, useContext } from "react";

import shopcontext from "../../../context/ShopContext";

import {
  List,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  Button,
  makeStyles
} from "@material-ui/core";

import Api from "../../../Services/api";

const Listproducts = () => {
  const { user } = useContext(shopcontext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await Api.post("products", {
        user: user.user,
      });
      console.log(res);
      setProducts(res.data.products);
    }

    if (user.user) {
      loadData();
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>nome</TableCell>
            <TableCell>descrição</TableCell>
            <TableCell>preço</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.product_name}</TableCell>
              <TableCell>{row.product_description}</TableCell>
              <TableCell>{row.product_price}</TableCell>
              <TableCell>
                <Button color="primary" variant="contained">
                  editar
                </Button>
              </TableCell>
              <TableCell>
                <Button color="secondary" variant="contained">
                  excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Listproducts;
