import React from 'react';

import { Box, Container, Avatar, Typography, Grid, CssBaseline } from '@material-ui/core/';

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";


import Copyright from '../../Copyright';
import useStyles from '../forms/forms.styles';

import PasswordRecoverForm from '../forms/PasswordRecover.form';


const PasswordRecover = () => {
    const classes = useStyles();
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperação de credenciais
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>       
            <PasswordRecoverForm />
          </Grid>
        </Grid>
               
        <Box mt={5}>
          <Copyright />
        </Box>
        </div>
      </Container>
    );
  }

export default PasswordRecover;