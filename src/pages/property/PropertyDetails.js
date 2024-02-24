import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Card from "pages/components/Card.js";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({
    property_name: '',
    description: '',
    number_of_rooms: 1,
    livable_area: 1.0,
    id_address: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const url = `http://localhost:9001/api/v1/properties/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const usedData = {
          property_name: data.property_name,
          description: data.description,
          number_of_rooms: data.number_of_rooms,
          livable_area: data.livable_area,
          id_address: data.address.id
        };

        handleInitIdAddress(usedData.id_address);

        setProperty(usedData);

        const url2 = `http://localhost:9001/api/v1/addresses/non-assigned/${usedData.id_address}`;
        const response2 = await fetch(url2);
        if (!response2.ok) {
          throw new Error(`HTTP error! Status: ${response2.status}`);
        }
        const data2 = await response2.json();

        setOptions(data2);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, [id]);

  const handleInitIdAddress = (value) => {
    setProperty({
      ...property,
      id_address: value
    });
  };

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9001/api/v1/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          property_name: property.property_name,
          description: property.description,
          number_of_rooms: parseInt(property.number_of_rooms),
          livable_area: parseFloat(property.livable_area),
          id_address: parseInt(property.id_address)
        })
      });

      window.location.href = `http://localhost:3000/properties`;

      if (response.ok) {
        console.log('Données mises à jour avec succès !');
      } else {
        console.error('Échec de la mise à jour des données. Status:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la requête PUT :', error);
    }
  };

  const handleDeletion = async () => {
    try {
      const url = `http://localhost:9001/api/v1/properties/${id}`;
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      window.location.href = `http://localhost:3000/properties`;
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="property-details">
      <Card>
        <h1>Modifier le bien</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="property_name">Name : </label>
          <input
            type="text"
            id="property_name"
            name="property_name"
            value={property.property_name}
            onChange={handleChange}
            required
            style={{ width: 200 }}
          />
          <br />
          <br />
          <label htmlFor="description">Description : </label>
          <input
            type="text"
            id="description"
            name="description"
            value={property.description}
            onChange={handleChange}
            required
            style={{ width: 300 }}
          />
          <br />
          <br />
          <label htmlFor="number_of_rooms">Number of rooms : </label>
          <input
            type="number"
            id="number_of_rooms"
            name="number_of_rooms"
            value={property.number_of_rooms}
            min={1}
            max={1000}
            onChange={handleChange}
            required
            style={{ width: 70 }}
          />
          <br />
          <br />
          <label htmlFor="livable_area">Livable area : </label>
          <input
            type="number"
            id="livable_area"
            name="livable_area"
            value={property.livable_area}
            min={1.0}
            max={1000000.0}
            step={0.1}
            onChange={handleChange}
            required
            style={{ width: 100 }}
          />
          <br />
          <br />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="id_address">Address : </label>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <Select
                id="id_address" name="id_address" value={property.id_address} onChange={handleChange} 
                min={1.0}
                max={1000000.0}
                step={0.1}
                required
                style={{ width: 300 }}
              >
                {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.street_number + ' ' + option.street.name + ', ' + option.city.name}
                </MenuItem>))}
              </Select>
            </FormControl>
          </div>
          <br />
          <br />
          <div style={{ display: 'flex', gap: '20px', marginBottom:'30px' }}>
            <Button type="submit" variant="outlined" style={{height: '25px' }} color="success">
              Save
            </Button>
            <Button onClick={handleDeletion} variant="outlined" style={{ height: '25px' }} color="error">
              Delete
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PropertyDetails;
