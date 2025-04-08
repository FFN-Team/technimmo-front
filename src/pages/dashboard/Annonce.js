import React, { useState } from 'react';

// material-ui
import {
  //Avatar,
  //AvatarGroup,
  Box,
  Divider,
  // Paper,
  //List,
  /*ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,*/
  Typography
} from '@mui/material';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// project import
//import OrdersTable from './OrdersTable';
//import IncomeAreaChart from './IncomeAreaChart';
//import MonthlyBarChart from './MonthlyBarChart';
//import ReportAreaChart from './ReportAreaChart';
//import SalesColumnChart from './SalesColumnChart';

// import Filters from './Filters'; 
// import MapTest from './AddsMapTest copy';
import DashBoardMap from './DashBoardMap';
import CustomerKnowledge from './CustomerKnowledge';
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