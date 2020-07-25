import React, { useContext, useState } from "react";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import {useHistory } from "react-router-dom";

import { Grid, LinearProgress, } from "@material-ui/core";
import MainButton from '../shop/Buttons/mainButton';


import Shopcontext from '../../context/ShopContext';
import useStyles from "./forms.styles";
import api from "../../Services/api";

export default function LoginForm() {
  const classes = useStyles();
  const history = useHistory()

  const [logIn, setLog] = useState(false);
  const { setTokens } = useContext(Shopcontext)

  if (logIn === true) {
    history.push('/dashboard')
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.password) {
          errors.password = "Este campo não pode ser vazio";
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
          .post("/login", {
            email: values.email,
            password: values.password,
          })
          .then(function (res) {
            if (res.data.status === true) {
              setSubmitting(false);
              // setLoggedIn(res.data);
              setTokens(res.data)
              setLog(true);
            }
          })
          .catch(function (err) {
            setSubmitting(false);
            alert(err);
          });
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                variant="outlined"
                component={TextField}
                type="email"
                name="email"
                label="email"
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
                disabled={isSubmitting} >
                Efetuar Login
              </MainButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
