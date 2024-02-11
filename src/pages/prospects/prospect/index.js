import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Importer les styles de react-tabs
import Prospects from './Prospect'; // Importer le composant Prospects
import Document from './Documents'; // Importer le composant Document
import './Onglets.css'; // Importer le fichier de style CSS

const Onglets = () => {
  return (
    <Tabs className="custom-tabs">
      <TabList className="custom-tab-list">
        <Tab className="custom-tab">Informations prospect</Tab>
        <Tab className="custom-tab">Gestion des documents</Tab>
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
