import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { format } from 'date-fns';
import Card from './Card';
import PropertiesTable from './PropertiesTable';

const Buyer = () => {
  const { id } = useParams();
  const [buyer, setBuyer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertiesToFollow, setPropertiesToFollow] = useState([]);


  //fetchBuyerDataFromBuyerId
  useEffect(() => {
    const fetchBuyerDataFromBuyerId = async () => {
      try {
        const url = `http://localhost:9001/api/v1/buyers/${id}`;
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

    fetchBuyerDataFromBuyerId();
  }, [id]);


  //fetchPropertiesToFollowDataFromBuyerId
  useEffect(() => {
    const fetchPropertiesToFollowDataFromBuyerId = async () => {
      try {
        const url = `http://localhost:9001/api/v1/buyers/${id}/properties-to-follow`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPropertiesToFollow(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertiesToFollowDataFromBuyerId();
  }, []);

  const refreshPropertiesToFollow = async () => {
    try {
      const url = `http://localhost:9001/api/v1/buyers/${id}/properties-to-follow`;
      await fetch(url, {
        method: 'PUT',
      });

      window.location.reload();
    } catch (error) {
      console.error("Une erreur s'est produite lors de la réinitialisation des propriétés à suivre :", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
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
              <p>Statut : {buyer.status}</p>
              <p>Date debut recherche : {buyer.searchStartDate ? format(new Date(buyer.searchStartDate), 'yyyy-MM-dd') : 'N/A'}</p>
              <p>Date fin recherche : {buyer.searchEndDate ? format(new Date(buyer.searchEndDate), 'yyyy-MM-dd') : 'N/A'}</p>
            </Card>
            <Card>
              <p>Property criteria - Rooms Number: {buyer.propertyCriteria?.roomsNumber}</p>
              <p>Property criteria - Minimum Surface: {buyer.propertyCriteria?.minimumSurface}</p>
            </Card>
        </div>
        <div className="find-properties">
          <Card>
            <p><strong>Portfolio properties to follow :</strong></p>
            {propertiesToFollow.length === 0 && (
              <button onClick={refreshPropertiesToFollow}>Find</button>
            )}
            {propertiesToFollow.length !== 0 && (
              <button onClick={refreshPropertiesToFollow}>Refresh</button>
            )}

            <PropertiesTable properties={propertiesToFollow}/>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Buyer;