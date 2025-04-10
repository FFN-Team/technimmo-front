import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// material-ui
import { Box, List, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';

const NavGroup = ({ item }) => {
  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return <NavCollapse key={menuItem.id} menu={menuItem} level={1} />;
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title && drawerOpen && (
          <Box
            sx={{
              pl: 3,
              mb: 1.5,
              minWidth: 'fit-content',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <Typography
              variant="subtitle2"
              color="textSecondary"
              noWrap={!isMobile} // wrap only on small screens
            >
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{
        mb: drawerOpen ? 1.5 : 0,
        py: 0,
        zIndex: 0,
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
      }}
    >
      {navCollapse}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
