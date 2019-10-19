import React, { Component } from 'react';

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
                  Esta sera la pagina principal de la aplicacion
              </p>
          </div>
      );
    }
  
}

export default Home;