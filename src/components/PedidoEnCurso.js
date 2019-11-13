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
      
     

      // Se cargan los datos del establecimiento
      /* establecimientoURL += this.props.establecimiento;

      axios.get(establecimientoURL)
        .then(res => {
        const establecimiento = res.data;     
        this.setState({"envio": establecimiento.deliveryCost});
        this.setState({"metodos": establecimiento.paymentMethods});
      })
      .catch(error => {
        alert('fallo obteniendo el establecimiento' + error);
        console.log(error)
      });  */

      const { match: { params } } = this.props;      
      //this.setState({ "establecimiento" : params.id_establecimiento});      

      obtenerPedidoURL += params.id_pedido;
      console.log(obtenerPedidoURL);
      this.obtenerPedido(obtenerPedidoURL);   
      
      obtenerProductosURL += params.id_pedido;            
      this.obtenerProductos(obtenerProductosURL);
    };

    // Se carga el pedido recibido como parametro
    async obtenerPedido(URL){      
      let get = await fetch(URL);      
      let data = await get.json();
      this.setState({"mipedido" : data});
      //console.log("Los datos " + data);      
    } 


    // Se cargan los id de los productos asociados al pedido en curso
    async obtenerProductos(URL){      
      let get = await fetch(URL);      
      let data = await get.json();
      this.setState({"productos" : data});
      //console.log("Los datos " + data);      
    } 
   
   /*  calcularSubtotal() {
      
      let resultado = 0;
      let prod = this.props.productosAgregados;

      for (var i = 0; i < prod.length; i++) {
        resultado += parseInt(prod[i].precio);
      }
      return resultado;
    } */



    validaciones() {

      let message_destino = "";
      let message_prod = "";
      if (document.getElementById("destino").value.length === 0) {
        message_destino = "!Tu pedido no tiene una direccion de destino¡";
      }

      if(this.props.productosAgregados.length <= 0){        
        message_prod = "!Tu pedido no tiene productos¡";              
      }
      
      this.setState({message_destino:  message_destino});
      this.setState({message_prod:  message_prod});

      return message_destino === "" && message_prod === "";

    }

    
  
    render() {               
      if (this.state.mipedido){        

        // El subcomponente que se va a mostrar en la seccion de productos
        let productos;

        // El componente de seleccion de metodos de pago segun el establecimiento
        let metodos;

        // Los productos que se van agregando al pedido, son en realidad props, pues son del state del componente AgregarProductos        
        if (this.state.productos.length > 0){
          productos = this.state.productos.map((item, i) => {
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
            <h3 className = "card card-header mb-2"><strong>Mi pedido</strong></h3>
            <form onSubmit = {this.enviarPedido}>              
              <div className = "card">
                <div className = "card-body"> 
                                    
                  <span>Destino 
                  <input
                    id = "destino"
                    type = "text"
                    name = "destino"
                    className = "form-control input border border-danger"  
                    placeholder = "e.g. Calle 4b #57 - 70"                
                  /> 
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
                    <span className = "">Observaciones 
                    <textarea
                      id = "observaciones"
                      type = "text"
                      name = "observaciones"
                      className = "form-control input"						                                        
                      rows = "2"                   
                    /> 
                    </span>  
                  </div>
                </div>                                    
              </div>
              
              <div className = "card mt-2 financiero">
                <div className = "card-body">                  
                  <div className = "ml-1">              
                    
                    <strong>{/*this.state.metodos*/}</strong>
                    <span className="">Metodo de pago:  </span>
                    <Select id = "metodo" value = {this.scoreFilter} onChange = {this.setFilterValue("scoreFilter")}>
                      {metodos}
                      <MenuItem value = {0}>Elige uno</MenuItem>                      
                    </Select>
                    <br></br><br></br>
                    <span className="">Subtotal: <strong>$ this.calcularSubtotal()</strong> </span><br></br>
                    <span className="">Envio: <strong>$ {this.state.envio}</strong> </span>            
                    
                    <div className = "separator mt-1 mb-1"></div>             
                    <h4 className="">Total: <strong>$ parseInt(this.state.envio) + parseInt(this.calcularSubtotal())</strong> </h4>
                  </div>                              
                  {/*<Chat></Chat>*/}
                  <button type = "submit" className = "btn btn-danger mt-2 mb-2 enviar">Enviar pedido</button> 
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
        return( <Loading/> );
      }
    }
  
}

export default PedidoEnCurso;