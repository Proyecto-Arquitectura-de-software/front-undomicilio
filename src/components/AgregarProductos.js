import React, { Component } from 'react';
import axios from 'axios';
import MiPedido from './MiPedido';

// URL para consultar todos los productos existentes
const productosURL = 'http://34.69.25.250:3000/products/';

// URL para consultar los pedidos de un cliente y un establecimiento dados
var pedidosURL = 'http://localhost:3100/pedidos_cliente/';


class AgregarProductos extends Component {

    constructor(props) {
    super(props);
    //alert(this.props.user);
    //alert(this.props.match.params.id_establecimiento);
    this.state = {
      error: null,
      usuario: '5dc22701c7900c00135e604c', // > > > Por ahora se maneja por defecto el identificador del usuario
      products: [],
      pedido: {},
      editable: null
    }
  }

  componentDidMount() {

    const { match: { params } } = this.props;

    // Recibiendo El establecimiento y el usuario

    // Con estos dos parametros se obtienen dos cosas:

        // Los productos que el establecimiento ofrece
        // El pedido que el usuario tenga con el establecimiento dado
  
    pedidosURL += this.state.usuario;
    pedidosURL += '/';
    pedidosURL += params.id_establecimiento;

    // Se carga el pedido
    axios.get(pedidosURL)
      .then(res => {
      const pedido = res.data;     
      this.handleOrders(pedido);
    }); 

    // Se cargan los productos
    axios.get(productosURL)
    .then(res => {
      const products = res.data;      
      this.setState({ products });
    }); 

  }

  handleOrders(pedido) {

    // this.state.pedido[0].estado works !!
    console.log(pedido);
    console.log(pedido.length);

    if (pedido.length !== 0) {
        // Si hay pedidos
        // alert(pedido[0].estado);

        for (let i = 0; i < pedido.length; i++){
          
          if (pedido[i].estado === 'Creado'){
            this.setState({"pedido" : pedido[i]});             
            this.setState({"editable" : true});     
            break;         
          }
          else if (pedido[i].estado === 'En curso'){
            this.setState({"pedido" : pedido[i]});             
            this.setState({"editable" : false});     
            break;         
          }
        }

    }
    
    else {
        // No hay pedidos, se crea uno nuevo
        
    }

             
  }

  agregarProducto(producto) {

      if (this.state.editable) {
        alert('Agregar: ' + producto);
      }

      else {
        alert('NO editable');
      }
    
  }
  

  render() {  
      console.log('Finally ' + this.state.pedido.id);
      const producto = this.state.products.map((item,i)=>{
        return(
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h3>{item.name}</h3>
                <div className="cardImg">
                  <img src={item.image} width="150px" height="150px" alt = "Descripcion de la imagen"/>
                </div>                
                <p className="badge badge-warning">{item.price} COP</p>                
              </div>
              <div className="card-body">                
                <p>{item.description}</p> 
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-info" onClick={() => this.agregarProducto(item.publicationID)}>Agregar a mi pedido</button>       
              </div>
            </div>
          </div>  
        )
      })
   

      return (
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <a className="text-white" href="/" >
              Establecimiento
              <span className="badge badge-pill badge-light ml-2">
                Numero de productos: {this.state.products.length}
              </span>
            </a>  
          </nav>

          <div className="container-fluid">
            <div className="row mt-4">
              
              <div className="col-md-8">
                <div className="row">
                  {producto}
                </div>
              </div>

              {/* Aqui va ir el estado de mi pedido con el establecimiento dado */}
              <div className="col-md-4">
                <MiPedido/>
              </div>              
            </div>
          </div>         
         
        </div>
      );
  
  }
}
export default AgregarProductos;