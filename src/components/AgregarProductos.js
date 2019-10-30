import React, { Component } from 'react';
import axios from 'axios';
import ProductsPostForm from './ProductosPostForm';
import MiPedido from './MiPedido';

const apiUrl = 'http://34.69.25.250:3000/products/';


class AgregarProductos extends Component {

    constructor(props) {
    super(props);
    alert(this.props.user);
    this.state = {
      error: null,
      products: [],
      response: {} 
      
    }
  }

  componentDidMount() {
    axios.get (apiUrl)
    .then(res => {
      const products = res.data;
      this.setState({ products });
    })    
  }

  deleteProduct(publicationID) {  
    const { products } = this.state;     
   axios.delete(apiUrl + publicationID).then(result=>{  
     alert(result.data);  
      this.setState({  
        response:result,  
        products:products.filter(item=>item.publicationID !== publicationID)  
      });  
    });  
  }
  


render() {  
      const producto = this.state.products.map((item,i)=>{
        return(
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h3>{item.name}</h3>
                <div className="cardImg">
                  <img src={item.image} width="150px" height="150px"/>
                </div>                
                <p className="badge badge-warning">{item.price} COP</p>                
              </div>
              <div className="card-body">                
                <p>{item.description}</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-info" onClick={() => this.props.editProduct(item.publicationID)}>Agregar al pedido</button>       
              </div>
            </div>
          </div>  
        )
      })
   

      return (
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <a className="text-white" href="/" >
              idestablecimiento
              <span className="badge badge-pill badge-light ml-2">
                Numero de productos: {this.state.products.length}
              </span>
            </a>  
          </nav>

          <div className="container-fluid">
            <div className="row mt-4">

              {/* Aqui va ir el estado de mi pedido con el establecimiento dado */}
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