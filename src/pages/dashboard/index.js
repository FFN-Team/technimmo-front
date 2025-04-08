//import { useState } from 'react';

// material-ui
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Grid, Typography } from '@mui/material';
import Card from 'pages/components/Card.js';

// project import
//import OrdersTable from './OrdersTable';
//import IncomeAreaChart from './IncomeAreaChart';
//import MonthlyBarChart from './MonthlyBarChart';
//import ReportAreaChart from './ReportAreaChart';
//import SalesColumnChart from './SalesColumnChart';

import AdsPublicationDateChart from './AdsPublicationDateChart';
import AverageFavoritesDistributionPerAdBoostingChart from './AverageFavoritesDistributionPerAdBoostingChart';
import AverageFavoritesDistributionPerSellerTypeChart from './AverageFavoritesDistributionPerSellerTypeChart';

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
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>

      <br></br>

      <Tabs className="custom-tabs" selectedIndex={activeTab} onSelect={handleTabSelect}>
        <TabList className="custom-tab-list">
          <Tab>Annonces disponibles</Tab>
          <Tab>Analyse des biens</Tab>
          <Tab>Tendance du marché par ville</Tab>
          <Tab>Analyse des annonces</Tab>
          <Tab>Carte</Tab>
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
          <Card></Card>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default DashboardDefault;
