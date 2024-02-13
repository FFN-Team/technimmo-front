import React, { useState, useEffect } from 'react';
import {  Container} from '@mui/material';
import FilterButtons from './FilterButtons';
import SearchResults from './SearchResults'; 
import SearchForm from './SearchForm';
import ModalComponent from './ModalComponent'; 


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
      <SearchForm
        contactOrigin={contactOrigin}
        setContactOrigin={setContactOrigin}
        title={title}
        setTitle={setTitle}
        ageComparator={ageComparator}
        setAgeComparator={setAgeComparator}
        age={age}
        setAge={setAge}
        profession={profession}
        setProfession={setProfession}
        handleFindClick={handleFindClick}
        handleClearFilter={handleClearFilter}
        handleSaveFilter={handleSaveFilter}
      />

      <FilterButtons
        filtersList={filtersList}
        handleFilterClick={handleFilterClick}
        handleFilterMenuClick={handleFilterMenuClick}
        handleDeleteFilterClick={handleDeleteFilterClick}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        currentFilterName={currentFilterName}
      />

      <ModalComponent
        showModal={showModal}
        prospectFilterName={prospectFilterName}
        setProspectFilterName={setProspectFilterName}
        handleModalSave={handleModalSave}
        handleModalCancel={handleModalCancel}
      />

      <SearchResults prospects={prospects} columns={columns} />
    </Container>
  );
};

export default SearchProspects;