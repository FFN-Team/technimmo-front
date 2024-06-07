import React, { useState } from 'react';
import { Box, IconButton, Badge, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

const Agenda = () => {
  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    visitType: '',
    nom: '',
    adresse: '',
    startDateTime: '',
    endDateTime: '',
    comments: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 


  const formatDateForJava = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString(); 
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(formData);

    try {
      const url = 'http://localhost:9001/api/v1/gagenda';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "prospect": String(formData.nom),
          "adresse": String(formData.adresse),
          "startDateTime": formatDateForJava(formData.startDateTime), 
          "endDateTime": formatDateForJava(formData.endDateTime),
          "visitType": String(formData.visitType),
          "comments": String(formData.comments)
        }),
      });


      if (response.ok) {
        setSnackbarSeverity('success');
        setSnackbarMessage('L\'événement a été enregistré avec succès');
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Erreur lors de l\'enregistrement de l\'événement');
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Erreur lors de la connexion à l\'API');
    }

    setSnackbarOpen(true);
    setOpen(false);
  };


  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };



  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        onClick={handleToggle}
      >
        <Badge color="primary">
          <EventIcon />
        </Badge>
      </IconButton>
      
      <Dialog open={open} onClose={handleToggle}>
        <DialogTitle>Formulaire de Visite</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Type de visite</InputLabel>
            <Select
              name="visitType"
              value={formData.visitType}
              onChange={handleChange}
              label="Type de visite"
            >
              <MenuItem value="première visite">Première visite</MenuItem>
              <MenuItem value="achat">Achat</MenuItem>
              <MenuItem value="confirmation">Confirmation</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            name="nom"
            label="Nom"
            type="text"
            fullWidth
            value={formData.nom}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="adresse"
            label="Adresse"
            type="text"
            fullWidth
            value={formData.adresse}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="startDateTime"
            label="Date et heure de début"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.startDateTime}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="endDateTime"
            label="Date et heure de fin"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.endDateTime}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="comments"
            label="Commentaires"
            type="text"
            fullWidth
            value={formData.comments}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Agenda;