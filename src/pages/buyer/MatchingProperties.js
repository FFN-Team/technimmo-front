import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Grid,
  Box,
  Slider,
  Paper
} from '@mui/material';

const MatchingProperties = ({ buyer }) => {
  const [criteria, setCriteria] = useState({
    minSurface: '',
    maxSurface: '',
    maxBudget: '',
    city: '',
    rooms: '',
    bedrooms: '',
    buildingYear: '',
    propertyType: ''
  });

  const [weights, setWeights] = useState({
    minSurface: 1,
    maxSurface: 1,
    maxBudget: 1,
    city: 1,
    rooms: 1,
    bedrooms: 1,
    buildingYear: 1,
    propertyType: 1
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyerData = () => {
      const usedDataBuyerInfo = {
        minSurface: buyer?.propertyCriteria?.minimumSurface ?? '',
        maxSurface: buyer?.propertyCriteria?.maximumSurface ?? '',
        maxBudget: buyer?.propertyCriteria?.maxBudget ?? '',
        city: buyer?.propertyCriteria?.city ?? '',
        rooms: buyer?.propertyCriteria?.roomsNumber ?? '',
        bedrooms: buyer?.propertyCriteria?.bedrooms ?? '',
        buildingYear: buyer?.propertyCriteria?.buildingYear ?? '',
        propertyType: buyer?.propertyCriteria?.propertyType ?? ''
      };
      setCriteria(usedDataBuyerInfo);
    };

    fetchBuyerData();
  }, [buyer]);

  const handleChange = (e) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const handleWeightSlider = (name) => (e, value) => {
    setWeights({ ...weights, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:9001/api/v1/matching-properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ criteria, weights })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'minSurface', label: 'Surface min (m²)', type: 'number' },
    { name: 'maxSurface', label: 'Surface max (m²)', type: 'number' },
    { name: 'maxBudget', label: 'Budget max (€)', type: 'number' },
    { name: 'city', label: 'Ville', type: 'text' },
    { name: 'rooms', label: 'Nb de pièces', type: 'number' },
    { name: 'bedrooms', label: 'Nb de chambres', type: 'number' },
    { name: 'buildingYear', label: 'Année de construction min', type: 'number' }
  ];

  // Définir les points d'arrêt pour les sliders
  const marks = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' }
  ];

  return (
    <Box sx={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f4f6f8', borderRadius: '10px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3c4858' }}>
        Rechercher des biens pour l’acquéreur
      </Typography>

      <form onSubmit={handleSearch}>
        <Grid container spacing={3}>
          {fields.map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field.name}>
              <Paper sx={{ padding: '16px', boxShadow: 3, borderRadius: '8px' }}>
                <TextField
                  fullWidth
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  value={criteria[field.name]}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ marginBottom: '16px' }}
                />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: '#555', marginBottom: '8px' }}>
                    Importance du critère ({weights[field.name]})
                  </Typography>
                  <Slider
                    name={field.name}
                    value={weights[field.name]}
                    onChange={handleWeightSlider(field.name)}
                    min={0}
                    max={5}
                    step={1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}`}
                    marks={marks}
                    sx={{
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#3f51b5',
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#3f51b5',
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}

          {/* Type de bien avec slider */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: '16px', boxShadow: 3, borderRadius: '8px' }}>
              <TextField
                select
                fullWidth
                name="propertyType"
                label="Type de bien"
                value={criteria.propertyType}
                onChange={handleChange}
                variant="outlined"
                sx={{ marginBottom: '16px' }}
              >
                <MenuItem value="">Tous types</MenuItem>
                <MenuItem value="house">Maison</MenuItem>
                <MenuItem value="apartment">Appartement</MenuItem>
                <MenuItem value="duplex">Duplex</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
              </TextField>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" sx={{ color: '#555', marginBottom: '8px' }}>
                  Importance du critère ({weights.propertyType})
                </Typography>
                <Slider
                  name="propertyType"
                  value={weights.propertyType}
                  onChange={handleWeightSlider('propertyType')}
                  min={0}
                  max={5}
                  step={1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}`}
                  marks={marks}
                  sx={{
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#3f51b5',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#3f51b5',
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '50px',
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Lancer la recherche'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {error && (
        <Typography color="error" mt={4} sx={{ textAlign: 'center', fontSize: '18px' }}>
          {error}
        </Typography>
      )}

      {results.length > 0 && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#3c4858' }}>
            Biens correspondants :
          </Typography>
          <Grid container spacing={2}>
            {results.map((property, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ boxShadow: 3, borderRadius: '8px' }}>
                  <CardContent sx={{ padding: '16px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {property.title || 'Titre non disponible'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">Surface : {property.surface} m²</Typography>
                    <Typography variant="body2" color="textSecondary">Prix : {property.price} €</Typography>
                    <Typography variant="body2" color="textSecondary">Ville : {property.city}</Typography>
                    <Typography variant="body2" color="textSecondary">Pièces : {property.rooms}</Typography>
                    <Typography variant="body2" color="textSecondary">Chambres : {property.bedrooms}</Typography>
                    <Typography variant="body2" color="textSecondary">Type : {property.propertyType}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default MatchingProperties;
