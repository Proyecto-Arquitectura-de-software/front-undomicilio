import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import {Select, MenuItem, Button} from '@material-ui/core';
import '../styles/establishmentsList.css';
import { Loading } from './loading/loading';

class EstablishmentsList extends Component{
    
    constructor(props){
        super(props);
        this.state = {};        
        this.scoreFilter = 0;        
        //alert(this.props.user);
        this.maximumDeliveryTime = 10000;
        this.setFilterValue = (value) => {
            return (event) => {
                this[value] = event.target.value;
                this.setState(this.state);
            };
        };
    }

    componentDidMount() {
           

        /* axios.get(`/api/users/${params.userId}`)
          .then(({ data: user }) => {
            console.log('user', user);
      
            this.setState({ user });
          }); */
          
        this.getList();
    }    
    

    render(){        
        if(this.state.list){            
            return(
                <div>
                    <div className="filtersDiv">
                        <span className="filtersTitle">Filtros: </span>
                        <Select value={this.scoreFilter} onChange={this.setFilterValue("scoreFilter")}>
                            <MenuItem value={5}>5 estrellas</MenuItem>
                            <MenuItem value={4}>4 estrellas</MenuItem>
                            <MenuItem value={3}>3 estrellas</MenuItem>
                            <MenuItem value={2}>2 estrellas</MenuItem>
                            <MenuItem value={1}>1 estrella</MenuItem>
                            <MenuItem value={0}>Puntuación</MenuItem>
                        </Select>
                        <span className="artificialMargin"/>
                        <Select value={this.maximumDeliveryTime} onChange={this.setFilterValue("maximumDeliveryTime")}>
                            <MenuItem value={15}>15 minutos</MenuItem>
                            <MenuItem value={30}>30 minutos</MenuItem>
                            <MenuItem value={60}>1 hora</MenuItem>
                            <MenuItem value={10000}>Máximo tiempo de entrega</MenuItem>
                        </Select>
                        <span className="artificialMargin"/>
                        <Button onClick={this.getList.bind(this)}>Buscar</Button>

                        {/* > > Incrustacion temporal de boton para ver mi pedido < < */}
                        <span className="spacing"></span>
                        <span>
                          <Button variant="outlined" color="secondary">
                            <Link to ='/Mipedido'>Mi pedido</Link>                    
                          </Button>
                        </span>
                    </div>
                    <ul className="establishmentList">
                        {this.state.list.map(e => (                        
                        <li key = {e._id} className="establishmentDiv">
                                      
                            <a name = {e._id} onClick = {this.goToProducts} className="link">{e.name}</a><small className="category">{e.type}</small><br/>
                            <Rating className="scoreRating" value={e.score} readOnly={true} size="small"/>
                            <div>
                                <span className="subtitleText">Categorías: </span>
                                <span className="infoText">{e.categories.map(e => e + ", ")}</span>
                            </div>
                            <div>
                                <span className="subtitleText">Dirección: </span>
                                <span className="infoText">{e.address} </span>
                            </div>
                            <div>
                                <span className="subtitleText">Tiempo de entrega: </span>
                                <span className="infoText">{e.deliveryTime} min </span>
                            </div>
                            <div>
                                <span className="subtitleText">Costo de entrega: </span>
                                <span className="infoText">${e.deliveryCost}</span>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            );
        }else{            
            return (<Loading/>)
        }
    }

    // Funcion para redirigir a los productos del establecimiento seleccionado
    goToProducts (e){	                
        window.location.href = "/verproductos/" + e.target.name;        
    }

    // Funcio para obtener todos los establecimientos cercanos a las coordenadas dadas
    // ! ! ! COORDENADAS HARCODEADAS ! ! ! => falta que sean parametrizables por una vista de ubicacion
    getList(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://34.69.25.250:3001/establishments/?coordinateX=4.630854&coordinateY=-74.050782&minimumScore=${this.scoreFilter}&maximumDeliveryTime=${this.maximumDeliveryTime}`);

        xhr.onload = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  let res = JSON.parse(xhr.responseText);
                  this.setState({"list" : res});
                } else {
                  console.error(xhr.statusText);
                }
              }
        }.bind(this);
        xhr.send();
    }

}

export default EstablishmentsList;