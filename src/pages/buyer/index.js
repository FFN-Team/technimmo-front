import { useParams/*,useNavigate*/ } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Buyer = () => {
  const { id } = useParams();
  const [buyer, setBuyer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [portofolioPTF, setPortofolioPTF] = useState([]);
  

  useEffect(() => {
    const fetchDataFromApi = async () => {
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

    fetchDataFromApi();
  }, [id]);

  const findProperties = async () => {
    try {
      const url = `http://localhost:9001/api/v1/buyers/${id}/portfolio-PTF`;
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
            <p><strong>Portfolio Properties To Follow:</strong></p>
            <button onClick={findProperties}>Refresh</button>
            <PropertiesTable properties={portofolioPTF.propertiesToFollow}/>
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

const PropertiesTable = ({ properties }) => (
  properties && Array.isArray(properties) && (
    <Table>
      <TableHeader>
        <TableCell header>Property Name</TableCell>
        <TableCell header>Description</TableCell>
        <TableCell header>Rooms Number</TableCell>
        <TableCell header>Livable Area</TableCell>
        <TableCell header>State</TableCell>
      </TableHeader>
      <tbody>
        {properties.map((property) => (
          <TableRow key={property.property.id} propertyId={property.property.id}>
            <TableCell>{property.property.propertyName}</TableCell>
            <TableCell>{property.property.description}</TableCell>
            <TableCell>{property.property.roomsNumber}</TableCell>
            <TableCell>{property.property.livableArea} sq. m</TableCell>
            <TableCell>{property.stateToFollow}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  )
);

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

const TableCell = ({ header, children }) => (
  header ? (
    <th style={tableHeaderStyle}>{children}</th>
  ) : (
    <td style={tableCellStyle}>{children}</td>
  )
);

const TableRow = ({ children /*,propertyId*/ }) => {
  // const navigate = useNavigate();

  // const handleTableRowClick = () => {
  //   navigate(`/properties/${propertyId}`);
  // };

  return (
    <tr /*style={{ cursor: 'pointer' }} onClick={handleTableRowClick}*/>
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

export default Buyer;
