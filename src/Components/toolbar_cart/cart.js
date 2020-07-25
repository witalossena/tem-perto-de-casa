import React, { useContext, memo } from "react";

import { Badge, IconButton, makeStyles } from "@material-ui/core";

import { ShoppingCartIcon } from "../shop/icons";

import ShopContext from "../../context/ShopContext";

const useStyles = makeStyles(() => ({
  IconButton: {
    color: "#ffffff",
  },
}));

function ToolbarCart(props) {
  const classes = useStyles();
  const context = useContext(ShopContext);

  const TotalITems = context.cart.reduce((count, curItem) => {
    return count + curItem.quantity;
  }, 0);

  return (
    <IconButton className={classes.IconButton} onClick={() => context.teste()}>
      <Badge
        color={props.color}
        overlap={props.overlap}
        badgeContent={TotalITems}
      >
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}
export default memo(ToolbarCart);
