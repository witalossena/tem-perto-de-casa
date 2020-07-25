import React, { useState, Fragment, useEffect, useContext } from "react";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import shopcontext from "../../../context/ShopContext";

import Api from "../../../Services/api";

import {
  Link,
  LinearProgress,
  Grid,
  Button,
  Container,
  MenuItem,
  Paper,
} from "@material-ui/core";

import useStyles from "../../forms/forms.styles";

function Register_product() {
  const { user } = useContext(shopcontext);
  const [store, setStore] = useState([]);
  const classes = useStyles();
  const [ismobile, setMobile] = useState({
    display: "none",
    mobile: false,
  });

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

  useEffect(() => {
    if (window.innerWidth <= 992) {
      setMobile({ mobile: true });
    }
  }, []);

  useEffect(() => {
    async function getUserStore() {
      const res = await Api.post("user/store", { user_id: userId() });
      setStore(res.data);
    }
    getUserStore();

    return () => {
      setStore([]);
    };
  }, []);

  return (
    <Container maxWidth="md">
      <Paper style={{ padding: "22px" }}>
        <Formik
          initialValues={{
            product_name: "",
            product_description: "",
            product_price: "",
            store_name: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.product_name) {
              errors.product_name = "Este campo não pode ser vazio";
            }
            if (!values.product_description) {
              errors.product_description = "Este campo não pode vazio";
            }
            if (!values.product_price) {
              errors.product_price = "este campo não pode ser vazio";
            }
            if (!values.store_name) {
              errors.product_price = "este campo não pode ser vazio";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values.store_name);
            Api.post("/produtos", {
              product_name: values.product_name,
              product_description: values.product_description,
              product_price: values.product_price,
              store_id: values.store_name,
              user_id: userId(),
            })
              .then(function (res) {
                console.log(res);
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
                    name="product_name"
                    label="nome do produto"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={10} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="product_description"
                    label="descrição do produto"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={10} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="number"
                    name="product_price"
                    label="preço do produto"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={10} xs={6}>
                  <Field
                    component={TextField}
                    type="text"
                    name="store_name"
                    label="escolha a loja"
                    select
                    variant="outlined"
                    helperText="escolha uma opção"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {store.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.store_name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

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

export default Register_product;
