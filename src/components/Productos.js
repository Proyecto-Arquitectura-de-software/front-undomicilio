import React, { Component } from 'react';
import axios from 'axios';
import ProductsPostForm from './ProductosPostForm';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './listItems';

// URL para consultar los productos del establecimiento logueado como usuario
var apiUrl = 'http://34.70.223.126:3010/products/establishment/';


class Productos extends Component {

    constructor(props) {
      super(props);
      this.state = {
        establecimiento: '5db30354c7900c00135e604a', // < < < ID temporal al final > > >
        error: null,
        products: [],
        response: {}
      }
  }

  componentDidMount() {

    apiUrl += this.state.establecimiento;

    // Se cargan los productos del establecimiento logueado
    axios.get (apiUrl)
    .then(res => {
      const products = res.data;
      this.setState({ products });
    })
  }
  deleteProduct(publicationID) {
    const { products } = this.state;
    axios.delete(apiUrl + publicationID).then(result=>{
     alert(result.data);
      this.setState({
        response:result,
        products:products.filter(item=>item.publicationID !== publicationID)
      });
    });
  }






  render() {
        const producto = this.state.products.map((item,i)=>{
          return(
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <div className="cardImg">
                    <img src={item.image} width="100px" height="100px" alt = "Descripcion de la imagen" />
                  </div>
                  <span className="badge badge-warning ml-2">{item.price} COP</span>
                </div>
                <div className="card-body">
                  <span>{item.description}</span>
                </div>
                <div className="card-footer">
                  {/* ! ! ! Se oculta temporalmente el boton de Editar hasta que se implemente la funcionalidad
                  <button className="btn btn-info invisible" onClick={() => this.props.editProduct(item.publicationID)}>Edit</button>
                  */}
                  <button className="btn btn-danger agregar" onClick={() => this.deleteProduct(item.publicationID)}>Eliminar</button>
                </div>
              </div>
            </div>
          )
        })


        return (
          <div>
            <nav className="navbar navbar-dark bg-dark">
              <a className="text-white" href="/establecimientos" >
                Establecimiento
                <span className="badge badge-pill badge-light ml-2">
                  Productos totales: {this.state.products.length}
                </span>
              </a>
            </nav>
            <div className="container-fluid">
              <div className="row mt-4">

                <div className="col-md-4 text-center">
                <ProductsPostForm/>
                </div>

                <div className="col-md-8">
                  <div className="row">
                    {producto}
                  </div>
                </div>
              </div>
          </div>

        </div>
        );

  }
}

export default Productos

/*
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  busqueda: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 370,

  },
  busquedaBoton: {
    padding: 13,
  },
}));


export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
            UN domicilio
          </Typography>
          <IconButton color="inherit" className = 'invisible'>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
          <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Productos />
          </Grid>
          <Box pt={4}>

          </Box>
        </Container>
      </main>
    </div>
  );
}
*/
