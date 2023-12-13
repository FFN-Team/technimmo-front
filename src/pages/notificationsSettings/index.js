import React, { useState } from 'react';

const NotificationsSettings = () => {

  const [buttonClickedPPN, setButtonClickedPPN] = useState(false);
  const [buttonClickedPB, setButtonClickedPB] = useState(false);


  const handleOkClickPPN = async () => {
    // Ajoutez ici le code que vous souhaitez exécuter lorsque le bouton OK est cliqué
    console.log('OK PPN button clicked!');
    try {
        const url = `http://localhost:9001/api/v1/potential-projects/subscription`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },});
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.log(error.message);
    } 
    
    // Mettez à jour l'état pour changer la couleur du bouton
    setButtonClickedPPN(true);
  };



  const handleOkClickPB = async () => {
    // Ajoutez ici le code que vous souhaitez exécuter lorsque le bouton OK est cliqué
    console.log('OK PB button clicked!');
    try {
        const url = `http://localhost:9001/api/v1/prospects/subscription`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },});
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.log(error.message);
    } 
    
    // Mettez à jour l'état pour changer la couleur du bouton
    setButtonClickedPB(true);
  };



  // Styles en ligne pour le composant
  const containerStyle = {
    border: '1px solid #ccc',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const okButtonPPN = {
    padding: '8px 16px',
    backgroundColor: buttonClickedPPN ? '#4caf50' : '#4285f4',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
  };

  const okButtonPB = {
    padding: '8px 16px',
    backgroundColor: buttonClickedPB ? '#4caf50' : '#4285f4',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <div>
      <div style={containerStyle}>
      <p>Active approaching potential projects notification:</p>
      <button
        onClick={handleOkClickPPN}
        style={okButtonPPN}
      >
        OK
      </button>
      </div>
      <div style={containerStyle}>
        <p>Notify real estate for potential buyers:</p>
        <button
          onClick={handleOkClickPB}
          style={okButtonPB}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default NotificationsSettings;
