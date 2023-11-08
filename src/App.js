import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    post : {}
  }

  componentDidMount(){
    fetch('localhost:8080/api/v1/client/proprietaire')
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      this.setState({post: result})
    })
  }

  render() {
    return (
      <div className='App'>
        <h1>Proprietaires : </h1>
        {this.state.post.nom}
      </div>
    );
  }
}

export default App;
