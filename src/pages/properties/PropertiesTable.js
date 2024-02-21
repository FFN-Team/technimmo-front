import {useNavigate} from 'react-router-dom';
import React from 'react';


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
              propertyToFollowStatus: newStatus,
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
            <TableCell header>Nom de Propriété</TableCell>
            <TableCell header>Description</TableCell>
            <TableCell header>Nombre de pièces</TableCell>
            <TableCell header>Surface habitable</TableCell>
            <TableCell header>Statut</TableCell>
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
                    <option value="TO_VISITED">TO_VISITED</option>
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
  
  const Table = ({ children }) => (
    <table style={tableStyle}>
      {children}
    </table>
  );
  
  const TableHeader = ({ children }) => (
    <thead>
      <tr>
        {children}
      </tr>
    </thead>
  );
  
  const TableCell = ({ header, children, onClick }) => (
    header ? (
      <th style={tableHeaderStyle}>{children}</th>
    ) : (
      <td style={tableCellStyle} onClick={onClick}>{children}</td>
    )
  );
  
  const TableRow = ({ children }) => {
    return (
      <tr>
        {children}
      </tr>
    );
  };

  

const tableStyle = {
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
    width: '100%',
  };
  
  const tableHeaderStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };
  
  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  export default PropertiesTable;