import React, { useState } from 'react';

// material-ui
import {
  //Avatar,
  //AvatarGroup,
  //Box,
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
  ToggleButton, 
  ToggleButtonGroup,
  Typography,
   IconButton, 
   Dialog, 
   DialogActions, DialogContent, DialogTitle, Button
} from '@mui/material';
import { Map, LocationCity, Info } from "@mui/icons-material";

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
import ProximityMap from './ProximityClusteringAddsMap';
import InteractiveMapGuide from './InteractiveMapGuide';
// import Filters from './Filters'; 
// import MapTest from './AddsMapTest copy';
import CityMap from './CityClusteringAddsMap';
import RealEstateInsights from './RealEstateInsights';
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
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            color: 'black',
            mb: 1,
            borderColor: 'primary.light',
            display: 'center',
          }}
        >
          🚀 Dashboard
        </Typography>
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
      <Typography variant="h2">Carte des annonces immobilières</Typography>
    </Grid>
    <Grid item>
      <ToggleButtonGroup
        value={selectedMap}
        exclusive
        onChange={(event, newValue) => {
          if (newValue !== null) setSelectedMap(newValue);
        }}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "8px",
          boxShadow: 5,
          padding: "4px",
          "& .MuiToggleButton-root": {
            textTransform: "none",
            padding: "6px 12px",
            fontSize: "14px",
            transition: "all 0.2s ease-in-out",
          },
        }}
        size="small"
      >
        <ToggleButton value="map1" aria-label="Carte par zone">
          <Map fontSize="small" />
          &nbsp; Carte par zone
        </ToggleButton>
        <ToggleButton value="map2" aria-label="Carte par villes">
          <LocationCity fontSize="small" />
          &nbsp; Carte par villes
        </ToggleButton>
      </ToggleButtonGroup>
      {/* IconButton for info */}
      <IconButton
        onClick={handleClickOpen}
        sx={{
          position: "absolute", // to position it on top of the buttons
          left: 770, // adjust based on where you want it
          // top: 80, // adjust based on where you want it
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: 3,
        }}
      >
        <Info fontSize="small" />
      </IconButton>

      {/* Dialog for displaying information */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Informations</DialogTitle>
        <DialogContent>
          <InteractiveMapGuide />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
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
    <Grid container xs={12} md={12} lg={12}>
      <MainCard content={false}>
        {selectedMap === 'map1' ? <Grid>
          <ProximityMap />
          <Grid item justifyContent="center" sx={{ pt: 3 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>Analyse des informations</Typography>
          </Grid>
          <RealEstateInsights />
        </Grid> : 
        <Grid>
          <CityMap />
          <Grid item  justifyContent="center" sx={{ pt: 3 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>Analyse des informations</Typography>
          </Grid>
          <RealEstateInsights />
        </Grid>}
      </MainCard>
    </Grid>
  </Grid>
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
    </Grid>
    </div>
  );
};

export default DashboardDefault;
