import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Buyer = () => {
  const {id} = useParams();
  const [buyer, setBuyer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [portofolioPTF, setPortofolioPTF] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const url = 'http://localhost:9001/api/v1/buyers/'+id;       
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBuyer(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []); 


  const findProperties = async () => {
    try {
      const url = 'http://localhost:9001/api/v1/buyers/'+id+'/portfolio-PTF';       
      console.log("url testttttttttt")
      console.log(url)
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPortofolioPTF(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="buyer-details">
      <div className="cards-container">
        <div className="cards">
          <Card>
            <p>ID : {buyer.id}</p>
            <p>Title : {buyer.prospect?.title}</p>
            <p>Last Name : {buyer.prospect?.lastName}</p>
            <p>First Name : {buyer.prospect?.firstName}</p>
            <p>Date de naissance : {buyer.prospect?.dateOfBirth}</p>
            <p>Profession : {buyer.prospect?.profession}</p>
            <p>Mobile : {buyer.prospect?.mobile}</p>
            <p>Mail : {buyer.prospect?.mail}</p>
          </Card>
          <Card>
            <p>Statut : {buyer.statut}</p>
            <p>Date debut recherche : {buyer.dateDebutRecherche}</p>
            <p>Date fin recherche : {buyer.dateFinRecherche}</p>
          </Card>
          <Card>
            <p>Property criteria - Rooms Number: {buyer.propertyCriteria?.roomsNumber}</p>
            <p>Property criteria - Minimum Surface: {buyer.propertyCriteria?.minimumSurface}</p>
          </Card>
        </div>
        <div className="find-properties">
          <Card>
            <p><strong>Portfolio Properties To Follow : </strong></p>
            <button onClick={findProperties}>Refresh</button>
            {portofolioPTF.propertiesToFollow && Array.isArray(portofolioPTF.propertiesToFollow) && (
              <ul>
                {portofolioPTF.propertiesToFollow.map((property, index) => (
                  <li key={index}>
                    <strong>{property.property.propertyName}</strong> --- {property.property.description} ({property.property.roomsNumber} rooms --- {property.property.livableArea} sq. m) --- State: {property.stateToFollow}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

const Card = ({ children }) => (
  <div style={cardStyle}>
    {children}
  </div>
);

const cardStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px',
};

export default Buyer;