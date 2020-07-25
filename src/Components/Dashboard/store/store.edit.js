import React, { memo } from "react";

import {
  Dialog,
  Grid,
  Button,
  LinearProgress,
  MenuItem,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Fragment } from "react";
import Api from "../../../Services/api";

function Editstore({ data }) {

  if (data.store) {
    return (
      <Dialog
        maxWidth="md"
        style={{ display: "flex", justifyContent: "center" }}
        open={data.open}
        onClose={data.handleClose}
      >
        <Formik
          initialValues={{
            store_name: data.store.store_name,
            store_description: data.store.store_description,
            store_slug: data.store.store_slug,
            store_phone: data.store.store_phone,
            store_address: data.store.store_address,
            delivery_fee: data.store.delivery_fee,
            pickup_in_store: data.store.pickup_in_store,
            store_whats: data.store.store_whats,
            store_address: data.store.store_address,
          }}
          onSubmit={(values, { setSubmitting }) => {
            Api.put("/loja", {
              id: data.store.id,
              store_name: values.store_name,
              store_description: values.store_description,
              store_slug: values.store_slug,
              store_phone: values.store_phone,
              store_whats: values.store_whats,
              store_address: values.store_address,
              delivery_fee: values.delivery_fee,
              pickup_in_store: values.pickup_in_store,
            })
              .then(function (res) {
                if (res.data.status === true) {
                  data.handleClose();
                }
                setSubmitting(false);
              })
              .catch(function (err) {});
          }}
        >
          {({ handleSubmit, isSubmitting, values }) => (
            <Form style={{ margin: "50px" }}>
              <Grid container spacing={2}>
                <Grid item lg={12} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_name"
                    label="nome da sua loja"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_description"
                    label="breve descrição da sua loja"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_address"
                    label="endereço"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_slug"
                    label="link personalizado"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_phone"
                    label="telefone da sua loja sem espaços"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="text"
                    name="store_whats"
                    label="whatsapp da sua loja"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={6} xs={6}>
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

                <Grid item lg={6} xs={6}>
                  <Field
                    variant="outlined"
                    component={TextField}
                    type="number"
                    name="delivery_fee"
                    label="Taxa de entrega"
                    fullWidth
                  />
                </Grid>

                <Grid item lg={12} xs={12}>
                  {isSubmitting && <LinearProgress />}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    enviar alteraçoes
                  </Button>
                </Grid>

                <Grid container justify="flex-end"></Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Dialog>
    );
  } else {
    return <Fragment></Fragment>;
  }
}

export default memo(Editstore);
