import React, { Component } from 'react';
import axios from 'axios';
import {Select, MenuItem} from '@material-ui/core';
import { Chat } from './chat/chat';

  import '../styles/pedido.css';
import { Loading } from './loading/loading';


// URL para obtener datos del establecimiento
var establecimientoURL = 'http://34.69.25.250:3001/establishments/';

// URL para obtener los datos de un pedido unico
var obtenerPedidoURL = 'http://34.69.25.250:3100/pedidos/';

// URL para obtener los productos asociados a un pedido unico
var obtenerProductosURL = 'http://34.69.25.250:3100/pedido_producto/';

class PedidoEnCurso extends Component {
    constructor() {
      super();
      this.scoreFilter = 0; // Corresponde al indice del select list de metodos de pago     
      this.state = {
        usuario: '5dc22701c7900c00135e604c', // > > > Por ahora se maneja por defecto el identificador del usuario            
        mipedido: {},
        productos: {},
        metodos: [],
        metodo_escogido: "",
        envio: 0,
        estado: null,
        message_destino: "",
        message_prod: "" 
      };
      
      this.setFilterValue = (value) => {
        return (event) => {
            this[value] = event.target.value;
            this.setState(this.state);
        };
    };
    }
     
    componentDidMount() {   
      

      const { match: { params } } = this.props;      


      obtenerPedidoURL += params.id_pedido;      
      this.obtenerPedido(obtenerPedidoURL);   
      
      obtenerProductosURL += params.id_pedido;              
      this.obtenerProductos(obtenerProductosURL);
    };

    // Se carga el pedido recibido como parametro
    async obtenerPedido(URL){      
      let get = await fetch(URL);      
      let data = await get.json();
      console.log(data);
      this.setState({"mipedido" : data});
      //console.log("Los datos " + data);      
    } 


    // Se cargan los id de los productos asociados al pedido en curso
    async obtenerProductos(URL){      
      let get = await fetch(URL);      
      let data = await get.json();
      console.log(data);
      this.setState({"productos" : data});
      //console.log("Los datos " + data);      
    } 
 

    // Falta cargar la informacion completa de los productos
    // Nombre, image, descripcion, precio...

    
  
    render() {     
            
      if (this.state.mipedido.length > 0){        
        //console.log(this.state.mipedido[0].destino);
        // El subcomponente que se va a mostrar en la seccion de productos
        let productos;

        // El componente de seleccion de metodos de pago segun el establecimiento
        let metodos;

        // Los productos que se van agregando al pedido, son en realidad props, pues son del state del componente AgregarProductos        
        if (this.state.productos.length > 0){
          productos = this.state.productos.map((item,i) => {
            return(
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h3>{item.id_producto}</h3>
                    <div className="cardImg">
                      <img src={item.image} width="150px" height="150px" alt = "Descripcion de la imagen"/>
                    </div>                
                    <p className="text badge badge-warning mt-2">$ {item.price}</p>
                  </div>
                  <div className="center mt-2 mb-2">    
                  <span>{item.description}</span> 
                  </div>
                 
                </div>
              </div>  
            )
          })
        }   
        else {
          productos = 
          <div>
            <h3 className = "empty-products">No has agregado productos</h3 >
          </div>
        }  

        metodos = this.state.metodos.map((item, i) => {
          return (                    
            <MenuItem value = {i+1}>{item}</MenuItem>                                         
          )
        });
      
        // No se han agregado productos al pedido
        ////onClick = {() => this.props.eliminarProducto.bind(this, item.publicationID)}>       
                
    
        return (  
          
          <div>                                        
            <h3 className = "card card-header mb-2"><strong>Pedido en curso</strong></h3>
            <form onSubmit = {this.enviarPedido}>              
              <div className = "card">
                <div className = "card-body"> 
                                    
                  <span className = "navbar-brand">Destino: 
                    <strong> {this.state.mipedido[0].destino}</strong>
                  </span>

                  <div className = "mt-3">
                    <p className = "navbar-brand">
                      Productos
                    <span className = "badge badge-pill badge-info ml-2">
                      {this.state.productos.length}
                    </span>
                    </p> 
                  </div>             
                  
                  <div className = "container-fluid mb-4">                     
                    <div className = "col-md-12">
                        <div className = "row">
                          {productos}
                        </div>
                      </div>              
                  </div>

                  <div className = "mt-3">
                    <span className = "navbar-brand">Observaciones: 
                      <strong className = "text-break text-wrap"> {this.state.mipedido[0].observaciones}</strong>
                    </span>  
                  </div>
                </div>                                    
              </div>
              
              <div className = "card mt-2 financiero">
                <div className = "card-body">                  
                  <div className = "ml-1">              
                    
                    <strong>{/*this.state.metodos*/}</strong>
                    <span className = "navbar-brand">Metodo de pago: 
                      <strong> {this.state.mipedido[0].metodo_pago}</strong>
                    </span>
                    <br></br><br></br>
                    <span className="">Subtotal: <strong>$ this.calcularSubtotal()</strong> </span><br></br>
                    <span className="">Envio: <strong>$ {this.state.envio}</strong> </span>            
                    
                    <div className = "separator mt-1 mb-1"></div>             
                    <h4 className="">Total: <strong>$ parseInt(this.state.envio) + parseInt(this.calcularSubtotal())</strong> </h4>
                  </div>                              
                  {/*<Chat></Chat>*/}
                  <button type = "submit" className = "btn btn-danger mt-2 mb-2 enviar">Mi pedido ha llegado</button> 
                  <span className = ""><strong>{this.state.message_destino}</strong></span>
                  <br></br>
                  <span className = ""><strong>{this.state.message_prod}</strong></span>
                </div>
              </div>  

            </form>
           
          </div>         
        );
      }
      else {
        console.log('! ! VACIO')
        return( <Loading/> );
      }
    }
  
}

export default PedidoEnCurso;