import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    biens : []
  }

  componentDidMount(){
    fetch('http://localhost:9001/api/v1/biens')
    .then(response => response.json())
    .then((result) => {
      this.setState({biens: result})
    })
  }


  render() {
    return (
      <div className='App'>
        <h1>Biens :</h1>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={tableCellStyle}>Nom</th>
              <th style={tableCellStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.biens.map((bien, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>{bien.nomBien}</td>
                <td style={tableCellStyle}>{bien.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

export default App;
