import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import {Link, LinearProgress, Grid, Button} from "@material-ui/core";

import MainButton from '../shop/Buttons/mainButton';

import api from "../../Services/api";
import useStyles from "./forms.styles";

export default function RegisterForm() {
  const classes = useStyles();
  const [logIn, setLog] = useState(false);

  if (logIn === true) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.password) {
          errors.password = "Este campo não pode ser vazio";
        }
        if (!values.username) {
          errors.username = "Este campo não pode vazio";
        }
        if (!values.email) {
          errors.email = "este campo não pode ser vazio";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Endereço de email invalido";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        api
          .post("/register", {
            username: values.username,
            email: values.email,
            password: values.password,
          })
          .then(function (res) {
            if (res.data.status === true) {
              setSubmitting(false);
              setLog(true);
            }
            if (res.data.status === false) {
              alert(JSON.stringify(res.data.message));
              setSubmitting(false);
            }
          })
          .catch(function (err) {
            setSubmitting(false);
            console.log(err);
          });
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form className={classes.form}>
          <Grid container spacing={3}>
            
            <Grid item xs={12}>
              <Field
                variant="outlined"
                component={TextField}
                type="text"
                name="username"
                label="insira seu nome completo"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                variant="outlined"
                component={TextField}
                type="email"
                name="email"
                label="insira seu endereço de email"
                autoComplete="email"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                variant="outlined"
                component={TextField}
                type="password"
                name="password"
                label="senha"
                autoComplete="current-password"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              {isSubmitting && <LinearProgress />}

              <MainButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}>
                Entrar
              </MainButton>
            </Grid>      

          </Grid>
        </Form>
      )}
    </Formik>
  );
}
