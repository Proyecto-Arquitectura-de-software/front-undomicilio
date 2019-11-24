import React, { Component } from 'react'
import axios from 'axios'
import FileBase64 from 'react-file-base64';


const apiUrl = 'http://34.69.25.250:3000/products/'


class ProductsPostForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			description: '',
			price: '',
			establishmentID: '5db30354c7900c00135e604a', // < < < ID temporal al final > > >
            image: [],
            
		}
	}
        
	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
    }
    
	submitHandler = e => {
		e.preventDefault();
		console.log(this.state);
		axios
			.post(apiUrl, this.state)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error)
			})
    }
    


    getFiles(image){
        this.setState({ image: image.base64 })
      }

	render() {
		//const { name, description, price, image } = this.state
		return (
			<div className="card">
				<form onSubmit={this.submitHandler} className="card-body">
					<div className="form-group">
						<input
							type="text"
                            name="name"
                            className="form-control"
							
                            onChange={this.changeHandler}
                            placeholder="Nombre"
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
                            name="description"
                            className="form-control"
							
                            onChange={this.changeHandler}
                            placeholder="Descripcion"
						/>
					</div>
					<div className="form-group">
						<input
							type="number"
                            name="price"
                            className="form-control"
							
                            onChange={this.changeHandler}
                            placeholder="Precio"
						/>
					</div>
                    <div className="form-group">
                        <FileBase64 multiple = {false} onDone ={this.getFiles.bind(this)} />
					</div>
					<button type="submit" className="btn btn-primary agregar">Agregar producto</button>
				</form>
			</div>
		)
	}
}

export default ProductsPostForm