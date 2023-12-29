import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  useMediaQuery
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
      const response = await fetch(`http://localhost:9001/api/v1/notifications/${id}/state`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          state: 'OPEN'
        })
      });

      updateNotifications();
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

  const handleClickProspect = async (id) => {
    try {
      const response = await fetch(`http://localhost:9001/api/v1/notifications/${id}/state`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          state: 'OPEN'
        })
      });

      updateNotifications();
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


                  {notificationsPotentialProject
                     .map((notification,index) => (

                      <ListItemButton key={index} onClick={() => handleClickPotentialProject(notification.id)}>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                           {notification.message}
                          </Typography>
                        }
                        secondary={notification.state}
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          3:00 AM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    ))}

                    {notificationsProspect
                     .map((notification,index) => (

                      <ListItemButton key={index} onClick={() => handleClickProspect(notification.id)}>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                           {notification.message}
                          </Typography>
                        }
                        secondary={notification.state}
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          3:00 AM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    ))}


                   
                    

                    

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
