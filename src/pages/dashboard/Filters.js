// Filters.js
import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography
} from '@mui/material';

const Filters = ({
  showHeatmap,
  setShowHeatmap,
  showClusters,
  setShowClusters,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice
}) => {
  return (
    <>
      <Typography variant="h6">Filtres</Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Filtrer par prix :
      </Typography>
      <Slider
        value={[minPrice, maxPrice]}
        onChange={(e, newValue) => {
          setMinPrice(newValue[0]);
          setMaxPrice(newValue[1]);
        }}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}€`}
        min={0}
        max={10000}
        step={100}
        sx={{ marginBottom: 2 }}
      />

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={showHeatmap}
              onChange={(e) => setShowHeatmap(e.target.checked)}
            />
          }
          label="Afficher la Heatmap"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={showClusters}
              onChange={(e) => setShowClusters(e.target.checked)}
            />
          }
          label="Afficher les Clusters"
        />
      </FormGroup>

      {/* Statistiques */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Statistiques
      </Typography>
      <Typography variant="body2">Nombre total dannonces : {/* à compléter */}</Typography>
      <Typography variant="body2">Prix moyen : {/* à compléter */}€</Typography>
    </>
  );
};

export default Filters;