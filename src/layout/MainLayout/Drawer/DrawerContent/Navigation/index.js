import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import NavGroup from './NavGroup';
import menuItem from 'menu-items';

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return (
    <Box
      sx={{
        pt: 2,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row', // stack on mobile, row on desktop
        flexWrap: 'wrap', // allow wrapping if content is wide
        gap: 1, // spacing between groups
        alignItems: 'flex-start',
        justifyContent: isMobile ? 'flex-start' : 'space-between'
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;
