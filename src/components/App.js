import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import MiPedido from './MiPedido';
import PedidoEnCurso from './PedidoEnCurso';
import Productos from './Productos';
import AgregarProductos from './AgregarProductos';
import EstablishmentsList from './EstablishmentsList';
import Login from './Login';
import Registro from './Registro';


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
            <Route exact path = "/productos" render = {() => {
              return (
                <Productos/>
              )
            }
            }>
            </Route>

            {/* Ruta a la pagina de consulta y seleccion de productos */}
            <Route path = "/verproductos/:id_establecimiento" component = {AgregarProductos}></Route>

            <Route path = "/pedidoencurso/:id_pedido" component = {PedidoEnCurso}></Route>

            {/* Ruta a la pagina de consulta y seleccion de productos 
            <Route path = "/verproductos/:id_establecimiento" render = {() => {
              return (
                <AgregarProductos user = {this.state.usuario}/>
              )

            }
            }>
            </Route>*/}

            {/* Ruta a la pagina de login */}
            <Route exact path = "/login" render = { () => {
                return (
                  <Login/>
                )
              }
              }>
            </Route>

            {/* Ruta a la pagina de registro */}
            <Route exact path = "/registro" render = { () => {
                return (
                  <Registro/>
                )
              }
              }>
            </Route>

          </Router>
    );
  }

}


export default App;
