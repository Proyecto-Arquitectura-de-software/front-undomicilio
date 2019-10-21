import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import Hello from '../Hello';
import Home from './Home';
import MiPedido from './MiPedido';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {

    return (
        <div>

          {/*  Asi es masomenos como se hace el enrutamiento de las vistas:

            ## Me esta botando un error ficty.. 

          <Switch>
          
            <Route exact path = "/" component = {Home} /> 
           
            <Route exact path = "/sign_in" component = {Signin} />
            <Route exact path = "/sign_up" component = {Signup} />
            <Route exact path = "/input_ingredients" component = {FormInputIngredients} />
            <Route exact path = "/week_plan" component = {PlanningFood} />
            <Route exact path = "/mykitchen" component = {MyKitchen} />
            <Route exact path = "/mykitchen/myfavorites" component = {MyFavorites} />
            <Route exact path = "/mykitchen/myrecipes" component = {MyRecipes} />
            <Route exact path = "/irecipe" component = {EntryRecipe} />
            <Route exact path = "/crecipe" component = {ChangeRecipe} />
            <Route exact path = "/rdetail" component = {RecipeDetail} />
            <Route exact path = "/prueba" component = {prueba} />
          </Switch>
          */}

          <MiPedido/>
        </div>
    );
  }

}


export default App;

