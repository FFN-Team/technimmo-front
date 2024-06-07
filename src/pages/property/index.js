import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import PropertyDetails from './PropertyDetails';
import Document from 'pages/document/Documents';
import 'pages/components/Onglets.css';
import { useParams } from 'react-router-dom';

const Property = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  
  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const fetchPropertyDataFromPropertyId = async () => {
      try {
        const url = `http://localhost:9001/api/v1/properties/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPropertyDataFromPropertyId();
  }, [id]);

  const [documentData, setDocumentData] = useState([
    ["Titre de propriété", 'PROPERTY_TITLE', []],
    ["Plan cadastral", 'CADASTRAL_MAP', []],
    ["Procès verbal de l'assemblée générale", 'GENERAL_ASSEMBLY', []],
    ["Diagnostic de Performance Energétique", 'ENERGY_PERFORMANCE_DIAGNOSIS', []]
]);

useEffect(() => {
  fetch(`http://localhost:9001/api/v1/documents/PROPERTY/${id}`)
      .then(response => response.json())
      .then(data => {
          // Créer un objet pour mapper les fichiers par documentTypeCode
          const filesByType = {};
          data.files.forEach(fileGroup => {
              filesByType[fileGroup.documentTypeCode] = fileGroup.documentTypeFiles;
          });

          // Mettre à jour documentData avec les listes de fichiers
          const updatedDocumentData = documentData.map(([label, type]) => {
              const files = filesByType[type] || [];
              return [label, type, files];
          });

          setDocumentData(updatedDocumentData);
      })
      .catch(error => console.error('Error fetching data:', error));
}, []);


  return (
    <div className="property-details">
      <Tabs className="custom-tabs" selectedIndex={activeTab} onSelect={handleTabSelect}>
        <TabList className="custom-tab-list">
          <Tab className={`custom-tab ${activeTab === 0 ? 'active' : ''}`}>Informations du bien</Tab>
          <Tab className={`custom-tab ${activeTab === 1 ? 'active' : ''}`}>Gestion des documents</Tab>
        </TabList>

        <TabPanel>
          <PropertyDetails load={loading} />
        </TabPanel>
        <TabPanel>
          <Document owner={property} documentData={documentData}/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Property;
