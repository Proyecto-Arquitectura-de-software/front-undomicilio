import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {Select, MenuItem, Button} from '@material-ui/core';
import '../styles/establishmentsList.css';
import { Loading } from './loading/loading';

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

// URL para consultar los pedidos de un cliente y un establecimiento dados
var pedidosURL = 'http://35.188.170.84:3100/pedidos_cliente/';

class EstablishmentsList extends Component{

  constructor(){

    super();

    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);

    this.state = {

        // usuario: '5dc22701c7900c00135e604c' // > > > Por ahora se maneja por defecto el identificador del usuario

      usuario: decoded.id // > > > Por ahora se maneja por defecto el identificador del usuario                                console.log(this.state.usuario.id);
      };
    this.scoreFilter = 0;
    //alert(this.props.user);
    this.maximumDeliveryTime = 10000;
    this.setFilterValue = (value) => {
        return (event) => {
            this[value] = event.target.value;
            this.setState(this.state);
        };
    };

    this.goToProducts = this.goToProducts.bind(this);
  }

  componentDidMount() {
      this.getList();
  }

  render(){
    if(this.state.list){
      return(
        <div>
          <div className="filtersDiv">
            <span className="filtersTitle">Filtros: </span>
            <Select value={this.scoreFilter} onChange={this.setFilterValue("scoreFilter")}>
                <MenuItem value={5}>5 estrellas</MenuItem>
                <MenuItem value={4}>4 estrellas</MenuItem>
                <MenuItem value={3}>3 estrellas</MenuItem>
                <MenuItem value={2}>2 estrellas</MenuItem>
                <MenuItem value={1}>1 estrella</MenuItem>
                <MenuItem value={0}>Puntuación</MenuItem>
            </Select>
            <span className="artificialMargin"/>
            <Select value={this.maximumDeliveryTime} onChange={this.setFilterValue("maximumDeliveryTime")}>
                <MenuItem value={15}>15 minutos</MenuItem>
                <MenuItem value={30}>30 minutos</MenuItem>
                <MenuItem value={60}>1 hora</MenuItem>
                <MenuItem value={10000}>Máximo tiempo de entrega</MenuItem>
            </Select>
            <span className="artificialMargin"/>
            <Button color="primary" onClick={this.getList.bind(this)}>Buscar</Button>

            {/* > > Incrustacion temporal de boton para editar productos < < */}
            <span className = "spacing"></span>
            <span className = "spacing"></span>
            <span className = "spacing"></span>

          </div>
          <ul className="establishmentList">
              {this.state.list.map(e => (
                  <li key = {e._id} className="establishmentDiv border">
                      <a name = {e._id}  onClick = {this.goToProducts} className="link">{e.name}</a><small className="category">{e.type}</small><br/>
                      <Rating className="scoreRating" value={e.score} readOnly={true} size="small"/>
                      <div>
                          <span className="subtitleText">Categorías: </span>
                          <span className="infoText">{e.categories.map(e => e + ", ")}</span>
                      </div>
                      <div>
                          <span className="subtitleText">Dirección: </span>
                          <span className="infoText">{e.address} </span>
                      </div>
                      <div>
                          <span className="subtitleText">Tiempo de entrega: </span>
                          <span className="infoText">{e.deliveryTime} min </span>
                      </div>
                      <div>
                          <span className="subtitleText">Costo de entrega: </span>
                          <span className="infoText">${e.deliveryCost}</span>
                      </div>
                  </li>
              ))}
          </ul>
        </div>
            );
        }else{
            return (<Loading/>)
        }
    }

    // Funcion para redirigir a los productos del establecimiento seleccionado
    goToProducts (e){

        let establecimiento = e.target.name;

        // Se cargan los pedidos del usuario y el establecimiento dados
        pedidosURL += this.state.usuario;
        pedidosURL += '/';
        pedidosURL += establecimiento;
        console.log('La URL');
        console.log(pedidosURL);

        axios.get(pedidosURL)
            .then(res => {
            const pedidos = res.data;
            //console.log(pedidos);
            console.log(establecimiento);
            this.setearPedido(pedidos, establecimiento);
        });

    }

    // Funcion que recoge todos los pedidos de un cliente y un establecimiento dados,
    // A continuacion, se busca si hay un pedido en curso o no.
    setearPedido(pedidos, id_establecimiento) {

        if (pedidos.length !== 0) {

            for (let i = 0; i < pedidos.length; i++){

              if (pedidos[i].estado === 'Creado'){
                window.location.href = "/verproductos/" + id_establecimiento;
                //this.setState({"estado" : 'creado'});
                //this.setState({"mipedido" : pedidos[i]});
                return;
              }
              else if (pedidos[i].estado === 'En curso'){
                // Se pasa el pedido que esta actualmente en curso
                window.location.href = "/pedidoencurso/" + pedidos[i].id;
                //this.setState({"estado" : 'curso'});
                //this.setState({"mipedido" : pedidos[i]});
                return;
              }
            }

            // Solo encontro pedidos finalizados, asi que se envia al componente MiPedido
            window.location.href = "/verproductos/" + id_establecimiento;

        }

        else {
            // No hay pedidos, se envia al componente MiPedido
            window.location.href = "/verproductos/" + id_establecimiento;
        }
      }



    // Funcio para obtener todos los establecimientos cercanos a las coordenadas dadas
    // ! ! ! COORDENADAS HARCODEADAS ! ! ! => falta que sean parametrizables por una vista de ubicacion
    getList(){
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `http://35.188.177.250:3002/graphql`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  let res = JSON.parse(xhr.responseText);
                  console.log(res.data.getEstablishments);

                  this.setState({"list" : res.data.getEstablishments});
                } else {
                  console.error(xhr.statusText);
                }
            }
        }.bind(this);

        let req = {
            query: `{
                getEstablishments(coordinateX: 4.630854,coordinateY: -74.050782,
                filters:[
                    {name: "minimumScore", value: "${this.scoreFilter}"},
                    {name: "maximumDeliveryTime", value: "${this.maximumDeliveryTime}"}
                ]){
                    _id
                    name
                    address
                    deliveryTime
                    deliveryCost
                    categories
                    score
                    type
                }
              }`
        }
        xhr.send(JSON.stringify(req));
    }

}


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
    paddingTop: theme.spacing(1),
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
  cardHeader: {
    backgroundColor: '#3f51b5',
    color: 'white',
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(0),
  },
  cardMedia: {
    paddingTop: '50%',
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
            <EstablishmentsList />
          </Grid>
          <Box pt={4}>

          </Box>
        </Container>
      </main>
    </div>
  );
}
