import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';

const NotificationsSettings = () => {

  const [isCheckedPPN, setCheckedPPN] = useState(false);
  const [isCheckedPB, setCheckedPB] = useState(false);
  let potentialProjectNotificationLabel = "J'autorise à reçevoir des notifications pour les projets anticipés.";
  let potentialBuyerNotificationLabel = "J'autorise à reçevoir des notifications pour les acquéreurs potentiels.";

  useEffect(() => {
    // avoir une fonction qui permet de savoir si on est inscrit a une notification ou pas
  }, []);

  const handleOkClickPPN = async () => {
    // Ajoutez ici le code que vous souhaitez exécuter lorsque le bouton OK est cliqué
    if (isCheckedPPN) {
      //avoir une fonction unsubscribe
      try {
        const url = `http://localhost:9001/api/v1/potential-projects/notifications/unSubscribe`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },});

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setCheckedPPN(false);
      } catch (error) {
          console.log(error.message);
      }
    } else {
      try {
        // ce serait peut-être bien de changer l'url en http://localhost:9001/api/v1/potential-projects/notifications/subscribe
        const url = `http://localhost:9001/api/v1/potential-projects/subscription`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },});

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setCheckedPPN(true);
      } catch (error) {
          console.log(error.message);
      }
    }
  };

  const handleOkClickPB = async () => {
    // Ajoutez ici le code que vous souhaitez exécuter lorsque le bouton OK est cliqué
    if (isCheckedPB) {
      //avoir une fonction unsubscribe
      try {
        const url = `http://localhost:9001/api/v1/prospects/notifications/unSubscribe`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },});

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setCheckedPB(false);
      } catch (error) {
          console.log(error.message);
      }
    } else {
      try {

        // ce serait peut-être bien de changer l'url en http://localhost:9001/api/v1/prospects/notifications/subscribe
        const url = `http://localhost:9001/api/v1/prospects/subscription`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },});

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setCheckedPB(true);
      } catch (error) {
          console.log(error.message);
      }
    }
  };

  const containerStyle = {
    border: '1px solid #ccc',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div>
      <h1>Paramètres</h1>
      <div style={containerStyle}>
        <h2>Configuration des notifications</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch
          checked={isCheckedPPN}
          onChange={handleOkClickPPN}
          />
          <label htmlFor="my-switch">{potentialProjectNotificationLabel}</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch
          checked={isCheckedPB}
          onChange={handleOkClickPB}
          />
          <label htmlFor="my-switch">{potentialBuyerNotificationLabel}</label>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;
