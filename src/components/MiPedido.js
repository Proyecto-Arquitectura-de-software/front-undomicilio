import React, { Component } from 'react';
import { productos } from '../productos.json';

class MiPedido extends Component {
    constructor() {
      super();
      this.state = {
        productos               
      };
    }
  
    render() {

      const productos = this.state.productos.map((item, i) => {
        return (
          <div className="col-md-4" key={i}>
            <div className="card mt-4">
              <div className="card-title text-center">
                <h3>{item.nombre}</h3>
                <h4>
                  <span className="badge badge-pill badge-warning ml-2">
                    {item.precio}
                  </span>
                </h4>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger invisible"
                  onClick={console.log('Para eliminar')}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )
      });
  
      return (

        <div>          
          
          <div>
            <div className="ml-4 mt-3">
              <h1 className="text-center">Estado de mi pedido</h1>

              <p className="">Destino: </p>              
              <p className="">Estado: </p>
            </div>            
          </div>

          <div className="MiPedido">
            
            <nav className="navbar navbar-dark bg-dark">
              <a className="navbar-brand" href="/">
                Productos
                <span className="badge badge-pill badge-light ml-2">
                  {this.state.productos.length}
                </span>
              </a>
            </nav>

            <div className="container">
              <div className="row mt-4">          
                <div className="col-md-8">
                  <div className="row">
                    {productos}
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div> 
      );
    }
  
}

export default MiPedido;