import React, { useState } from 'react';

// material-ui
import {
  //Avatar,
  //AvatarGroup,
  Box,
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

const DashBoardMap = () => {
  //const [value, setValue] = useState('today');
  //const [slot, setSlot] = useState('week');
  const [selectedMap, setSelectedMap] = useState("map1");
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(10000);
  // const [showHeatmap, setShowHeatmap] = useState(true);
  // const [showClusters, setShowClusters] = useState(true)
  const [openMapInformationDialog, setOpenMapInformationDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenMapInformationDialog(true);
  };

  const handleCloseMapInformationDialog = () => {
    setOpenMapInformationDialog(false);
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
          Connaissance Terrain
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ mb: 2 }}>
  <Grid
    container
    spacing={2}
    alignItems="center"
    justifyContent="space-between"
    flexWrap="wrap"
  >
    {/* Titre */}
    <Grid item xs={12} sm={6}>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        Carte des annonces immobilières
      </Typography>
    </Grid>

    {/* Filtres + Bouton info */}
    <Grid
      item
      xs={12}
      sm={6}
      sx={{
        display: 'flex',
        justifyContent: { xs: 'flex-start', sm: 'flex-end' },
        alignItems: 'center',
        gap: 1,
        flexWrap: 'wrap',
      }}
    >
      <ToggleButtonGroup
        value={selectedMap}
        exclusive
        onChange={(event, newValue) => {
          if (newValue !== null) setSelectedMap(newValue);
        }}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "8px",
          boxShadow: 3,
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
        <ToggleButton value="map1" aria-label="Carte par villes">
          <LocationCity fontSize="small" />
          &nbsp; Carte par villes
        </ToggleButton>
        <ToggleButton value="map2" aria-label="Carte par zones">
          <Map fontSize="small" />
          &nbsp; Carte par zones
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Bouton Info */}
      <IconButton
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: 3,
          ml: 1,
        }}
      >
        <Info fontSize="small" />
      </IconButton>
    </Grid>
  </Grid>

  {/* Dialog d'information */}
  <Dialog open={openMapInformationDialog} onClose={handleCloseMapInformationDialog}>
    <DialogTitle>Informations</DialogTitle>
    <DialogContent>
      <InteractiveMapGuide />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseMapInformationDialog} color="primary">
        Fermer
      </Button>
    </DialogActions>
  </Dialog>
</Grid>



    {/* ROW - Filtres + Carte côte à côte */}
    <Grid container spacing={2}>
  <Grid item xs={12}>
    <MainCard content={false}>
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}> {/* Padding responsive */}
        {selectedMap === 'map1' ? (
          <>
            <CityMap />
            <Typography 
              variant="h4"
              align="center"
              sx={{ fontWeight: 'bold', my: 3, fontSize: { xs: '1.5rem', sm: '2rem' } }}
            >
              Analyse des informations concernant les annonces immobilières
            </Typography>
            <RealEstateInsights />
          </>
        ) : (
          <>
            <ProximityMap />
            <Typography 
              variant="h4"
              align="center"
              sx={{ fontWeight: 'bold', my: 3, fontSize: { xs: '1.5rem', sm: '2rem' } }}
            >
              Analyse des informations concernant les annonces immobilières
            </Typography>
            <RealEstateInsights />
          </>
        )}
      </Box>
    </MainCard>
  </Grid>
</Grid>
    </Grid>
    </div>
  );
};

export default DashBoardMap;
