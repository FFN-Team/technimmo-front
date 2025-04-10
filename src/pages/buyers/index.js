import React, { useEffect, useState } from 'react';

import CustomTable from '../components/CustomTable';

const columns = [
  { id: 'title', label: 'Civilité', minWidth: 60 },
  { id: 'firstName', label: 'Prénom', minWidth: 120, /*editable: true,*/ },
  { id: 'lastName', label: 'Nom', minWidth: 120},
  { id: 'dateOfBirth', label: 'Date de naissance', minWidth: 120 },
  { id: 'profession', label: 'Profession', minWidth: 120 },
  { id: 'mail', label: 'Email', minWidth: 200 },
  { id: 'mobile', label: 'Tél', minWidth: 100 },
  { id: 'contactOrigin', label: 'Origine du contact', minWidth: 120 },
  { id: 'status', label: 'Statut', minWidth: 120 },
];

const values = (column, row) => {
  return column.id === 'title' ? row.title :
                    column.id === 'firstname' ? row.firstName :
                    column.id === 'lastname' ? row.lastName :
                    column.id === 'day_of_birth' ? row.dateOfBirth :
                    column.id === 'profession' ? row.profession :
                    column.id === 'mail' ? row.email :
                    column.id === 'mobile' ? row.mobile :
                    column.id === 'contact_origin' ? row.contactOrigin : 
                    column.id === 'status' ? row.status :
                    row[column.id];
} 

const Buyers = () => {
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
    <CustomTable rows={buyers} columns={columns} values={values} navigationDirection={'prospects/acquereurs'}/>
  );
};

export default Buyers;