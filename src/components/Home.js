import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import EstablishmentsList from './EstablishmentsList';
import {Button} from '@material-ui/core';
import '../styles/home.css';

class Home extends Component {

    constructor() {
      super(); 
    }

    render() {
  
      return (
          <div>            
              <h1>Pagina principal</h1>
              <p>
                Bienvenido a UN domicilio               
              </p>

              <div className="center">
                <span className="spacing">                  
                  {/*En caso de necesitar usar Link: <Link to ='/mipedido'>Soy un cliente </Link>*/}  
                  <Button href="/establecimientos" variant="outlined" color="primary">Soy un cliente</Button>
                </span>

                <span className="spacing">
                  <Button href="/productos" variant="outlined" color="secondary">Soy un Establecimiento</Button>                  
                </span>
              </div>                            
          </div>
      );
    }
  
}

export default Home;