import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import MiPedido from './MiPedido';
import Productos from './Productos';
//import EstablishmentsList from './EstablishmentsList';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
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

            {/* Ruta a la pagina de pedidos */}    
            <Route exact path = "/mipedido" render = { () => {
                return (
                  <MiPedido/>                              
                )  
              }
              }>
            </Route>

            <Route exact path="/productos" render = {() => {
              return (
                <Productos/>
              )

            }
            }>
            </Route>

          </Router>         
    );
  }

}


export default App;

