import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ButtonGroup,
  makeStyles,
  Checkbox,
  FormControlLabel,
  Divider,
  TextField,
  Box,
  Grid,
} from "@material-ui/core";
import WhatsAppButton from "./Buttons/whatsapp.button";
import { WhatsAppIcon, AddIcon, RemoveIcon } from "./icons";
import ShopContext from "../../context/ShopContext";
import Googlecomplete from "../googleComplete";
import { default as MensagemWhats } from "./mensagem_whats";

const useStyles = makeStyles({
  dialog: {
    width: "600px",
  },
  box: {
    width: "175px",
  },
  productName: {
    width: "300px",
  },
  priceArea: {
    width: "100px",
  },
  GridStyle: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  CartTitle: {
    marginTop: "16px",
    marginBottom: "8px",
    padding: "0",
  },
  gridRow: {
    marginBottom: "20px",
  },
});

export default function Cart() {
  const context = useContext(ShopContext);
  const classes = useStyles();
  const {
    open,
    setOpen,
    store,
    localEntrega,
    addEndereco,
    cart,
    removeProductFromCart,
  } = useContext(ShopContext);
  const [isDisabled, SetDisabled] = useState(true);
  const [options, setOptions] = useState({
    pagamentoMetodo: false,
    tipo: false,
  });
  const [observation] = useState("sem observações para esse pedido");
  const [fee] = useState(0);
  const [troco, setTroco] = useState();
  const [checked, setChecked] = useState({
    delivery: false,
    change: false,
  });

  const TotalPrice = cart.reduce((count, curItem) => {
    return count + curItem.product_price * curItem.quantity;
  }, 0.0);

  const TotalItems = cart.reduce((count, curItem) => {
    return count + curItem.quantity;
  }, 0);

  const buy = (cart, store) => {
    const order = {
      store: {
        store_id: store.id,
        store_name: store.store_name,
        store_phonenumber: `+55${store.store_whats}`,
      },
      order_items: cart,
      delivery: {
        delivery_fee: checked.delivery ? 0 : store.delivery_fee,
        delivery_type: checked.delivery ? "delivery" : "",
        observation: observation,
      },
      payment: {
        payment_type: options.pagamentoMetodo,
        card_brand: "Elo",
        change: troco,
      },
      client_info: {
        name: "cliente 1",
        address: localEntrega,
        phone_number: "11 995465486",
      },
    };
    window.open(MensagemWhats(order), "_blank");
  };

  const handleCheck = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const PriceFormatter = (TotalPrice, quantity) => {
    if (!TotalPrice) {
      return false;
    }
    const x = quantity * TotalPrice;
    const valor = x.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
    return valor;
  };

  const TaxFormmatter = React.useCallback((tax, subTotal) => {
    if (tax && subTotal === undefined) {
      if (checked.delivery === true) {
        tax = 0;
        return tax.toLocaleString("pb-BR", { minimumFractionDigits: 2 });
      }
      return tax.toLocaleString("pb-BR", { minimumFractionDigits: 2 });
    }
    if (tax && subTotal) {
      if (checked.delivery === true) {
        tax = 0;
        const total = tax + subTotal;
        return total.toLocaleString("pb-BR", { minimumFractionDigits: 2 });
      }
      const total = tax + subTotal;
      return total.toLocaleString("pb-BR", { minimumFractionDigits: 2 });
    }
  });

  const handleChangeTextField = (event) => {
    const value = event.target.value;
    const valor = value.toLocaleString("pt-BR", {
      minimumFractionDigits: 4,
    });
    setTroco(valor);
  };

  const firstCheck = React.useCallback(() => {
    if (localEntrega) {
      return true;
    } else if (checked.delivery === true) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    if (firstCheck() === true && options.tipo === true) {
      SetDisabled(false);
    } else {
      SetDisabled(true);
    }
  }, [options.pagamentoMetodo, checked.delivery, localEntrega]);

  useEffect(() => {
    if (checked.delivery === true) {
      addEndereco({});
    }
  }, [checked.delivery]);

  //adicionar borda vermelho no botão do metodo de pagamento escolhido
  useEffect(() => {
    const btnDinheiro = document.getElementById("1");
    const btnCartao = document.getElementById("2");

    if (options.pagamentoMetodo === "cartão") {
      btnCartao.style.borderColor = "red";
      btnDinheiro.style.borderColor = "white";
    }

    if (options.pagamentoMetodo === "dinheiro") {
      btnDinheiro.style.borderColor = "red";
      btnCartao.style.borderColor = "white";
    }
  }, [options.pagamentoMetodo]);

  const DeliveryOptionsComponent = (TotalItems) => {
    if (TotalItems) {
      return (
        <React.Fragment>
          <DialogTitle style={{ margin: "0", padding: "0" }}>
            {"Entrega"}
          </DialogTitle>

          <DialogContentText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.delivery}
                  onChange={handleCheck}
                  name="delivery"
                />
              }
              label="Vou retirar o meu pedido no restaurante"
            />
          </DialogContentText>
          {checked.delivery ? "" : <Googlecomplete />}
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  const PaymentOptionsComponenet = (TotalItems) => {
    if (TotalItems) {
      return (
        <React.Fragment>
          <DialogTitle
            style={{ marginTop: "16px", marginBottom: "8px", padding: "0" }}
          >
            {"Pagamento"}
          </DialogTitle>

          <ButtonGroup aria-label="outlined primary button group">
            <Button
              style={{ marginRight: "12px", borderColor: "#000" }}
              name="dinheiro"
              id="1"
              onClick={() =>
                setOptions({
                  ...options,
                  pagamentoMetodo: "dinheiro",
                  tipo: true,
                })
              }
            >
              Dinheiro
            </Button>
            <Button
              name="cartão"
              id="2"
              style={{ marginLeft: "12px", borderColor: "#000" }}
              onClick={() =>
                setOptions({
                  ...options,
                  pagamentoMetodo: "cartão",
                  tipo: true,
                })
              }
            >
              Cartão
            </Button>
          </ButtonGroup>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  const ChangeOptionsComponenent = () => {
    if (options.pagamentoMetodo === "dinheiro") {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {checked.change ? (
            ""
          ) : (
            <TextField
              id="outlined-basic"
              label="Troco para quanto?"
              variant="outlined"
              type="number"
              onChange={handleChangeTextField}
              margin="normal"
            />
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={checked.change}
                onChange={handleCheck}
                name="change"
              />
            }
            label="não vou precisar de troco"
          />
        </div>
      );
    } else {
    }
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle className={classes.CartTitle}>{"Pedido"}</DialogTitle>
          {cart.map((cartItem) => (
            <Grid
              className={classes.gridRow}
              key={cartItem.id}
              container
              justify="space-between"
            >
              <Grid item lg={6} className={classes.GridStyle}>
                <Box style={{ width: "175px" }}>
                  <DialogContentText>
                    {cartItem.quantity}x {cartItem.product_name}
                  </DialogContentText>
                  <DialogContentText>{cartItem.observations}</DialogContentText>
                </Box>
              </Grid>

              <Grid item lg={2} className={classes.GridStyle}>
                <ButtonGroup size="small">
                  <Button
                    size="small"
                    onClick={() => context.removeProductFromCart(cartItem.id)}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    onClick={() => context.addProductToCart(cartItem)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Grid>

              <Grid item lg={2} className={classes.GridStyle}>
                <Box style={{ width: "100px" }}>
                  <DialogContentText>
                    R$
                    {PriceFormatter(cartItem.product_price, cartItem.quantity)}
                  </DialogContentText>
                </Box>
              </Grid>
              <Divider />
            </Grid>
          ))}
          <DialogContentText id="alert-dialog-description">
            {TotalItems
              ? `Itens no carrinho: ${TotalItems}`
              : "Seu carrinho esta Vazio"}
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
            {TotalPrice ? `Subtotal: R$ ${TaxFormmatter(TotalPrice)}` : null}
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
            taxa de entrega: R$ {TaxFormmatter(store.delivery_fee)}
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
            subtotal + taxa de entrega: R$
            {TaxFormmatter(store.delivery_fee, TotalPrice)}
          </DialogContentText>

          {DeliveryOptionsComponent(TotalItems)}
          {PaymentOptionsComponenet(TotalItems)}
          {TotalItems ? ChangeOptionsComponenent() : ""}
        </DialogContent>

        <WhatsAppButton
          onClick={() => buy(context.cart, store)}
          disabled={isDisabled}
          color="primary"
          startIcon={<WhatsAppIcon />}
        >
          Enviar pedido pelo WhatsApp
        </WhatsAppButton>
      </Dialog>
    </div>
  );
}
