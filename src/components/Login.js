import React  , {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    display: 'none',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),     
  },
}));



export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);
  const [redirect:"false", setRedirect] = useState(0);
  

  const handleEvent = (event) => {
    if (event.target.name == "email"){
      setEmail(event.target.value)
    } else {
      setPassword(event.target.value)
    } 
  }

  const submit = (event) => {

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `http://35.188.177.250:3002/graphql`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              let res = JSON.parse(xhr.responseText);
              console.log(res.data.login);
              localStorage.setItem('token', res.data.login)
              //this.setState({"list" : res.data.getEstablishments});
              if (res.data.login !== 'Wrong credentials') {
                setRedirect('true');
              }
            } else {
              console.error(xhr.statusText);
            }
          }
    }.bind(this);

    let req = {
        query: `{
          login(credentials:{
            password: "${password}"
            username: "${email}"
          })
        }`
    }

    xhr.send(JSON.stringify(req));
  }

  if (redirect == "true"){
    return (<Redirect to = "/establecimientos" />);
  } else {
    return (
      <Container component = "main" maxWidth = "xs">
        <CssBaseline />
        <div className = {classes.paper}>
          <Avatar className = {classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component = "h1" variant = "h5">
            Inicia sesión en UNdomicilio
          </Typography>
          <form className = {classes.form} noValidate>
            <TextField 
              onChange = {handleEvent}
              variant = "outlined"
              margin = "normal"
              required
              fullWidth
              id = "email"
              label = "Email o nombre de usuario"
              name = "email"
              autoComplete = "email"
              autoFocus
            />
            <TextField
              onChange = {handleEvent}
              variant = "outlined"
              margin = "normal"
              required
              fullWidth
              name = "password"
              label = "Contraseña"
              type = "password"
              id = "password"
              autoComplete = "current-password"
            />
            <FormControlLabel
              control = {<Checkbox value = "remember" color = "primary" />}
              label = "Recuerda mis datos"
            />
            <Button
              onClick = {submit}              
              fullWidth
              variant = "contained"
              color = "primary"
              className = {classes.submit}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href = "#" variant = "body2" className = 'invisible'>
                  ¿Olvidaste tu clave?
                </Link>
              </Grid>
              <Grid item>
                <Link href = "/registro" variant = "body2" className = 'invisible'>
                  {"¿No tienes cuenta? Regístrate aquí"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    );
  }
}