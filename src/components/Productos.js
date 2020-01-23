import React, { Component } from 'react';
import axios from 'axios';
import ProductsPostForm from './ProductosPostForm';

// URL para consultar los productos del establecimiento logueado como usuario
var apiUrl = 'http://34.70.223.126:3010/products/establishment/';


class Productos extends Component {

    constructor(props) {
      super(props);
      this.state = {
        establecimiento: '5db30354c7900c00135e604a', // < < < ID temporal al final > > >
        error: null,
        products: [],
        response: {}
      }
  }

  componentDidMount() {

    apiUrl += this.state.establecimiento;

    // Se cargan los productos del establecimiento logueado
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
                    <img src={item.image} width="100px" height="100px" alt = "Descripcion de la imagen" />
                  </div>
                  <span className="badge badge-warning ml-2">{item.price} COP</span>
                </div>
                <div className="card-body">
                  <span>{item.description}</span>
                </div>
                <div className="card-footer">
                  {/* ! ! ! Se oculta temporalmente el boton de Editar hasta que se implemente la funcionalidad
                  <button className="btn btn-info invisible" onClick={() => this.props.editProduct(item.publicationID)}>Edit</button>
                  */}
                  <button className="btn btn-danger agregar" onClick={() => this.deleteProduct(item.publicationID)}>Eliminar</button>
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
                  Productos totales: {this.state.products.length}
                </span>
              </a>
            </nav>
            <div className="container-fluid">
              <div className="row mt-4">

                <div className="col-md-4 text-center">
                <ProductsPostForm/>
                </div>

                <div className="col-md-8">
                  <div className="row">
                    {producto}
                  </div>
                </div>
              </div>
          </div>

        </div>
        );

  }
}
export default Productos;
