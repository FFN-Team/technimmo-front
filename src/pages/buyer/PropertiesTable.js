import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableCell, TableRow } from './TableComponents';


const PropertiesTable = ({ properties }) => {
    const navigate = useNavigate();
  
    const handlePropertyClick = (propertyId) => {
      navigate(`/properties/${propertyId}`);
    };
  
    const handleStatusChange = async (event, propertyId) => {
      const userConfirmed = window.confirm("Vous allez changer de status. Souhaitez-vous poursuivre?");
  
      if (userConfirmed) {
        const newStatus = event.target.value;
        try {
          const url = `http://localhost:9001/api/v1/properties-to-follow/${propertyId}/status`;
  
          await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              propertyToFollowStatus : newStatus
            }),
          });
  
          window.location.reload();
        } catch (error) {
          console.error("Une erreur s'est produite lors de la mise à jour du statut :", error);
          alert("Une erreur s'est produite. Veuillez réessayer.");
        }
      }
      event.target.value = "DEFAUT";
    };
  
  
    return (
      properties && Array.isArray(properties) && (
        <Table>
          <TableHeader>
            <TableCell header>Property Name</TableCell>
            <TableCell header>Description</TableCell>
            <TableCell header>Rooms Number</TableCell>
            <TableCell header>Livable Area</TableCell>
            <TableCell header>Status</TableCell>
          </TableHeader>
          <tbody>
            {properties.map((property) => (
              <TableRow key={property.property.id} propertyId={property.property.id}>
                <TableCell onClick={() => handlePropertyClick(property.property.id)}>
                  <div style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    {property.property.propertyName}
                  </div>
                </TableCell>
                <TableCell>{property.property.description}</TableCell>
                <TableCell>{property.property.roomsNumber}</TableCell>
                <TableCell>{property.property.livableArea} sq. m</TableCell>
                <TableCell>
                  <select
                    onChange={(event) => handleStatusChange(event, property.id)}
                  >
                    <option 
                      value="DEFAUT"
                      style={{                    
                        backgroundColor: 'green',
                      }}  
                    >
                      {property.status}
                    </option>
                    <option value="TO_STUDY">TO_STUDY</option>
                    <option value="TO_VISIT">TO_VISIT</option>
                    <option value="VISITED">VISITED</option>
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )
    );
  };

export default PropertiesTable;
