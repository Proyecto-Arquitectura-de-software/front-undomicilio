import React from 'react';
import './loading.css';

export class Loading extends React.Component {
  render() {
    return(
      <div className="loading">
        <img src={require("./../../assets/loading.gif")}/>
        <h2>Cargando...</h2>
      </div>
    );
  }
}