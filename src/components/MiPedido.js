import React, { Component } from 'react';
import axios from 'axios';
import { productos } from '../productos.json';
import { Chat } from './chat/chat';

// URL para consultar los pedidos de un cliente y un establecimiento dados
var pedidosURL = 'http://localhost:3100/pedidos_cliente/';

// URL para crear un nuevo pedido
var nuevoPedidoURL = 'http://localhost:3100/pedidos';

class MiPedido extends Component {
    constructor() {
      super();
      this.state = {
        usuario: '5dc22701c7900c00135e604c', // > > > Por ahora se maneja por defecto el identificador del usuario
        productos,         
        mipedido: {},
        envio: 1000,
        estado: null,
        message: "Cargando"
      };
    }
     
     componentDidMount() {   
    
      pedidosURL += this.state.usuario;
      pedidosURL += '/';
      pedidosURL += this.props.establecimiento;
    
      // Se cargan los pedidos del usuario y el establecimiento dados
      axios.get(pedidosURL)
        .then(res => {
        const pedido = res.data;     
        this.setearPedido(pedido);
      }); 

      //this.obtenerDatos();    
    }

    // Se determina si ya existe un pedido en proceso o creado. O por el contrario, se crea uno nuevo
    setearPedido(pedidos) {

      // this.state.pedido[0].estado works !!
  
      if (pedidos.length !== 0) {
          // Si hay pedidos
          // alert(pedido[0].estado);
  
          for (let i = 0; i < pedidos.length; i++){
            
            if (pedidos[i].estado === 'Creado'){
              //this.setState({"pedido" : pedido[i]});             
              this.setState({"estado" : 'creado'});     
              this.setState({"mipedido" : pedidos[i]});   
              return;         
            }
            else if (pedidos[i].estado === 'En curso'){
              this.setState({"estado" : 'curso'});  
              this.setState({"mipedido" : pedidos[i]});                          
              return;                     
            }
          }
          
          alert('Solo encontro finalizados y se crea un NUEVO pedido');
          // Solo encontro pedidos finalizados, asi que se crea un nuevo pedid
          this.nuevoPedido();
  
      }
      
      else { 
          alert('Se crea un NUEVO pedido');

          // No hay pedidos, se crea uno nuevo
          this.nuevoPedido();
      }               
    }

    nuevoPedido() {
         this.setState({"estado" : 'creado'});     
      
          let body = {
            "id_cliente": this.state.usuario,
            "id_establecimiento": this.props.establecimiento,
            "id_estado": 1, // (Creacion)
            "observaciones": "",
            "destino": ""
          }

          axios.post(nuevoPedidoURL, body)
              .then(response => {
                // console.log(response);
                console.log('data ' + response.data.insertId);
                body = {
                  "id": response.data.insertId,
                  "id_cliente": this.state.usuario,
                  "id_establecimiento": this.props.establecimiento,
                  "estado": 'Creado', 
                  "observaciones": "",
                  "destino": ""
                }
                this.setState({ "mipedido" : body});
              })
              .catch(error => {
                alert('fallo ' + error);
                console.log(error)
              });     
    }

    // Se cargan los productos y los datos del pedido
    async obtenerDatos(){      
      let get = await fetch('http://34.69.25.250:3100/pedidos/1');      
      let data = await get.json();
      this.setState({"pedidos" : data});
      //console.log("Los datos " + data);      
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
      
      
      if (this.state.mipedido){
        //alert(this.props.editable);
        console.log('Este es mi pedido creado: ');
        console.log(this.state.mipedido);
        const pedido = this.state.mipedido;              
        
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
                      className="btn btn-danger invisible">
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
                <h1 className="">Mi pedido</h1><br></br>

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
              {/*<Chat/>*/}
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
