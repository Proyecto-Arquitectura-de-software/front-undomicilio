import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import BusinessIcon from '@material-ui/icons/Business';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>
    <ListItem button component={Link} to="/productos">
      <ListItemIcon>
        <FastfoodIcon />
      </ListItemIcon>
      <ListItemText primary="Productos" />
    </ListItem>
    <ListItem button component={Link} to="/establecimientos">
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Establecimientos" />
    </ListItem>
    <ListItem button component={Link} to="/login">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary = "Iniciar sesión" />
    </ListItem>

  </div>
);
