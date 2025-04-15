import React, { useState, useEffect } from 'react';
import FilterButtons from './FilterButtons';
import SearchForm from './SearchForm';
import ModalComponent from './ModalComponent';
import CustomTable from 'pages/components/CustomTable';

// const columns = [
//   { field: 'title', headerName: 'Civilité', width: 60 },
//   { field: 'firstName', headerName: 'Prénom', width: 120, /*editable: true,*/ },
//   { field: 'lastName', headerName: 'Nom', width: 120},
//   { field: 'dateOfBirth', headerName: 'Date de naissance', width: 120 },
//   { field: 'profession', headerName: 'Profession', width: 120 },
//   { field: 'email', headerName: 'Email', width: 200 },
//   { field: 'mobile', headerName: 'Tél', width: 100 },
//   { field: 'contactOrigin', headerName: 'Origine du contact', width: 120 },
// ];

const ColumnProspects = [
  { id: 'civility', label: 'Civilité', minWidth: 80 },
  { id: 'firstname', label: 'Prénom', minWidth: 100 },
  { id: 'lastname', label: 'Nom', minWidth: 10 },
  { id: 'day_of_birth', label: 'Date de naissance', minWidth: 20 },
  { id: 'profession', label: 'Profession', minWidth: 100 },
  { id: 'mail', label: 'E-mail', minWidth: 100 },
  { id: 'mobile', label: 'Numéro de téléphone', minWidth: 100 },
  { id: 'contact_origin', label: 'Origine du contact', minWidth: 100 }
];

const values = (column, row) => {
  return (
     column.id === 'civility' ? row.title :
    column.id === 'firstname' ? row.firstName :
    column.id === 'lastname' ? row.lastName :
    column.id === 'day_of_birth' ? row.dateOfBirth :
    column.id === 'profession' ? row.profession :
    column.id === 'mail' ? row.email :
    column.id === 'mobile' ? row.mobile :
    column.id === 'contact_origin' ? row.contactOrigin : 
    row[column.id]
  );
}

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
    handleFindClick({ preventDefault: () => {} });
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
    <div>
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
      <CustomTable rows={prospects} columns={ColumnProspects} values={values} navigationDirection={"prospects"}/>
    </div>
  );
};

export default SearchProspects;