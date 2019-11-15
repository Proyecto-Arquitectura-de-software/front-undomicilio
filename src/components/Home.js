// import React, { Component } from 'react';
// // import EstablishmentsList from './EstablishmentsList';
// import {Button} from '@material-ui/core';
// import '../styles/home.css';
//
// class Home extends Component {
//
//     render() {
//
//       return (
//           <div>
//               <h1>Pagina principal</h1>
//               <p>
//                 Bienvenido a UN domicilio
//               </p>
//
//               <div className="center">
//                 <span className="spacing">
//                   {/*En caso de necesitar usar Link: <Link to ='/mipedido'>Soy un cliente </Link>*/}
//                   <Button href="/establecimiento" variant="outlined" color="primary">Soy un cliente</Button>
//                 </span>
//
//                 <span className="spacing">
//                   <Button href="/productos" variant="outlined" color="secondary">Soy un Establecimiento</Button>
//                 </span>
//               </div>
//           </div>
//       );
//     }
//
// }
//
// export default Home;


import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <RestaurantOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            UN Domicilio
          </Typography>
          <form className={classes.form} noValidate>

            <Button
              href="/login"
              color="primary"
              fullWidth
              variant="contained"
              className={classes.button}
            >
              Iniciar sesión
            </Button>

            <Button
              href="/registro"
              color="secondary"
              fullWidth
              variant="contained"
              className={classes.button}
            >
              Registrarse
            </Button>
            <Box mt={0}>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
