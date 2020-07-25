import React from "react";
import { Formik, Form, Field } from "formik";

import TextField from "@material-ui/core/TextField";

import { Link, LinearProgress, Grid, Button } from "@material-ui/core";


import useStyles from "./forms.styles";

const PasswordRecover = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Este campo não pode ser vazio";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Endereço de email inválido";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
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
                label="Email"
                autoComplete="email"
                fullWidth
                autoFocus
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
                className={classes.submit}>
                Solicitar uma nova senha
              </Button>
            </Grid>

            <Grid container justify="flex-end" className={classes.textFormArea}>
              <Grid item xs={12}>
                <Link href="/login" variant="body2">
                  {"Volta à página de login"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordRecover;
