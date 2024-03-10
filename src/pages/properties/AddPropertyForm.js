import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import StyledInput from 'pages/components/InputElement.js';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { StyledSelect } from 'pages/components/SelectElement.js';

const AddPropertyForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [property, setProperty] = useState({
    property_name: '',
    description: '',
    number_of_rooms: 1,
    livable_area: 1.0,
    id_address: 0
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const addresses = async () => {
      try {
        const url = `http://localhost:9001/api/v1/addresses/non-assigned`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        var noAddressAvailable = data.length > 0;
        handleInitIdAddress(noAddressAvailable ? data[0].id : '');

        setOptions(data);
      } catch (error) {
        setError(error.message);
      }
    };

    addresses();
  }, []);

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

    if (property.id_address === '') {
      setErrorMessage('No additions possible because no address is available.');
    } else {
      try {
        const response = await fetch(`http://localhost:9001/api/v1/properties`, {
          method: 'POST',
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
          console.log('Données ajoutées avec succès !');
        } else {
          console.error("Échec de l'ajout des données. Status:", response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la requête POST :', error);
      }
    }
  };

  return (
    <div className="property-details" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Ajouter un nouveau bien</h1>
      <FormControl onSubmit={handleSubmit}>
        <label htmlFor="property_name" style={{ marginRight: 10 }}>
          Name :{' '}
        </label>
        <StyledInput type="text" id="property_name" name="property_name" value={property.property_name} onChange={handleChange} required />
        <br />
        <br />
        <label htmlFor="description" style={{ marginRight: 10 }}>
          Description :{' '}
        </label>
        <StyledInput type="text" id="description" name="description" value={property.description} onChange={handleChange} required />
        <br />
        <br />
        <label htmlFor="number_of_rooms" style={{ marginRight: 10 }}>
          Number of rooms :{' '}
        </label>
        <StyledInput
          type="number"
          id="number_of_rooms"
          name="number_of_rooms"
          value={property.number_of_rooms}
          min={1}
          max={1000}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="livable_area" style={{ marginRight: 10 }}>
          Livable area :{' '}
        </label>
        <StyledInput
          type="number"
          id="livable_area"
          name="livable_area"
          value={property.livable_area}
          min={1.0}
          max={1000000.0}
          step={0.1}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="id_address">Address : </label>
        <FormControl>
          <StyledSelect
            id="id_address"
            name="id_address"
            value={property.id_address}
            onChange={handleChange}
            disabled={options.length === 0}
          >
            {options.length === 0 && (
              <option value="" disabled>
                No address available
              </option>
            )}
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {'n°' +
                  option.flat_number +
                  ', ' +
                  (option.floor == 0 ? 'ground floor' : 'floor ' + option.floor) +
                  ', ' +
                  option.street_number +
                  ' ' +
                  option.street.name +
                  ', ' +
                  option.city.name}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <br />
        <br />
        {errorMessage && (
          <div>
            <div style={{ color: 'red' }}>{errorMessage}</div>
            <br />
          </div>
        )}
        <div style={{ display: 'flex' }}>
          <Button type="submit" variant="outlined" style={{ height: '25px' }} color="success">
            Save
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default AddPropertyForm;
