import React, { Component } from 'react';
import Hello from './Hello';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }
  render() {
    return (<div>
      <Hello name={this.state.name} />
      <p>
        Primer parrafo en espanol
        </p>
    </div>);
  }
}

export default App;
