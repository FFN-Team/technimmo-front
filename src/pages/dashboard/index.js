//import { useState } from 'react';

// material-ui
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Box, Typography, Divider } from '@mui/material';
import Card from 'pages/components/Card.js';


import 'pages/components/Onglets.css'; // Importer le fichier de style CSS
// project import
//import OrdersTable from './OrdersTable';
//import IncomeAreaChart from './IncomeAreaChart';
//import MonthlyBarChart from './MonthlyBarChart';
//import ReportAreaChart from './ReportAreaChart';
//import SalesColumnChart from './SalesColumnChart';

import AdsPublicationDateChart from './AdsPublicationDateChart';
import AverageFavoritesDistributionPerAdBoostingChart from './AverageFavoritesDistributionPerAdBoostingChart';
import AverageFavoritesDistributionPerSellerTypeChart from './AverageFavoritesDistributionPerSellerTypeChart';
import DashBoardMap from './DashBoardMap';

//import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
//import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
//import avatar1 from 'assets/images/users/avatar-1.png';
//import avatar2 from 'assets/images/users/avatar-2.png';
//import avatar3 from 'assets/images/users/avatar-3.png';
//import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
/*const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];
*/
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  //const [value, setValue] = useState('today');
  //const [slot, setSlot] = useState('week');
  const [activeTab, setActiveTab] = useState(0);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <Box sx={{ px: 4, py: 3 }}>
       {/* EN-TÊTE DU DASHBOARD */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                Piloter son secteur : Vision 360° du marché immobilier local
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                Cartographie & Analyse stratégique du marché immobilier
                </Typography>
                <Divider sx={{ mt: 2 }} />
              </Box>

      {/* ONGLET REACT-TABS */}
              <Tabs selectedIndex={activeTab} onSelect={handleTabSelect}>
              <TabList className="custom-tab-list">
                <Tab className={`custom-tab ${activeTab === 0 ? 'active' : ''}`}>🏡 Annonces disponibles</Tab>
                <Tab className={`custom-tab ${activeTab === 1 ? 'active' : ''}`}>📊 Analyse des biens</Tab>
                <Tab className={`custom-tab ${activeTab === 2 ? 'active' : ''}`}>🌆 Tendance par ville</Tab>
                <Tab className={`custom-tab ${activeTab === 3 ? 'active' : ''}`}>🧠 Analyse des annonces</Tab>
                <Tab className={`custom-tab ${activeTab === 4 ? 'active' : ''}`}>🗺️ Carte interactive</Tab>
              </TabList>

        <TabPanel>
          <Card>
            <AdsPublicationDateChart />
          </Card>
        </TabPanel>
        <TabPanel>
          <Card></Card>
        </TabPanel>
        <TabPanel>
          <Card></Card>
        </TabPanel>
        <TabPanel>
          <Card>
            <p style={{ paddingLeft: '50px', paddingRight: '50px', paddingTop: '30px', textAlign: 'justify', textIndent: 5 }}>
              {
                "Dans cette section, comme le jeu de données ne possède pas des annonces de biens déjà vendus, nous évaluons le succès d'une annonce à son nombre de mises en favori."
              }
              <br></br>
              {
                "Analyser le nombre de mises en favori des annonces sans prendre en compte leur durée passée en ligne provoquerait un biais. En effet, une annonce publiée antérieurement à une autre risque d'obtenir plus de mises en favori que cette dernière, compte tenu de sa durée d'accessibilité plus élévée. Ainsi, nous avons réparti les données par mois afin de corriger ce biais. Cependant, cette correction est partielle puisqu'il subsiste une différence de temps entre la date de publication en début et en fin de mois."
              }
              <br></br>
              {
                "De plus, pour ces graphiques, seuls les mois ayant chaque type d'annonces souhaité sont conservées. Par exemple, pour le graphique 'Distribution moyenne de mises en favori par annonce', les mois ayant seulement des annonces boostées ou seulement des annonces non boostées ne sont pas gardés, la comparaison entre les annonces boostées et non boostées étant impossible."
              }
            </p>
            <AverageFavoritesDistributionPerAdBoostingChart />
            <AverageFavoritesDistributionPerSellerTypeChart />
          </Card>
        </TabPanel>
        <TabPanel>
          <DashBoardMap />
        </TabPanel>
      </Tabs>
      </Box>
    </div>
  );
};

export default DashboardDefault;
