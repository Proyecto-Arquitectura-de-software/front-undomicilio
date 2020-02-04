import React, { Component } from 'react';
import axios from 'axios';
import { Loading } from './loading/loading';
import MiPedido from './MiPedido';
import jwt_decode from 'jwt-decode';

// URL para consultar todos los productos existentes
const productosURL = 'http://34.70.223.126:3000/products/';

class AgregarProductos extends Component {
     
    constructor(props) {
      super(props);

      var token = localStorage.getItem('token');
      var decoded = jwt_decode(token);     
    
      this.state = {
        error: null,
        usuario: decoded.id, 
        establecimiento: null,
        productos: [],
        productosAgregados: []
      };
      this.agregarProducto = this.agregarProducto.bind(this);
    }

  componentDidMount() {

    const { match: { params } } = this.props;      
    this.setState({ "establecimiento" : params.id_establecimiento});    
    
    
    // Se cargan los productos
    axios.get(productosURL)
    .then(res => {
      const productos = res.data;      
      this.setState({ productos });
    }); 
    
  }

  agregarProducto(prod) {

      let producto = {
        "id" : prod.publicationID,
        "nombre" : prod.name,
        "precio" : prod.price
      } 
      
      this.setState({
        productosAgregados: [...this.state.productosAgregados, producto]
      })
  }

  eliminarProducto = (index) => {
        
    this.state.productosAgregados.splice(index,1);
    this.setState({ productosAgregados: this.state.productosAgregados});    
  }

  render() {  
    //console.log(this.state.productosAgregados);
      const productos = this.state.productos.map((item,i) => {
        return(
          <div className="col-md-4 mt-3">
            <div className="card">
              <div className="card-header">
                <h3>{item.name}</h3>
                <div className = "cardImg">
                  <img src={item.image} width="150px" height="150px" alt = "Descripcion de la imagen"/> 
                </div>                
                <p className="text badge badge-warning mt-2">$ {item.price}</p>
              </div>
              <div className="center mt-2 mb-2">    
              <span>{item.description}</span> 
              </div>
              <div className = "card-footer text-center">
                <button className="btn btn-info agregar" onClick={() => this.agregarProducto(item)}>Agregar a mi pedido</button>       
              </div>
            </div>
          </div>  
        )
      })

      if (this.state.establecimiento !== null){
        return (
          <div>
            <nav className = "navbar navbar-dark bg-dark">
              <span className = "text-white " href = "/establecimientos" >
                Agrega productos a tu gusto y solicita tu pedido
                <span className = "badge badge-pill badge-light ml-2">
                  Productos totales: {this.state.productos.length}
                </span>
              </span>  
              <button className = "btn btn-info">
                <a className = "text-white" href = "/establecimientos" >
                  Volver
                </a> 
              </button>                
            </nav>
  
            <div className="container-fluid">
              <div className="row mt-4">
                
                <div className="col-md-8">
                  <div className="row">
                    {productos}
                  </div>  
                </div>
  
                {/* Aqui va ir el estado de mi pedido con el establecimiento dado */}
                <div className = "col-md-4">
                  {/*alert ('Hey ' + this.estab)*/}
                  <MiPedido establecimiento = {this.state.establecimiento}
                   productosAgregados = {this.state.productosAgregados}
                   eliminarProducto = {this.eliminarProducto}/>
                </div>              
              </div>
            </div>         
           
          </div>
        );
      }

      else {        
        return (<Loading/>)
      }

  }
}
export default AgregarProductos;
