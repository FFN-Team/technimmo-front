import React, { useEffect, useState } from 'react';

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
    <div className="property-details">
      <Card>
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
          <label htmlFor="id_address">Address : </label>
          <select
            id="id_address"
            name="id_address"
            value={property.id_address}
            onChange={handleChange}
            disabled={options.length === 0}
            style={{ width: 300 }}
          >
            {options.length === 0 && (
              <option value="" disabled>
                No address available
              </option>
            )}
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.street_number + ' ' + option.street.name + ', ' + option.city.name}
              </option>
            ))}
          </select>
          <br />
          <br />
          {errorMessage && (
            <div>
              <div style={{ color: 'red' }}>{errorMessage}</div>
              <br />
            </div>
          )}
          <button type="submit">Save</button>
        </form>
      </Card>
    </div>
  );
};

const Card = ({ children }) => <div style={cardStyle}>{children}</div>;

const cardStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px'
};

export default AddPropertyForm;
