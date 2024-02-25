import React, { useEffect, useState } from 'react';

import BuyersTable from './BuyersTable'

const columns = [
  { field: 'title', headerName: 'Civilité', width: 60 },
  { field: 'firstName', headerName: 'Prénom', width: 120, /*editable: true,*/ },
  { field: 'lastName', headerName: 'Nom', width: 120},
  { field: 'dateOfBirth', headerName: 'Date de naissance', width: 120 },
  { field: 'profession', headerName: 'Profession', width: 120 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'mobile', headerName: 'Tél', width: 100 },
  { field: 'contactOrigin', headerName: 'Origine du contact', width: 120 },
  { field: 'status', headerName: 'Statut', width: 120 },
];


const TableBuyers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetch('http://localhost:9001/api/v1/buyers');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBuyers(transformDataToBuyers(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  function transformDataToBuyers(originalData) {
    return originalData.map((item) => {
      const {
        id,
        prospect: {
          title,
          firstName,
          lastName,
          dateOfBirth,
          profession,
          mail,
          mobile,
          contactOrigin,
        },
        status,
      } = item;
  
      return {
        id,
        title,
        firstName,
        lastName,
        dateOfBirth,
        profession,
        email: mail,
        mobile,
        contactOrigin,
        status,
      };
    });
  }

  return (
    <BuyersTable buyers={buyers} columns={columns} />
  );
};

export default TableBuyers;