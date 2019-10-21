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
        
          <h1>Estado de mi pedido</h1>

          <p>Destino: </p>
          <p>Articulos: </p>

          <div className="card">
            <form onSubmit={this.handleSubmit} className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  placeholder="Title"
                  />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="responsible"
                  className="form-control"
                  value={this.state.responsible}
                  onChange={this.handleInputChange}
                  placeholder="Responsible"
                  />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  placeholder="Description"
                  />
              </div>
              <div className="form-group">
                <select
                    name="priority"
                    className="form-control"
                    value={this.state.priority}
                    onChange={this.handleInputChange}
                  >
                  <option>low</option>
                  <option>medium</option>
                  <option>high</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
          
      );
    }
  
}

export default MiPedido;