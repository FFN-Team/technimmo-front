import React from 'react';
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Importer les styles de react-tabs
import Prospects from './Prospect'; // Importer le composant Prospects
import Document from './Documents';
import './Onglets.css'; // Importer le fichier de style CSS

const Onglets = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

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
        <Document />
      </TabPanel>
    </Tabs>
  );
};

export default Onglets;
