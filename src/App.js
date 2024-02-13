import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    get : {}
  }

  componentDidMount(){
    fetch('localhost:9001/bien')
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      this.setState({get: result})
    })
  }

  render() {
    return (
      <div className='App'>
        <h1>Biens : </h1>
        {this.state.get.nomBien}
      </div>
    );
  }
}

export default App;
