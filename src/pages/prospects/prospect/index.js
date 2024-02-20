import React from 'react';
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Importer les styles de react-tabs
import Prospects from './Prospect'; // Importer le composant Prospects
import Document from 'pages/document/Documents';
import 'pages/components/Onglets.css'; // Importer le fichier de style CSS
import Card from 'pages/components/Card';


const Onglets = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  const card = (
      <div className="card-container">     
        <Card>
            <h3>Justificatif d&rsquo;identité du propriétaire</h3>
        </Card>
        <Card>
            <h3>Contrat mariage, PACS ou Jugement de divorce</h3>
        </Card>
      </div>);

  return (
    <Tabs className="custom-tabs"  selectedIndex={activeTab} onSelect={handleTabSelect}>
      <TabList className="custom-tab-list">
        <Tab className={`custom-tab ${activeTab === 0 ? 'active' : ''}`}>Informations prospect</Tab>
        <Tab className={`custom-tab ${activeTab === 1 ? 'active' : ''}`}>Gestion des documents</Tab>
      </TabList>

      <TabPanel>
        <Prospects />
      </TabPanel>
      <TabPanel>
        <Document element={card} />
      </TabPanel>
    </Tabs>
  );
};

export default Onglets;
