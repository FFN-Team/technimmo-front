import React, { useState } from 'react';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import NavItem from './NavItem';

const NavCollapse = ({ menu, level }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const hasChildren = menu.children && menu.children.length > 0;

  const handleClick = () => {
    // Si une URL est définie, on navigue vers cette URL
    if (menu.url) {
      navigate(menu.url);
    }

    // On toggle le collapse uniquement si des enfants sont présents
    if (hasChildren) {
      setOpen(!open);
    }
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: level * 2 }}>
        {menu.icon && <ListItemIcon>{menu.icon}</ListItemIcon>}
        <ListItemText primary={menu.title} />
        {hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menu.children.map((child) => {
              if (child.type === 'collapse') {
                return <NavCollapse key={child.id} menu={child} level={level + 1} />;
              } else if (child.type === 'item') {
                return <NavItem key={child.id} item={child} level={level + 1} />;
              } else {
                return null;
              }
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default NavCollapse;
