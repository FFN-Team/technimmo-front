import React, { useState } from 'react';

// material-ui
import {
  //Avatar,
  //AvatarGroup,
  //Box,
  Button,
  ButtonGroup,
  Grid,
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

// project import
//import OrdersTable from './OrdersTable';
//import IncomeAreaChart from './IncomeAreaChart';
//import MonthlyBarChart from './MonthlyBarChart';
//import ReportAreaChart from './ReportAreaChart';
//import SalesColumnChart from './SalesColumnChart';

import AdsPublicationDateChart from './AdsPublicationDateChart';
import AverageFavoritesDistributionPerAdBoostingChart from './AverageFavoritesDistributionPerAdBoostingChart';
import AverageFavoritesDistributionPerSellerTypeChart from './AverageFavoritesDistributionPerSellerTypeChart';

import ProspectContactOriginChart from './ProspectContactOriginChart';
import MainCard from 'components/MainCard';
import Map from './ProximityClusteringAddsMap';
// import Filters from './Filters'; 
// import MapTest from './AddsMapTest copy';
import MapTest2 from './CityClusteringAddsMap';
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
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(10000);
  // const [showHeatmap, setShowHeatmap] = useState(true);
  // const [showClusters, setShowClusters] = useState(true)

  return (
    <div>
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
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

       {/* row - Carte interactive
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
      </Grid> */}

      

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

    {/* ROW - Titre au-dessus de la carte + filtres */}
<Grid item xs={12}>
  <Grid container alignItems="center" justifyContent="space-between">
    <Grid item>
      <Typography variant="h5">Carte des annonces immobilières</Typography>
    </Grid>
    <Grid item>
      <ButtonGroup variant="outlined" color="primary">
        <Button
          onClick={() => setSelectedMap('map1')}
          variant={selectedMap === 'map1' ? 'contained' : 'outlined'}
        >
          Carte par quartier
        </Button>
        <Button
          onClick={() => setSelectedMap('map2')}
          variant={selectedMap === 'map2' ? 'contained' : 'outlined'}
        >
          Carte par villes
        </Button>
      </ButtonGroup>
    </Grid>
  </Grid>
</Grid>

    {/* ROW - Filtres + Carte côte à côte */}
<Grid item xs={12}>
  <Grid container spacing={2}>
    {/* Filtres (Sidebar) */}
    {/* <Paper sx={{ padding: 3, height: '100%' }}>
      <Filters
        showHeatmap={showHeatmap}
        setShowHeatmap={setShowHeatmap}
        showClusters={showClusters}
        setShowClusters={setShowClusters}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
    </Paper> */}

    {/* Carte interactive */}
    <Grid item xs={12} md={10} lg={10}>
      <MainCard content={false}>
        {selectedMap === 'map1' ? <Map /> : <MapTest2 />}
      </MainCard>
    </Grid>
  </Grid>
</Grid>
    </Grid>
    </div>
  );
};

export default DashboardDefault;
