import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Card from 'pages/components/Card.js';
import FormControl from '@mui/material/FormControl';
import StyledInput from 'pages/components/InputElement.js';
import '../property/Form.css';

const BuyerDetails = ( {data} ) => {
  const { id } = useParams();
  const [buyer, setBuyer] = useState({
    title: '',
    lastname: '',
    firstname: '',
    day_of_birth: '',
    profession: '',
    mobile: '',
    mail: '',
    comment: ''  // Nouveau champ commentaire
  });
  const [hunting, setHunting ] = useState({
    status: '',
    start_date: '',
    end_date: ''
  })
  const [propertyCriteria, setPropertyCriteria ] = useState({
    roomsNumber: 0,
    minimumSurface: 0
  })

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchBuyerDataFromBuyerId = async () => {
        try {
          const usedDataBuyerInfo = {
            title: data.prospect?.title,
            lastname: data.prospect?.lastName,
            firstname: data.prospect?.firstName,
            day_of_birth: data.prospect?.dateOfBirth,
            profession: data.prospect?.profession,
            mobile: data.prospect?.mobile,
            mail: data.prospect?.email,
            comment: data.prospect?.comment || ''  // Chargement du commentaire, s'il existe
          };

          setBuyer(usedDataBuyerInfo);

          const usedDataHunting = {
            status: data.status,
            start_date: data.searchStartDate,
            end_date: data.searchEndDate
          };

          setHunting(usedDataHunting);

          const usedDataPropertyCriteria = {
            roomsNumber: data.propertyCriteria?.roomsNumber,
            minimumSurface: data.propertyCriteria?.minimumSurface
          }

          setPropertyCriteria(usedDataPropertyCriteria);

        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBuyerDataFromBuyerId();
    }, [id, data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  return (
    <div className="property-details" style={{ display: 'flex', flexWrap: 'wrap' }}>
      
      <Card>
        <FormControl className="form">
          <div>
            <label htmlFor="property_name">Titre : </label>
            <StyledInput
              type="text"
              id="title"
              name="title"
              value={buyer.title}
              required
              style={{ width: 200 }}
            />
          </div>

          <div>
            <label htmlFor="description">Prénom : </label>
            <StyledInput
              type="text"
              id="firstname"
              name="firstname"
              value={buyer.firstname}
              required
              style={{ width: 300 }}
            />
          </div>

          <div>
            <label htmlFor="number_of_rooms">Nom : </label>
            <StyledInput
              type="text"
              id="lastname"
              name="lastname"
              value={buyer.lastname}
              required
              style={{ width: 70 }}
            />
          </div>

          <div>
            <label htmlFor="livable_area">Date de naissance : </label>
            <StyledInput
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={buyer.day_of_birth}
              required
            />
          </div>

          <div>
            <label htmlFor="livable_area">Profession : </label>
            <StyledInput
              type="text"
              id="profession"
              name="profession"
              value={buyer.profession}
              required
            />
          </div>

          <div>
            <label htmlFor="livable_area">Numéro de téléphone : </label>
            <StyledInput
              type="text"
              id="mobile"
              name="mobile"
              value={buyer.mobile}
              required
            />
          </div>

          <div>
            <label htmlFor="livable_area">E-mail : </label>
            <StyledInput
              type="text"
              id="mail"
              name="mail"
              value={buyer.mail}
              required
            />
          </div>
        </FormControl>
      </Card>

      <Card>
        <FormControl className="form">
          <div>
            <label htmlFor="status">Statut de la recherche : </label>
            <StyledInput
              type="text"
              id="status"
              name="status"
              value={hunting.status}
              required
              style={{ width: 200 }}
            />
          </div>

          <div>
            <label htmlFor="startDate">Date de début de recherche : </label>
            <StyledInput
              type="date"
              id="startDate"
              name="startDate"
              value={hunting.start_date}
              required
              style={{ width: 300 }}
            />
          </div>

          <div>
            <label htmlFor="endDate">Date de fin de recherche : </label>
            <StyledInput
              type="date"
              id="endDate"
              name="endDate"
              value={hunting.end_date}
              required
              style={{ width: 300 }}
            />
          </div>

          {/* Nouveau champ Commentaire */}
          <div>
            <label htmlFor="comment">Commentaire : </label>
            <StyledInput
              type="text"
              id="comment"
              name="comment"
              value={buyer.comment}
              onChange={handleChange}
              style={{ width: '100%', height: '100px' }}  // Largeur et hauteur pour texte plus long
            />
          </div>
        </FormControl>
      </Card>

      <Card>
        <FormControl className="form">
          <div>
            <label htmlFor="status">Nombre de chambres : </label>
            <StyledInput
              type="text"
              id="status"
              name="status"
              value={propertyCriteria.roomsNumber}
              required
              style={{ width: 200 }}
            />
          </div>

          <div>
            <label htmlFor="startDate">Surface Minimum : </label>
            <StyledInput
              type="number"
              id="startDate"
              name="startDate"
              value={propertyCriteria.minimumSurface}
              required
              style={{ width: 300 }}
            />
          </div>
        </FormControl>
      </Card>
    </div>
  );
};

export default BuyerDetails;