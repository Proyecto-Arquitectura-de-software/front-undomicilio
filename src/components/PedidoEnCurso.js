import React, { Component } from 'react';
import axios from 'axios';
import {Select, MenuItem} from '@material-ui/core';
import { Chat } from './chat/chat';

  import '../styles/pedido.css';
import { Loading } from './loading/loading';


// URL para obtener datos del establecimiento
//var establecimientoURL = 'http://34.69.25.250:3001/establishments/';

// URL para obtener los datos de un producto
var productoURL = 'http://34.69.25.250:3000/products/';

// URL para obtener informacion de facturacion
var obtenerFacturaURL = 'http://34.69.25.250:8000/service/factura/factura/';

// URL para obtener los datos de un pedido unico
var obtenerPedidoURL = 'http://34.69.25.250:3100/pedidos/';

// URL para obtener los productos asociados a un pedido unico
var obtenerProductosURL = 'http://34.69.25.250:3100/pedido_producto/';

class PedidoEnCurso extends Component {
    constructor() {
      super();      
      this.state = {        
        mipedido: {},
        productos: {},
        metodos: [],
        metodo_escogido: "",
        envio: 0,
        total: 0
      };
      
      
    }
     
    componentDidMount() {   
      

      const { match: { params } } = this.props;      


      obtenerPedidoURL += params.id_pedido;      
      this.obtenerPedido(obtenerPedidoURL);   
      
      obtenerProductosURL += params.id_pedido;              
      this.obtenerProductos(obtenerProductosURL);
      
      this.obtenerFactura(obtenerFacturaURL);
    };

    // Se carga el pedido recibido como parametro
    async obtenerPedido(URL){      
      let get = await fetch(URL);      
      let data = await get.json();
      //console.log(data);
      this.setState({"mipedido" : data});
      //console.log("Los datos " + data);      
    } 


    // Se cargan los id de los productos asociados al pedido en curso
    async obtenerProductos(idsURL){      

      let get = await fetch(idsURL);      
      let id_productos = await get.json();

      let URL;
      let productos = [];
      let data;

      for (let i = 0; i < id_productos.length; i++){
        
        // Se hace la peticion de la informacion de cada producto
        URL = productoURL + id_productos[i].id_producto;

        data = await fetch(URL); 
        data = await data.json();

        productos.push(data);
      }

      this.setState({"productos" : productos});      
    } 
 

    // Se cargaa la informacion financiera del pedido 
    async obtenerFactura(URL){      

      let get = await fetch(URL);      
      let financiero = await get.json();
      
      console.log(financiero);

      //console.log(this.state.mipedido[0].id);            
      let factura;

      for (let i = 0; i < financiero.length; i++){
                
        
        if (this.state.mipedido.length > 0){

          // Si el id del pedido guardado en la factura coincide con el pedido cargado actualmente, hemos hallado el pedido que estamos buscando
          if (financiero[i].pedido_id === this.state.mipedido[0].id){          
            factura = financiero[i];
            break;
          }
        }
      }

      if (this.state.mipedido.length > 0){
        this.setState({"envio" : factura.impuesto_IVA});
        this.setState({"total" : factura.costo_total});

        console.log(this.state.envio);
        console.log(this.state.total);
      }
      //console.log("Los datos " + data);      
    } 

    
  
    render() {     
            
      if (this.state.productos.length > 0){        
        //console.log(this.state.mipedido[0].destino);
        // El subcomponente que se va a mostrar en la seccion de productos
        let productos;

        // El componente de seleccion de metodos de pago segun el establecimiento
        let metodos;

        // Los productos que conforman el pedido            
        productos = this.state.productos.map((item,i) => {
          return(
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card center">                  
                  <h3>{item[0].name}</h3>
                </div>  
                <div className="card-header">
                  <div className="cardImg">
                    <img src={item[0].image} width="150px" height="150px" alt = "Descripcion de la imagen"/>
                  </div>                
                  <p className="text badge badge-warning mt-2">$ {item[0].price}</p>
                </div>
                <div className="center mt-2 mb-2">    
                  <span>{item[0].description}</span> 
                </div>                
              </div>
            </div>  
          )
        })

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
                    <span className="">Subtotal: <strong>$ {parseInt(this.state.total) - parseInt(this.state.envio)}</strong> </span><br></br>
                    <span className="">Envio: <strong>$ {this.state.envio}</strong> </span>            
                    
                    <div className = "separator mt-1 mb-1"></div>             
                    <h4 className="">Total: <strong>$ {this.state.total}</strong> </h4>
                  </div>                              
                  {<Chat></Chat>}
                  <button type = "submit" className = "btn btn-danger mt-2 mb-2 enviar">Mi pedido ha llegado</button> 
                </div>
              </div>  

            </form>
           
          </div>         
        );
      }
      else {
        //console.log('! ! VACIO')
        return( <Loading/> );
      }
    }
  
}

export default PedidoEnCurso;