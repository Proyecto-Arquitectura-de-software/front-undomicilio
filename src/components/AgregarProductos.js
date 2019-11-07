import React, { Component } from 'react';
import axios from 'axios';
import { Loading } from './loading/loading';
import MiPedido from './MiPedido';

// URL para consultar todos los productos existentes
const productosURL = 'http://34.69.25.250:3000/products/';


class AgregarProductos extends Component {

    constructor(props) {
    super(props);
    
    this.state = {
      error: null,
      usuario: '5dc22701c7900c00135e604c', // > > > Por ahora se maneja por defecto el identificador del usuario
      establecimiento: null,
      products: [],      
      editable: null
    }
  }

  componentDidMount() {

    const { match: { params } } = this.props;      
    this.setState({ "establecimiento" : params.id_establecimiento});    

    // Se cargan los productos
    axios.get(productosURL)
    .then(res => {
      const products = res.data;      
      this.setState({ products });
    }); 
    
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
      const producto = this.state.products.map((item,i) => {
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

      if (this.state.establecimiento !== null){
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
                  {/*alert ('Hey ' + this.estab)*/}
                  <MiPedido establecimiento = {this.state.establecimiento} editable = {this.state.editable}/>
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