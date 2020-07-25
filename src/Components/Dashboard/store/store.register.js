import React, { useState, Fragment, useEffect, useContext } from "react";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import shopcontext from "../../../context/ShopContext";
import CategoryOption from "../../shop/categories/category.option";

import {
  LinearProgress,
  Grid,
  Button,
  Container,
  MenuItem,
  Paper,
} from "@material-ui/core";

import Api from "../../../Services/api";
import useStyles from "../../forms/forms.styles";

function Register_store() {
  const { user } = useContext(shopcontext);
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [ismobile, setMobile] = useState({
    display: "none",
    mobile: false,
  });

  useEffect(() => {
    if (window.innerWidth <= 992) {
      setMobile({ mobile: true });
    }
  }, []);

  const userId = () => {
    if (user.user) {
      const id = user.user.id;
      return id;
    }
  };

  const Token = () => {
    if (user.user) {
      const token = user.access_token.token;
      return token;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper style={{ padding: "22px" }}>
        <Formik
          initialValues={{
            store_name: "",
            store_description: "",
            store_slug: "",
            store_phone: "",
            stostore_address: "",
            delivery_fee: "",
            pickup_in_store: "",
            store_whats: "",
            store_address: "",
            category_id: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.store_name) {
              errors.store_name = "Este campo não pode ser vazio";
            }
            if (!values.store_description) {
              errors.store_description = "Este campo não pode vazio";
            }
            if (!values.store_slug) {
              errors.store_slug = "este campo não pode ser vazio";
            }
            if (!values.store_phone) {
              errors.store_phone = "este campo não pode ser vazio";
            }
            if (!values.delivery_fee) {
              errors.delivery_fee = "este campo não pode ser vazio";
            }
            if (!values.pickup_in_store) {
              errors.pickup_in_store = "este campo não pode ser vazio";
            }
            if (!values.store_whats) {
              errors.store_whats = "este campo não pode ser vazio";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            Api.post("/loja", {
              store_name: values.store_name,
              store_description: values.store_description,
              store_slug: values.store_slug,
              store_phone: values.store_phone,
              store_whats: values.store_whats,
              store_address: values.store_address,
              delivery_fee: values.delivery_fee,
              pickup_in_store: values.pickup_in_store,
              category_id: values.category_id,
              token: Token(),
              user_id: userId(),
            })
              .then(function (res) {
                setSubmitting(false);
              })
              .catch(function (err) {
                console.log(err);
              });
          }}
        >
          {({ handleSubmit, isSubmitting, values }) => (
            <Form className={classes.form}>
              <Grid className={classes.gridContainer} container spacing={2}>
                <Grid item lg={10} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_name"
                    label="nome da sua loja"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={10} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_description"
                    label="breve descrição da sua loja"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={10} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_address"
                    label="endereço"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={10} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_slug"
                    label="link personalizado"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={10} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_phone"
                    label="telefone da sua loja sem espaços"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={10} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_whats"
                    label="whatsapp da sua loja"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={3} xs={6}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="number"
                    name="delivery_fee"
                    label="Taxa de entrega"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={3} xs={6}>
                  <Field
                    component={TextField}
                    type="text"
                    name="pickup_in_store"
                    label="aceita retiradas no local"
                    select
                    variant="outlined"
                    helperText="escolha uma opção"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem value={12}>sim</MenuItem>
                    <MenuItem value={20}>não</MenuItem>
                  </Field>
                </Grid>

       

                <CategoryOption />

                <Grid item lg={10} xs={12}>
                  {isSubmitting && <LinearProgress />}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    salvar
                  </Button>
                </Grid>

                <Grid
                  container
                  justify="flex-end"
                  className={classes.submitText}
                ></Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default Register_store;
