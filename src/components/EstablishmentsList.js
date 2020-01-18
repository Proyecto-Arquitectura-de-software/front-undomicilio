import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import axios from 'axios';
import {Select, MenuItem, Button} from '@material-ui/core';
import '../styles/establishmentsList.css';
import { Loading } from './loading/loading';

// URL para consultar los pedidos de un cliente y un establecimiento dados
var pedidosURL = 'http://35.188.177.250:3100/pedidos_cliente/'; 

class EstablishmentsList extends Component{
    
    constructor(){
        super();
        this.state = {
            usuario: '5dc22701c7900c00135e604c' // > > > Por ahora se maneja por defecto el identificador del usuario              
        };        
        this.scoreFilter = 0;        
        //alert(this.props.user);
        this.maximumDeliveryTime = 10000;
        this.setFilterValue = (value) => {
            return (event) => {
                this[value] = event.target.value;
                this.setState(this.state);
            };
        };

        this.goToProducts = this.goToProducts.bind(this);
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

                        {/* > > Incrustacion temporal de boton para editar productos < < */}
                        <span className="spacing"></span>
                        <span>
                          <Button variant="outlined" color="secondary">
                            <Link to ='/productos'>Editar productos</Link>                    
                          </Button>
                        </span>

                    </div>
                    <ul className="establishmentList">
                        {this.state.list.map(e => (                        
                            <li key = {e._id} className="establishmentDiv">
                                <a name = {e._id}  onClick = {this.goToProducts} className="link">{e.name}</a><small className="category">{e.type}</small><br/>
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
        
        let establecimiento = e.target.name;

        // Se cargan los pedidos del usuario y el establecimiento dados
        pedidosURL += this.state.usuario;
        pedidosURL += '/';
        pedidosURL += establecimiento;
        console.log('La URL');
        console.log(pedidosURL);

        axios.get(pedidosURL)
            .then(res => {
            const pedidos = res.data;   
            //console.log(pedidos);
            console.log(establecimiento);
            this.setearPedido(pedidos, establecimiento);
        }); 

    }

    // Funcion que recoge todos los pedidos de un cliente y un establecimiento dados,
    // A continuacion, se busca si hay un pedido en curso o no.
    setearPedido(pedidos, id_establecimiento) { 
  
        if (pedidos.length !== 0) {          
    
            for (let i = 0; i < pedidos.length; i++){
              
              if (pedidos[i].estado === 'Creado'){   
                window.location.href = "/verproductos/" + id_establecimiento;                     
                //this.setState({"estado" : 'creado'});     
                //this.setState({"mipedido" : pedidos[i]});   
                return;         
              }
              else if (pedidos[i].estado === 'En curso'){
                // Se pasa el pedido que esta actualmente en curso
                window.location.href = "/pedidoencurso/" + pedidos[i].id;    
                //this.setState({"estado" : 'curso'});  
                //this.setState({"mipedido" : pedidos[i]});                          
                return;                     
              }
            }   
                    
            // Solo encontro pedidos finalizados, asi que se envia al componente MiPedido
            window.location.href = "/verproductos/" + id_establecimiento;    
    
        }
        
        else {             
            // No hay pedidos, se envia al componente MiPedido
            window.location.href = "/verproductos/" + id_establecimiento;    
        }               
      }



    // Funcio para obtener todos los establecimientos cercanos a las coordenadas dadas
    // ! ! ! COORDENADAS HARCODEADAS ! ! ! => falta que sean parametrizables por una vista de ubicacion
    getList(){
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `http://34.70.223.126:3002/graphql`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  let res = JSON.parse(xhr.responseText);
                  console.log(res.data.getEstablishments);
                  this.setState({"list" : res.data.getEstablishments});
                } else {
                  console.error(xhr.statusText);
                }
            }
        }.bind(this);

        let req = {
            query: `{
                getEstablishments(coordinateX: 4.630854,coordinateY: -74.050782,
                filters:[
                    {name: "minimumScore", value: "${this.scoreFilter}"},
                    {name: "maximumDeliveryTime", value: "${this.maximumDeliveryTime}"}
                ]){
                    _id
                    name
                    address
                    deliveryTime
                    deliveryCost
                    categories
                    score
                    type
                }
              }`
        }
        xhr.send(JSON.stringify(req));
    }

}

export default EstablishmentsList;
