import React, { Component } from 'react';
import { Rating } from '@material-ui/lab';
import {Select, MenuItem, Button} from '@material-ui/core';
//import './establishmentsList.css';

class EstablishmentsList extends Component{
    
    constructor(){
        super();
        this.state = {};
        this.state.message = "Cargando";
        this.scoreFilter = 0;
        this.maximumDeliveryTime = 10000;
        this.setFilterValue = (value) => {
            return (event) => {
                this[value] = event.target.value;
                this.setState(this.state);
            };
        };
    }

    componentDidMount() {
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
                    </div>
                    <ul className="establishmentList">
                        {this.state.list.map(e => (
                        <li key={e._id} className="establishmentDiv">
                            <a href="" className="link">{e.name}</a><small className="category">{e.type}</small><br/>
                            <Rating className="scoreRating" value={e.score} readOnly={true} size="small"/>
                            <div>
                                <span className="subtitleText">Categorías: </span>
                                <span className="infoText">{e.categories.map(e => e+", ")}</span>
                            </div>
                            <div>
                                <span className="subtitleText">Dirección: </span>
                                <span className="infoText">{e.address}</span>
                            </div>
                            <div>
                                <span className="subtitleText">Tiempo de entrega: </span>
                                <span className="infoText">{e.deliveryTime} min</span>
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
            return(<div className="establishmentDiv">{this.state.message}</div>);
        }
    }

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