import { useState } from 'react';

// material-ui
import {
  //Avatar,
  //AvatarGroup,
  //Box,
  Button,
  ButtonGroup,
  Grid,
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

// project import
//import OrdersTable from './OrdersTable';
//import IncomeAreaChart from './IncomeAreaChart';
//import MonthlyBarChart from './MonthlyBarChart';
//import ReportAreaChart from './ReportAreaChart';
//import SalesColumnChart from './SalesColumnChart';
import ProspectAgeGroupChart from './ProspectAgeGroupChart';
import ProspectProfessionChart from './ProspectProfessionChart';
import ProspectContactOriginChart from './ProspectContactOriginChart';
import MainCard from 'components/MainCard';
import Map from './ProximityClusteringAddsMap';
// import MapTest from './AddsMapTest copy';
import MapTest2 from './AddsMapTest copy';
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
  const [selectedMap, setSelectedMap] = useState("map1");

  return (
    <div>
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={9} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Number of prospects by age group</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <ProspectAgeGroupChart />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Number of prospects by profession</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <ProspectProfessionChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
            <Typography variant="h5">Number of prospects by contact origin</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
        <ProspectContactOriginChart />
        </MainCard>
      </Grid>

       {/* row - Carte interactive */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Carte des annonces immobilières</Typography>
          </Grid>
          <Grid item>
            <ButtonGroup variant="outlined" color="primary">
              <Button
                onClick={() => setSelectedMap("map1")}
                variant={selectedMap === "map1" ? "contained" : "outlined"}
              >
                Carte 1 (cluster)
              </Button>
              <Button
                onClick={() => setSelectedMap("map2")}
                variant={selectedMap === "map2" ? "contained" : "outlined"}
              >
                Carte 2 (polygones)
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        <MainCard sx={{ mt: 2 }} content={false}>
          {selectedMap === "map1" ? <Map /> : <MapTest2 />}
        </MainCard>
      </Grid>

      

      {/* row 4
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
          <Typography variant="h5">Carte des annonces immobilières</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <MapTest/>
        </MainCard>
      </Grid> */}


    </Grid>
    </div>
  );
};

export default DashboardDefault;
