import React, { Component } from 'react';
import axios from 'axios';
import { productos } from '../productos.json';
import { Chat } from './chat/chat';

  import '../styles/pedido.css';

// URL para consultar los pedidos de un cliente y un establecimiento dados
var pedidosURL = 'http://localhost:3100/pedidos_cliente/';

// URL para crear un nuevo pedido
var nuevoPedidoURL = 'http://localhost:3100/pedidos';

// URL para obtener datos del establecimiento
var establecimientoURL = 'http://34.69.25.250:3001/establishments/';

class MiPedido extends Component {
    constructor() {
      super();
      this.state = {
        usuario: '5dc22701c7900c00135e604c', // > > > Por ahora se maneja por defecto el identificador del usuario            
        mipedido: {},
        metodos: [],
        envio: 0,
        estado: null,
        message: "Cargando"
      };
    }
     
    componentDidMount() {   
      
      // Se cargan los pedidos del usuario y el establecimiento dados
      pedidosURL += this.state.usuario;
      pedidosURL += '/';
      pedidosURL += this.props.establecimiento;
          
      axios.get(pedidosURL)
        .then(res => {
        const pedido = res.data;     
        this.setearPedido(pedido);
      }); 

      // Se cargan los datos del establecimiento
      establecimientoURL += this.props.establecimiento;

      axios.get(establecimientoURL)
        .then(res => {
        const establecimiento = res.data;     
        this.setState({"envio": establecimiento.deliveryCost});
        this.setState({"metodos": establecimiento.paymentMethods});
      })
      .catch(error => {
        alert('fallo obteniendo el establecimiento' + error);
        console.log(error)
      }); 

      //this.obtenerDatos();    
    }

   /*  // Se cargan los productos y los datos del pedido
    async obtenerDatos(){      
      let get = await fetch('http://34.69.25.250:3100/pedidos/1');      
      let data = await get.json();
      this.setState({"pedidos" : data});
      //console.log("Los datos " + data);      
    } */ 

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
                //console.log('data ' + response.data.insertId);
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
                alert('fallo creando pedido' + error);
                console.log(error)
              });     
    }   

    calcularSubtotal() {
      
      let resultado = 0;
      let prod = this.props.productosAgregados;

      for (var i = 0; i < prod.length; i++) {
        resultado += parseInt(prod[i].precio);
      }
      return resultado;
    }
  
    render() {     
      
      
      if (this.state.mipedido){      
        //console.log('Este es mi pedido creado: ');
        //console.log(this.state.mipedido);
        //const pedido = this.state.mipedido;    

        // El subcomponente que se va a mostrar en la seccion de productos
        let productos;

        // Los productos que se van agregando al pedido, son en realidad props, pues son del state del componente AgregarProductos        
        if (this.props.productosAgregados.length > 0){
          productos = this.props.productosAgregados.map((item, i) => {
            return (            
              <div className = "col-md-12 mb-2" key = {i}>     
                <span className = "nombre">{item.nombre}</span>
                <span
                  className = "remove right badge badge-pill badge-danger ml-2"
                  onClick = {() => this.props.eliminarProducto(i)}>           
                  x
                </span>
                <span className = "text right badge badge-pill badge-warning">
                  $ {item.precio}
                </span>        
              </div>            
            )
          }); 
        }   
      
        // No se han agregado productos al pedido
        ////onClick = {() => this.props.eliminarProducto.bind(this, item.publicationID)}>       
        else {
          productos = 
          <div>
            <h3>No has agregado productos</h3 >
          </div>

        }          
    
        return (  
          
          <div>                                        
            <h1 className="card card-header mb-2">Mi pedido</h1>
            <form>              
              <div className="card">
                <div className="card-body"> 
                                    
                  <span>Destino 
                  <input
                    type = "text"
                    name = "destino"
                    className = "form-control input border border-danger"						
                    onChange = {this.changeHandler}                                           
                  /> 
                  </span>                                                   

                  <div className = "mt-3">
                    <p className="navbar-brand">
                      Productos
                    <span className="badge badge-pill badge-info ml-2">
                      {this.props.productosAgregados.length}
                    </span>
                    </p> 
                  </div>             
                  
                  <div className="container-fluid mb-4">                     
                    <div className="col-md-12">
                        <div className="row">
                          {productos}
                        </div>
                      </div>              
                  </div>

                  <div className = "mt-3">
                    <span className="">Observaciones 
                    <textarea
                      type = "text"
                      name = "observaciones"
                      className = "form-control input"						
                      onChange = {this.changeHandler}                        
                      rows = "3"                   
                    /> 
                    </span>  
                  </div>
                </div>                                    
              </div>
              
              <div className = "card mt-2 financiero">
                <div className = "card-body">                  
                  <div className="ml-1">              
                    
                    <p className="">Metodos de pago: <strong>{this.state.metodos}</strong> </p>
                    <p className="">Subtotal: <strong>$ {this.calcularSubtotal()}</strong> </p>
                    <p className="">Envio: <strong>$ {this.state.envio}</strong> </p>                      <br></br>             
                    <h4 className="">Total: <strong>$ {parseInt(this.state.envio) + parseInt(this.calcularSubtotal())}</strong> </h4>
                  </div>                              
                  {/*<Chat></Chat>*/}
                  <button type = "submit" className = "btn btn-danger mt-2 enviar">Enviar pedido</button>
                </div>
              </div>  

            </form>
           
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