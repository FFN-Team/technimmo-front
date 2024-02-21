import { useRef, useEffect, useState } from 'react';

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
import { BellOutlined, CloseOutlined } from '@ant-design/icons';

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

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notificationsPotentialProject, setNotificationsPotentialProject] = useState([]);
  const [notificationsProspect, setNotificationsProspect] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const updateNotifications = async () => {
      try {
        const url_potential_project = `http://localhost:9001/api/v1/potential-projects/notification`;
        const url_prospect = `http://localhost:9001/api/v1/prospects/notification`;

        const response_potential_project = await fetch(url_potential_project, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const response_prospect = await fetch(url_prospect, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data_potential_project = await response_potential_project.json();
        const data_prospect = await response_prospect.json();

        setNotificationsPotentialProject(data_potential_project);
        setNotificationsProspect(data_prospect);
      } catch (error) {
        console.log(error.message);
      }
    };

  //A MOFIDIER AVEC LA MODIF DE FLORINE PAR RAPPORT AUX CONTROLLER DE NOTIFICATION QUI RENVOIE TOUTES TYPES DE NOTIFS
  useEffect(() => {
    updateNotifications();
  }, []); // Assurez-vous de mettre une dépendance vide pour useEffect si la fonction doit être appelée une seule fois.

  const handleToggle = async () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const getPotentialProjectProspect = async (potentialProjectId) => {
    try {
      const url_potentiel_projet_prospect = `http://localhost:9001/api/v1/potential-projects/${potentialProjectId}/prospect`;
      const response_potentiel_projet_prospect = await fetch(url_potentiel_projet_prospect, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data_prospect = await response_potentiel_projet_prospect.json();

      return data_prospect;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSendPotentialProjectEmail = async (notification) => {
    try {
      console.log(notification.potentialProject.id);
      const prospect = await getPotentialProjectProspect(notification.potentialProject.id);

      console.log(prospect);
  
      const confirmSend = window.confirm(`Voulez-vous envoyer un e-mail à ${prospect.completeName}?`);

      if (confirmSend) {
        sendEmailToProspect(prospect, 'PROJECT_DUE_DATE_APPROACHING');
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données du prospect :", error.message);
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
    borderRadius: BORDER_RADIUS
  };

  const NotificationItem = ({ notification, onSendEmail, onConsult, showActionButton = true }) => (
    <ListItemButton style={{ ...COMMON_STYLE, display: 'flex', flexDirection: 'column' }}>
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
              <Button onClick={() => onConsult(notification.id)} style={{ backgroundColor: '#2196F3', color: 'white' }}>
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

  const handleConsultProject = async (notificationId) => {
    try {
      const response = await fetch(`http://localhost:9001/api/v1/notifications/${notificationId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'OPEN'
        })
      });

      window.location.href = `http://localhost:3000/work-in-progress`;

      if (response.ok) {
        console.log('Données modifiées avec succès !');
      } else {
        console.error('Échec de la mise à jour des données. Status:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la requête PATCH :', error);
    }
  };

  const handleConsultProspect = async (notificationId) => {
    try {
      const response = await fetch(`http://localhost:9001/api/v1/notifications/${notificationId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'OPEN'
        })
      });

      window.location.href = `http://localhost:3000/work-in-progress`;

      if (response.ok) {
        console.log('Données modifiées avec succès !');
      } else {
        console.error('Échec de la mise à jour des données. Status:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la requête PATCH :', error);
    }
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
              <span style={{ margin: '0 4px' }}></span>

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
                          onSendEmail={() => handleSendPotentialProjectEmail(notification)}
                          onConsult={handleConsultProject}
                        />
                      ))}

                      {notificationsProspect.map((notification, index) => (
                        <NotificationItem
                          key={index}
                          notification={notification}
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
