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
import { Link } from 'react-router-dom';

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
  const [isInitialized, setIsInitialized] = useState(false);

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
      setIsInitialized(true);
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
      // const response = await fetch('http://localhost:9001/api/v1/properties'
        // , {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ criteria, weights })
      // });

      // if (!response.ok) {
      //   throw new Error('Erreur lors de la recherche');
      // }

      // const data = await response.json();

      const data = [2905282274, 2888689993, 2783453323, 2848263049, 2929426493];
  
      // Utiliser Promise.all pour attendre toutes les requêtes
      const promises = data.map(element => fetchMatchingAnnonces(element));
      await Promise.all(promises);
  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchMatchingAnnonces = async (ID) => {
    const response = await fetch(`http://localhost:5000/api/annonces/${ID}`);
  
    if (!response.ok) {
      throw new Error('Erreur lors de la recherche');
    }
  
    const data = await response.json();
    console.log(data);
  
    // Utiliser la forme fonctionnelle de setResults pour accumuler les résultats
    setResults(prevResults => [...prevResults, ...data]);
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
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 3, sm: 4 },
        width: '100%',
        mx: 'auto',
        backgroundColor: '#f4f6f8',
        borderRadius: '10px',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3c4858' }}>
        Rechercher des biens pour l’acquéreur
      </Typography>

      <form onSubmit={handleSearch}>
        <Grid container spacing={3}>
          {isInitialized && fields.map((field) => (
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

          {/* Boutons d'action */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: '#e0e0e0',
                color: '#333',
                padding: '12px 28px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '30px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#cfcfcf',
                  transform: 'scale(1.03)',
                  boxShadow: '0px 6px 14px rgba(0,0,0,0.15)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Lancer la recherche'}
            </Button>
          </Grid>

          {/* Bouton pour enregistrer les critères */}
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"// Appelle une fonction pour sauvegarder les critères
              sx={{
                padding: '12px 28px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '30px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                  transform: 'scale(1.03)',
                  boxShadow: '0px 6px 14px rgba(0,0,0,0.15)',
                },
              }}
            >
              Enregistrer les critères
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
        <Box mt={10}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#2d2d2d', mb: 2, fontSize: '1.3rem'  }}>
            Biens qui pourraient lui plaire :
          </Typography>
          <Grid container spacing={3}>
            {results.map((property, index) => (
              <Grid item xs={12} sm={6} md={12} key={index}>
                <Card
                  sx={{
                    borderRadius: '20px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                    backgroundColor: '#fefefe',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2d2d2d', fontSize: '1.2rem' }}>
                      Maison {property.rooms} pièces - {property.square} m²
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: '#555', fontSize: '0.9rem' }}>
                      <strong>📝 Description : </strong>{property.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontSize: '0.9rem'  }}>
                      <strong>🌐 Lien : </strong><Link to={property.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', fontSize: '0.9rem' }}>{property.url}</Link>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 'medium', fontSize: '0.9rem'  }}>
                      <strong>💰 Prix : {property.price.toLocaleString()} €</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontSize: '0.9rem' }}>
                      <strong>📍 Ville :</strong> {property.zipCode}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleAddToFavorites(property)}
                      >
                        💖 Ajouter aux favoris
                      </Button>
                    </Box>
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
