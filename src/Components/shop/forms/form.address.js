import React from "react";

import { Formik, Form, Field } from "formik";
import { Grid, LinearProgress, Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";

import Api from "../../../Services/api";

function RegisterAddress() {
  return (
    <Formik
      initialValues={{
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.rua) {
          errors.rua = "Este campo não pode ser vazio";
        }
        if (!values.numero) {
          errors.numero = "Este campo não pode ser vazio";
        }
        if (!values.bairro) {
          errors.bairro = "Este campo não pode ser vazio";
        }
        if (!values.cidade) {
          errors.cidade = "Este campo não pode ser vazio";
        }
        if (!values.estado) {
          errors.estado = "Este campo não pode ser vazio";
        }
        if (!values.pais) {
          errors.pais = "Este campo não pode ser vazio";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        Api.post("ENDPOINT", {
          rua: values.rua,
          numero: values.numero,
          bairro: values.bairro,
          cidade: values.cidade,
          estado: values.estado,
          pais: values.pais,
        })
          .then(function (res) {
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          });
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item lg={6} xl={12} xs={12}>
              <Field
                variant="outlined"
                component={TextField}
                type="text"
                name="rua"
                label="Rua"
                fullWidth
              />
            </Grid>
            <Grid item lg={2} xl={8} xs={12}>
              <Field
                variant="outlined"
                component={TextField}
                type="text"
                name="numero"
                label="numero"
                fullWidth
              />
            </Grid>
            <Grid item lg={4} xl={4} xs={12}>
              <Field
                variant="outlined"
                component={TextField}
                type="text"
                name="bairro"
                label="bairro"
                fullWidth
              />
            </Grid>

            <Grid item lg={6} xl={4} xs={12}>
              <Field
                variant="outlined"
                component={TextField}
                type="text"
                name="cidade"
                label="cidade"
                fullWidth
              />
            </Grid>
            <Grid item lg={4} xl={4} xs={12}>
              <Field
                variant="outlined"
                component={TextField}
                type="text"
                name="pais"
                label="pais"
                fullWidth
              />
            </Grid>

            <Grid item lg={2} xl={4} xs={12}>
              <Field
                variant="outlined"
                component={TextField}
                type="text"
                name="estado"
                label="estado"
                fullWidth
              />
            </Grid>



            <Grid item xs={12}>
              {isSubmitting && <LinearProgress />}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Entrar
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterAddress;
