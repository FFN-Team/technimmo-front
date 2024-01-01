import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
  Button
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined, SettingOutlined,ReloadOutlined } from '@ant-design/icons';

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';
  const navigate = useNavigate();

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notificationsPotentialProject , setNotificationsPotentialProject] = useState([]);
  const [notificationsProspect , setNotificationsProspect] = useState([]);
  const [prospect , setPotentialProjectProspect] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //A MOFIDIER AVEC LA MODIF DE FLORINE PAR RAPPORT AUX CONTROLLER DE NOTIFICATION QUI RENVOIE TOUTES TYPES DE NOTIFS
  const updateNotifications = async () => {
    try {
      const url_potentiel_projet = `http://localhost:9001/api/v1/potential-projects/notification`;
      const url_propect = `http://localhost:9001/api/v1/prospects/notification`;


      const response_potentiel_projet = await fetch(url_potentiel_projet, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },});

      const response_propect = await fetch(url_propect, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },});



      console.log("testttttttt response_potentiel_projet");
      console.log(response_potentiel_projet);

      console.log("testttttttt response_propect");
      console.log(response_propect);  


      const data_potentiel_projet = await response_potentiel_projet.json();
      const data_propect = await response_propect.json();
      

      setNotificationsPotentialProject(data_potentiel_projet);
      setNotificationsProspect(data_propect);
      
      console.log("testttttttt notif");
      console.log(notificationsPotentialProject);
      console.log(notificationsProspect);

    } catch (error) {
      console.log(error.message);
    } 
  };
  
  const handleToggle = async () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleClickPotentialProject = async (id) => {
    try {
      const url = `http://localhost:9001/api/v1/notifications/8/status`;
      console.log(id);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'OPEN'
        })
      });

      console.log(response)

      //window.location.href = `http://localhost:3000/work-in-progress`;

      if (response.ok) {
        console.log('Données modifiées avec succès !');
      } else {
        console.error('Échec de la mise à jour des données. Status:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la requête PATCH :', error);
    }
  };

  const handleClickProspect = async (id) => {
    try {
      const response = await fetch(`http://localhost:9001/api/v1/notifications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'OPEN'
        })
      });

//      updateNotifications();
//      window.location.href = `http://localhost:3000/work-in-progress`;


      if (response.ok) {
        console.log('Données modifiées avec succès !');
      } else {
        console.error('Échec de la mise à jour des données. Status:', response.status);
      }

    } catch (error) {
      console.error('Erreur lors de la requête PATCH :', error);
    }

  };

  const getPotentialProjectProspect = async (potentialProjectId) => {
    try {
      const url_potentiel_projet_prospect = `http://localhost:9001/api/v1/potential-projects/${potentialProjectId}/prospect`;

      console.log("testttttttt url_potentiel_projet");
      console.log(url_potentiel_projet_prospect);

      const response_potentiel_projet_prospect = await fetch(url_potentiel_projet_prospect, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
      },});

      console.log("testttttttt response_potentiel_projet");
      console.log(response_potentiel_projet_prospect);

      const data_prospect = await response_potentiel_projet_prospect.json();
      setPotentialProjectProspect(data_prospect);
    } catch (error) {
      console.log(error.message);
    } 
  };

  const handleSendPotentialProjectEmail = async (notification) => {

    await getPotentialProjectProspect(notification.potentialProject.id);
    
    const confirmSend = window.confirm(`Voulez-vous envoyer un e-mail à ${prospect.completeName}?`);
    
    if (confirmSend) {
      sendEmailToProspect(prospect, 'PROJECT_DUE_DATE_APPROACHING');
    }
  };

  const handleSendProspectEmail = async (prospect) => {
    
    const confirmSend = window.confirm(`Voulez-vous envoyer un e-mail à ${prospect.completeName}?`);
    
    if (confirmSend) {
      sendEmailToProspect(prospect, 'PROSPECT_MAY_BUY_BIGGER_HOUSE');
    }
  };
  
  const sendEmailToProspect = async (prospect, eventType) => {
    
    try { 
      console.log("tesstttttt prospect")
      console.log(prospect)
      const response = await fetch(`http://localhost:9001/api/v1/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prospectId: prospect.id,
          eventType: eventType
        })
      });

      if (response.ok) {
        console.log('Email envoyé avec succès !');
        setSnackbarOpen(true); 
      } else {
        console.error('Échec de envoi email. Status:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la requête POST :', error);
    }
  };
  
  const BORDER_RADIUS = '5px';
  const COMMON_STYLE = {
    border: '1px solid #ccc',
    margin: '5px',
    padding: '10px',
    borderRadius: BORDER_RADIUS,
  };

  const NotificationItem = ({ notification, onClick, onSendEmail, onConsult, showActionButton = true }) => (
    <ListItemButton onClick={() => onClick(notification.id)} style={{ ...COMMON_STYLE, display: 'flex', flexDirection: 'column' }}>
      <ListItemText
        primary={<Typography variant="h6" style={{ color: '#333' }}>{notification.message}</Typography>}
        secondary={notification.state}
      />
      <ListItemSecondaryAction style={{ width: 'auto', alignSelf: 'flex-end' }}>
        <Typography variant="caption" noWrap style={{ marginRight: '10px', color: '#888' }}>
          {notification.time || ''}
        </Typography>
        {showActionButton && (
          <>
            <Button onClick={() => onSendEmail(notification)} style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '5px' }}>
              Envoyer un email
            </Button>
            {onConsult && (
              <Button onClick={() => onConsult(notification)} style={{ backgroundColor: '#2196F3', color: 'white' }}>
                Consulter
              </Button>
            )}
          </>
        )}
      </ListItemSecondaryAction>
    </ListItemButton>
  );

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleConsultProject = () => {
  };

  const handleConsultProspect = () => {
    // Logique pour consulter le prospect
    console.log('Consulter le prospect');
  };


  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ReloadOutlined 
                onClick={updateNotifications}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ margin: '0 4px' }}></span>
              <SettingOutlined 
                onClick={() => navigate(`/notifications-settings`)}
                style={{ cursor: 'pointer' }}
              />

              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggle}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    <div>

      {notificationsPotentialProject.map((notification, index) => (
        <NotificationItem
          key={index}
          notification={notification}
          onClick={handleClickPotentialProject}
          onSendEmail={handleSendPotentialProjectEmail}
          onConsult={handleConsultProject}
        />
      
      ))}

      {notificationsProspect.map((notification, index) => (
        <NotificationItem
          key={index}
          notification={notification}
          onClick={handleClickProspect}
          onSendEmail={() => handleSendProspectEmail(notification.prospect)}
          onConsult={handleConsultProspect}
        />
      ))}

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Message envoyé avec succès !
        </MuiAlert>
      </Snackbar>

      </div>





                   
                    

                    

                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
