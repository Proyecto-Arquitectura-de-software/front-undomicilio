import React, { Component } from 'react';

class MiPedido extends Component {
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
              <h1>Mi pedido</h1>
              <p>
                  A continuacion vera los detalles de su pedido
              </p>
          </div>
      );
    }
  
}

export default MiPedido;