import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import EstablishmentsList from './EstablishmentsList';
import {Button} from '@material-ui/core';
import '../styles/home.css';

class Home extends Component {

    render() {
  
      return (
          <div>            
              <h1>Pagina principal</h1>
              <p>
                Bienvenido a UN domicilio               
              </p>

              <div className="center">
                <span className="spacing">
                  <Button variant="outlined" color="primary">
                    {/*<Link to ='/mipedido'>Soy un cliente </Link>*/}
                    <Link to ='/establecimientos'>Soy un cliente </Link>
                  </Button>
                </span>
                <span className="spacing">
                  <Button variant="outlined" color="secondary">
                    <Link to ='/productos'>Soy un establecimiento</Link>                    
                  </Button>
                </span>
              </div>
              
              {/*<Link to ='/mipedido'>Ir a mi pedido </Link>*/}
          </div>
      );
    }
  
}

export default Home;