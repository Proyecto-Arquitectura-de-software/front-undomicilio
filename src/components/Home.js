import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import EstablishmentsList from './EstablishmentsList';

class Home extends Component {
    constructor() {
      super();
      this.state = {
        id_usuario: '1',
        usuario: 'John_95',
        cliente: 'John Mac'        
      };
    }
  
    render() {
  
      return (
          <div>            
              <h1>Pagina principal</h1>
              <p>
                Bienvenido a UN domicilio. Estos son los establecimientos cerca a tu dirección                
              </p>
              <br></br>
              <EstablishmentsList/>
              <Link to ='/mipedido'>Ir a mi pedido </Link>            
          </div>
      );
    }
  
}

export default Home;