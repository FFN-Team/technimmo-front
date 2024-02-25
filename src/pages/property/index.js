import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import PropertyDetails from './PropertyDetails';
import Document from 'pages/document/Documents';
import 'pages/components/Onglets.css';

const Property = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  const documentData = [
    ["Titre de propriété", 'PROPERTY_TITLE'],
    ["Plan cadastral", 'CADASTRAL_MAP'],
    ["Procès verbal de l'assemblée générale", 'GENERAL_MEETING'],
    ["Diagnostic de Performance Energétique", 'ENERGY_PERFORMANCE_DIAGNOSTIC']
  ];

  return (
    <div className="property-details">
      <Tabs className="custom-tabs" selectedIndex={activeTab} onSelect={handleTabSelect}>
        <TabList className="custom-tab-list">
          <Tab className={`custom-tab ${activeTab === 0 ? 'active' : ''}`}>Informations du bien</Tab>
          <Tab className={`custom-tab ${activeTab === 1 ? 'active' : ''}`}>Gestion des documents</Tab>
        </TabList>

        <TabPanel>
          <PropertyDetails />
        </TabPanel>
        <TabPanel>
          <Document documentData={documentData}/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Property;
