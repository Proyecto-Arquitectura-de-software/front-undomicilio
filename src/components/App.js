import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import MiPedido from './MiPedido';
import Productos from './Productos';
import AgregarProductos from './AgregarProductos';
import EstablishmentsList from './EstablishmentsList';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      usuario: 3  // Por ahora se maneja por defecto el identificador del usuario
    };
  }

  render() {

    return (              
          <Router>  

          {/* Aqui se configuran las rutas de la aplicacion */}              

            {/* Ruta al Home de la aplicacion */}    
            <Route exact path = "/" render = { () => {
                return (
                  <Home/>                              
                )  
              }
              }>
            </Route>

            {/* Ruta a la pagina de establecimientos */}    
            <Route exact path = "/establecimientos" render = { () => {
                return (
                  <EstablishmentsList user = {this.state.usuario}/>                              
                )  
              }
              }>
            </Route>

            {/* Ruta a la pagina de pedidos */}    
            <Route exact path = "/mipedido" render = { () => {
                return (
                  <MiPedido/>                              
                )  
              }
              }>
            </Route>

            {/* Ruta a la pagina de edicion de productos */} 
            <Route exact path="/productos" render = {() => {
              return (
                <Productos/>
              )

            }
            }>
            </Route>

            {/* Ruta a la pagina de consulta y seleccion de productos */} 
            <Route exact path="/verproductos" render = {() => {
              return (
                <AgregarProductos user = {this.state.usuario}/>
              )

            }
            }>
            </Route>

          </Router>         
    );
  }

}


export default App;

