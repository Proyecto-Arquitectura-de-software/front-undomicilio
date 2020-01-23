import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaceIcon from '@material-ui/icons/Place';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FastfoodIcon from '@material-ui/icons/Fastfood';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <PlaceIcon />
      </ListItemIcon>
      <ListItemText primary="Mi ubicación" />
    </ListItem>
    <ListItem button component={Link} to="/productos">
      <ListItemIcon>
        <FastfoodIcon />
      </ListItemIcon>
      <ListItemText primary="Productos" />
    </ListItem>
    <ListItem button component={Link} to="/mipedido">
      <ListItemIcon>
        <AddShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Mi pedido" />
    </ListItem>
    <ListItem button component={Link} to="/establecimientos">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Establecimientos" />
    </ListItem>
    <ListItem button component={Link} to="/login">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Cuentas" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Historicos" />
    </ListItem>
  </div>
);
