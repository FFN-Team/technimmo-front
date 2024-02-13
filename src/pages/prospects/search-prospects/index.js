import React, { useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Menu ,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'title', headerName: 'Title', width: 60 },
  { field: 'firstName', headerName: 'First name', width: 120, /*editable: true,*/ },
  { field: 'lastName', headerName: 'Last name', width: 120},
  { field: 'dateOfBirth', headerName: 'Date of birth', width: 100 },
  { field: 'profession', headerName: 'Profession', width: 120 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'mobile', headerName: 'Mobile', width: 100 },
  { field: 'contactOrigin', headerName: 'Contact Origin', width: 100 },
];

const SearchProspects = () => {
  const [prospectFilterName, setProspectFilterName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [prospects, setProspects] = useState([]);
  const [contactOrigin, setContactOrigin] = useState('');
  const [title, setTitle] = useState('');
  const [age, setAge] = useState('');
  const [ageComparator, setAgeComparator] = useState('');
  const [profession, setProfession] = useState('');
  const [filtersList, setFiltersList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [currentFilterName, setCurrentFilterName] = useState(''); 
  

  const handleFindClick = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formDataObject = {};

    formData.forEach((value, key) => {
      if (value !== '') formDataObject[key] = value;
    });

    try {
      const url = `http://localhost:9001/api/v1/prospects/filtred`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setProspects(result);
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  const handleSaveFilter = () => {
    setShowModal(true);
  };

  const handleModalSave = async () => {
    setShowModal(false);
    if (prospectFilterName === '') {
      window.alert("Vous n'avez pas choisi de nom de filtre.");
      return;
    }

    const savedFilter = {
      prospectFilterName,
      contactOrigin,
      title,
      age,
      ageComparator,
      profession,
    };

    console.log('Saved Filter:', savedFilter);

    const formDataObject = {};

    Object.entries(savedFilter).forEach(([key, value]) => {
      if (value !== '') formDataObject[key] = value;
    });

    console.log('formDataObject : ', formDataObject);

    const filterKeys = Object.keys(formDataObject);
    if (filterKeys.length === 1 && filterKeys[0] === 'prospectFilterName') {
      window.alert("Vous n'avez pas choisi de caractéristique de filtre.");
    } else {
      try {
        const url = `http://localhost:9001/api/v1/prospects/filter`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataObject),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        window.alert("L'opération s'est terminée avec succès.");
        window.location.reload();
      } catch (error) {
        console.error('Error during API call:', error);
        window.alert("Quelque chose s'est mal passé.");
      }
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleClearFilter = () => {
    setContactOrigin('');
    setTitle('');
    setAgeComparator('');
    setAge('');
    setProfession('');
};

  const fetchFiltersList = async () => {
    try {
      const url = 'http://localhost:9001/api/v1/prospects/filters';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setFiltersList(result);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  useEffect(() => {
    fetchFiltersList();
  }, []);

  const handleFilterClick = async (prospectFilterName) => {
    console.log(`Filter ${prospectFilterName} clicked`);

    try {
      const url = 'http://localhost:9001/api/v1/prospects/existing-filter';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prospectFilterName: prospectFilterName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setProspects(result);
    } catch (error) {
      console.error('Error filtering prospects with existing filter:', error);
    }
  };

  const handleFilterMenuClick = (event,prospectFilterName) => {
    setAnchorEl(event.currentTarget);
    setCurrentFilterName(prospectFilterName);
  };

  const handleDeleteFilterClick = async (currentFilterName) => {
    try {
      const url = 'http://localhost:9001/api/v1/prospects/filter';
  
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prospectFilterName: currentFilterName,
        }),
      });
  
      if (response.ok) {
        console.log('Suppression réussie !');
        window.alert("La suppresion s'est terminée avec succès.");
        window.location.reload();
      } else {
        console.error('Échec de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    } finally {
      setAnchorEl(null);

    }
  };
  


  return (
    <Container style={{ marginTop: '20px' }}>
      <form onSubmit={handleFindClick}>

        <FormControl style={{ marginRight: '10px' }}>
            <InputLabel htmlFor="contactOrigin" style={{ fontSize: '12px', marginTop: '-5px'}}>Contact Origin</InputLabel>
            <Select
                name="contactOrigin"
                value={contactOrigin}
                onChange={(e) => setContactOrigin(e.target.value)}
                style={{ minWidth: '150px', height: '30px' }}
            >
                <MenuItem value="">...</MenuItem>
                <MenuItem value="EMAIL">Email</MenuItem>
                <MenuItem value="PHONE">Phone</MenuItem>
                <MenuItem value="SOCIAL_MEDIA">Social media</MenuItem>
                <MenuItem value="WEB_SITE">Web site</MenuItem>
                <MenuItem value="WORD_OF_MOUTH">Word of mouth</MenuItem>
            </Select>
        </FormControl>

        <FormControl style={{ marginRight: '10px' }}>
            <InputLabel htmlFor="title" style={{ fontSize: '12px', marginTop: '-5px'}}>Title</InputLabel>
            <Select
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ minWidth: '150px', height: '30px' }}
            >
                <MenuItem value="">...</MenuItem>
                <MenuItem value="MR">Mr</MenuItem>
                <MenuItem value="MRS">Mrs</MenuItem>
            </Select>
        </FormControl>

        <FormControl>
            <InputLabel htmlFor="ageComparator" style={{ fontSize: '12px', marginTop: '-5px'}}>Age Comparator</InputLabel>
            <Select
                name="ageComparator"
                value={ageComparator}
                onChange={(e) => setAgeComparator(e.target.value)}
                style={{ minWidth: '150px', height: '30px' }}
            >
                <MenuItem value="">...</MenuItem>
                <MenuItem value="EQUALS">Equals</MenuItem>
                <MenuItem value="NOT_EQUAL_TO">Not equal to</MenuItem>
                <MenuItem value="GREATER_THAN">Greater than</MenuItem>
                <MenuItem value="LESS_THAN">Less than</MenuItem>
                <MenuItem value="GREATER_THAN_OR_EQUAL_TO">Greater than or equal to</MenuItem>
                <MenuItem value="LESS_THAN_OR_EQUAL_TO">Less than or equal to</MenuItem>
            </Select>
        </FormControl>
        
        <TextField
            type="number"
            label="Age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ width: '100px',marginRight: '10px'}}
            inputProps={{style: {height: 8}}}
            InputLabelProps={{style: {fontSize: 12,marginTop: -5}}}
            
        />      
       
        <FormControl>
            <InputLabel htmlFor="profession" style={{ fontSize: '12px', marginTop: '-5px'}}>Profession</InputLabel>
            <Select
                name="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                style={{ minWidth: '150px', height: '30px' }}
            >
                <MenuItem value="">...</MenuItem>
                <MenuItem value="DOCTOR">Doctor</MenuItem>
                <MenuItem value="ENGINEER">Engineer</MenuItem>
                <MenuItem value="TEACHER">Teacher</MenuItem>
                <MenuItem value="STUDENT">Student</MenuItem>
                <MenuItem value="COMMERCIAL">Commercial</MenuItem>
            </Select>
        </FormControl>


        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', marginBottom:'30px' }}>
          <Button type="submit" variant="contained" style={{ height: '25px' }} >
            Find
          </Button>

          <Button  onClick={handleClearFilter} variant="outlined" style={{ height: '25px' }} color="error">
            Clear Filter
          </Button>

          <Button onClick={handleSaveFilter} variant="outlined" style={{height: '25px' }} color="success">
            Save Filter
          </Button>
        </div>

      </form>


      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {filtersList.map((filter) => (
          <ButtonGroup key={filter.id} variant="outlined" style={{ height: '25px' }}>
            <Button 
              onClick={() => handleFilterClick(filter.prospectFilterName)}
              style={{ textTransform: 'none' }}
            >
              {filter.prospectFilterName}
            </Button>
            <Button style={{ width: '10px' }} onClick={(event) => handleFilterMenuClick(event, filter.prospectFilterName)}>
              <ExpandMoreIcon/>
            </Button>          
          </ButtonGroup>
        ))}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem 
            onClick={() => navigate(`/search-prospects/${currentFilterName}`)}
          >
            Ouvrir dossier
            </MenuItem>
          <MenuItem 
            onClick={() => handleDeleteFilterClick(currentFilterName)}
          >Supprimer le filtre</MenuItem>
        </Menu>
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            background: '#fff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <InputLabel htmlFor="filterName">Donne un nom à ce filtre : </InputLabel>
          <TextField
            type="text"
            id="filterName"
            value={prospectFilterName}
            onChange={(e) => setProspectFilterName(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" onClick={handleModalSave} style={{ marginRight: '10px' }}>
            Enregistrer
          </Button>
          <Button variant="outlined" onClick={handleModalCancel}>
            Annuler
          </Button>
        </div>
      )}

      <div>
        <h2>Résultats de la recherche :</h2>

        
        <Box sx={{ height: 320, width: '100%' }}>
          <DataGrid
            rows={prospects}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box> 
      </div>
    </Container>
  );
};

export default SearchProspects;