import React, { Component } from 'react';
import { productos } from '../productos.json';

class MiPedido extends Component {
    constructor() {
      super();
      this.state = {
        productos,
        envio : 1000,
        message : "Cargando"
      };
    }

     // Se ejecuta cuando se carga el componente
     componentDidMount() {      
      this.obtenerDatos();    
    }

    async obtenerDatos(){      
      let get = await fetch('http://localhost:3100/pedidos/1');      
      let data = await get.json();
      this.setState({"pedido" : data});
      console.log("Los datos " + data);
          
    }

    calcularSubtotal() {
      
      let resultado = 0;
      let prod = this.state.productos;

      for (var i = 0; i < prod.length; i++) {
        resultado += parseInt(prod[i].precio);
      }

      return resultado;

    }
  
    render() {      
      
      
      if (this.state.pedido){

        const pedido = this.state.pedido[0];              
        
        const productos = this.state.productos.map((item, i) => {
          return (            
              <div className="col-md-4" key={i}>
                <div className="card mt-4">
                  <div className="card text-center">
                    <h3>{item.nombre}</h3>
                    <h4>
                      <span className="badge badge-pill badge-warning ml-2">
                        $ {item.precio}
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

                <p className="">Destino: <strong>{pedido.destino}</strong> </p>              
                <p className="">Estado: <strong>{pedido.estado}</strong> </p>
              </div>            
            </div>          
              
              <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                  Productos
                  <span className="badge badge-pill badge-light ml-2">
                    {this.state.productos.length}
                  </span>
                </a>
              </nav>

              <div className="container mb-4">                     
                <div className="col-md-12">
                    <div className="row">
                      {productos}
                    </div>
                  </div>              
              </div>

              <div>
                <div className="ml-4">              
                  <p className="">Observaciones: <strong>{pedido.observaciones}</strong> </p>              
                  <p className="">Subtotal: <strong>$ {this.calcularSubtotal()}</strong> </p>
                  <p className="">Envio: <strong>$ {this.state.envio}</strong> </p>                  

                  <h4 className="">Total: <strong>$ {parseInt(this.state.envio) + parseInt(this.calcularSubtotal())}</strong> </h4>
                </div>            
              </div>

          </div>         
        );
      }
      else {
        return(
          <div>
            {this.state.message}
          </div>
        );

      }
    }
  
}

export default MiPedido;
