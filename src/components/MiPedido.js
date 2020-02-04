import React, { Component } from 'react';
import axios from 'axios';
import {Select, MenuItem} from '@material-ui/core';
import { Chat } from './chat/chat';
import jwt_decode from 'jwt-decode';

import '../styles/pedido.css';
import { Loading } from './loading/loading';
import { Redirect } from 'react-router-dom';

// URL para consultar los pedidos de un cliente y un establecimiento dados
var pedidosURL = 'http://35.188.170.84:3100/pedidos_cliente/';

// URL para crear un nuevo pedido
var nuevoPedidoURL = 'http://35.188.170.84:3100/pedidos/';

    // URL para crear las asociaciones entre productos y pedidos
    var pedidoProductoURL = 'http://35.188.170.84:3100/pedido_producto/';

// URL para obtener informacion de facturacion
var financieroURL = 'http://34.70.223.126:8000/service/factura/factura/';

// URL para obtener datos del establecimiento
var establecimientoURL = 'http://35.229.122.90:3001/establishments/';

class MiPedido extends Component {
    constructor() {
      super();

      var token = localStorage.getItem('token');
      var decoded = jwt_decode(token); 

      this.scoreFilter = 0; // Corresponde al indice del select list de metodos de pago     
      this.state = {
        usuario: decoded.id,            
        mipedido: {},
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
        //alert('fallo obteniendo el establecimiento' + error);
        console.log(error)
      }); 

      //this.obtenerDatos();    
    }

    redirect (id) {

      setTimeout(function()
        { 
          window.location.href = "/pedidoencurso/" + id; 
        }, 1200);

    }

    // Se determina si ya existe un pedido en proceso o creado. O por el contrario, se crea uno nuevo
    setearPedido(pedidos) {
  
      if (pedidos.length !== 0) {          
  
          for (let i = 0; i < pedidos.length; i++){
            
            if (pedidos[i].estado === 'Creado'){                     
              this.setState({"estado" : 'creado'});     
              this.setState({"mipedido" : pedidos[i]});   
              return;         
            }
            if (pedidos[i].estado === 'En curso'){                     
              this.setState({"estado" : 'curso'});     
              this.setState({"mipedido" : pedidos[i]});   
              return;         
            }
          }
                    
          // Solo encontro pedidos finalizados, asi que se crea un nuevo pedido
          this.nuevoPedido();
  
      }
      
      else { 
          //alert('Se crea un NUEVO pedido');

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
            "destino": "",
            "metodo_pago": this.state.metodo_escogido
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
                  "destino": "",
                  "metodo_pago": ""
                }
                this.setState({ "mipedido" : body});
              })
              .catch(error => {
                //alert('fallo creando pedido' + error);
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

    // La funcion que se ejecuta para solicitar el envio del pedido
    enviarPedido = e => {   
      
      // Primero se realizan las validaciones
      if (this.validaciones()){  
             
        // <<< Se utiliza la misma URL para crear un pedido, pero ahora es un metodo PUT y se le adjunta el id del pedido que se va a actualizar
        nuevoPedidoURL += this.state.mipedido.id;
        //alert('Enviando')
        let metodo;

        
        if (document.getElementById("metodo").innerHTML === 'Elige uno'){
          metodo = "No especificado";
        }
        else {
          metodo = document.getElementById("metodo").innerHTML;
        }        

          // Se actualiza el pedido con los datos ingresados por el usuario
          let body = {
            "id": this.state.mipedido.id,
            "id_cliente": this.state.usuario,
            "id_establecimiento": this.props.establecimiento,
            "id_estado": 2, // (En curso )
            "observaciones": document.getElementById("observaciones").value,
            "destino": document.getElementById("destino").value,
            "metodo_pago": metodo
          };

          

          axios
          .put(nuevoPedidoURL, body)
          .then(response => {
            console.log('Se actualizo bien el pedido');
            console.log(response);            
          })        
          .catch(error => {
            console.log('Algo fallo actualizando el pedido');
            console.log(error)
            })

        // Se actualizan los datos financieros en el microservicio de facturacion
        body = {            
            "pedido_id": this.state.mipedido.id,
            "costo_total": document.getElementById("total").innerHTML, // (Se guardara el total)
            "impuesto_IVA": document.getElementById("envio").innerHTML  // (Se guardara el costo de envio)  
        };

        console.log(body);

        axios
        .post(financieroURL, body)
        .then(response => {
          console.log('Se guardo la informacion de facturacion el pedido');
          console.log(response);          
        })
        .catch(error => {
          console.log('Algo fallo con la informacion de facturacion del pedido');            
          console.log(error)
        })


        // Se crean los registros en la tabla pedido_producto que relacionan los productos agregados con este pedido en particular
        this.props.productosAgregados.map((item, i) => {          
          body = {
            "id_pedido": this.state.mipedido.id,
            "id_producto": item.id
          }

          axios
          .post(pedidoProductoURL, body)
          .then(response => {
            console.log('Se asocio el producto con el pedido');
            console.log(response);                
          })
          .catch(error => {
            console.log('Algo fallo en la asociacion');
            console.log(error)
          })

        });

        // Finalmente, se redirige a la vista de pedido en curso cuando se ha terminado de procesas las peticiones
        this.redirect(this.state.mipedido.id);             
        e.preventDefault();
      }
      else {
        e.preventDefault();        
      }
    }


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
      /*  ! ! ! Desactivado temporalmente ! ! ! 
          return message_destino === "" && message_prod === "";
      */

    }

    
  
    render() {               
      if (this.state.mipedido){        

        // El subcomponente que se va a mostrar en la seccion de productos
        let productos;

        // El componente de seleccion de metodos de pago segun el establecimiento
        let metodos;

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
    
        return (  
          
          <div>                                        
            <h3 className = "card card-header mb-2 mt-3"><strong>Mi pedido</strong></h3>
            <form>              
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
                      {this.props.productosAgregados.length}
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
                    <span>Subtotal: <strong>$ {this.calcularSubtotal()}</strong> </span><br></br>
                    <span>Envio: <strong>$ </strong> 
                      <span id = "envio" className = "input">{this.state.envio}</span>
                    </span>            
                    
                    <div className = "separator mt-1 mb-1"></div>           

                    <h4>Total: <strong>$ </strong>
                      <span id = "total" className = "input">
                        {parseInt(this.state.envio) + parseInt(this.calcularSubtotal())}
                      </span>                      
                    </h4>
                  </div>                              
                  <Chat></Chat>
                  <button onClick = {this.enviarPedido} className = "btn btn-danger mt-2 mb-2 enviar">Enviar pedido</button> 
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

export default MiPedido;
