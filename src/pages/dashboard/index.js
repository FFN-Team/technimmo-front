import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DashBoardMap from './DashBoardMap';
import CustomerKnowledge from './CustomerKnowledge';
import 'pages/components/Onglets.css'; // Tu peux ajouter des styles personnalisés ici
import { Typography, Box, Divider } from '@mui/material';

const DashboardDefault = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  return (
    <Box sx={{ px: 4, py: 3 }}>
      {/* EN-TÊTE DU DASHBOARD */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Tableau de bord
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Analyse des données terrain & connaissance clients
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      {/* ONGLET REACT-TABS */}
      <Tabs selectedIndex={activeTab} onSelect={handleTabSelect}>
        <TabList className="custom-tab-list">
          <Tab className={`custom-tab ${activeTab === 0 ? 'active' : ''}`}>🗺️ Connaissance Terrain</Tab>
          <Tab className={`custom-tab ${activeTab === 1 ? 'active' : ''}`}>👥 Connaissance Clients</Tab>
        </TabList>

        <TabPanel>
          <DashBoardMap />
        </TabPanel>
        <TabPanel>
          <CustomerKnowledge />
        </TabPanel>
      </Tabs>
    </Box>
  );
};

export default DashboardDefault;