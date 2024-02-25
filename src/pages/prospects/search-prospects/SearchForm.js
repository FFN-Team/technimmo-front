import React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const SearchForm = ({
  contactOrigin,
  setContactOrigin,
  title,
  setTitle,
  ageComparator,
  setAgeComparator,
  age,
  setAge,
  profession,
  setProfession,
  handleFindClick,
  handleClearFilter,
  handleSaveFilter,
}) => {
  return (
    <form onSubmit={handleFindClick}>

        <FormControl style={{ marginRight: '10px' }}>
            <InputLabel htmlFor="contactOrigin" style={{ fontSize: '12px', marginTop: '-5px'}}>Origine du contact</InputLabel>
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
            <InputLabel htmlFor="title" style={{ fontSize: '12px', marginTop: '-5px'}}>Civilité</InputLabel>
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
            <InputLabel htmlFor="ageComparator" style={{ fontSize: '12px', marginTop: '-5px'}}>Comparateur</InputLabel>
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
            Rechercher
          </Button>

          <Button  onClick={handleClearFilter} variant="outlined" style={{ height: '25px' }} color="error">
            Effacer le filtre
          </Button>

          <Button onClick={handleSaveFilter} variant="outlined" style={{height: '25px' }} color="success">
            Sauvegarder le filtre
          </Button>
        </div>

      </form>
  );
};

export default SearchForm;
