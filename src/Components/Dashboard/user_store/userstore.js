import React, { useContext, useState, Fragment } from "react";


import {

  Button,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from "@material-ui/core";

import ShopContext from "../../../context/ShopContext";
import Editstore from "../user_store/editstore";

function UserStore({ data }) {
  const { user } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const [storeData, setStoreData] = useState([]);


  const handleClose = () => {
    setOpen(false);
  };

  const handlepass = (op, row, user) => {
    setOpen(op);
    setStoreData(row);

    return user;
  };

  return (
    <Fragment>
      <Editstore
        data={{
          op: open,
          handleClose: handleClose,
          store: storeData,
          user: open ? user : "",
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>WhatsApp</TableCell>
              <TableCell>Funcionamento</TableCell>
              <TableCell>Taxa de entrega</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.store_name}</TableCell>
                <TableCell>{row.store_description}</TableCell>
                <TableCell>{row.store_whats}</TableCell>
                <TableCell>{row.open_closed ? "aberto" : "fechado"}</TableCell>
                <TableCell>{row.delivery_fee}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handlepass(true, row, user)}
                  >
                    editar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    variant="contained"
                  >
                    excluir
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

export default UserStore;
