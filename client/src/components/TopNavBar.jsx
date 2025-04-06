import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import logo from '../assets/AiratWhite.svg';

const TopNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'About', icon: <InfoIcon />, path: '/about' },
    {
      label: 'Logout',
      icon: <LogoutIcon />,
      action: () => console.log('Logout'),
      path: '/',
    },
  ];

  const handleNavClick = (item) => {
    setDrawerOpen(false);
    if (item.path) navigate(item.path);
    if (item.action) item.action();
  };

  return (
    <>
      <AppBar
        position="absolute"
        sx={{
          zIndex: 10,
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          animation: 'dropDown 0.5s ease-out',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" height="40" />
          </Box>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <List sx={{ width: 200 }}>
                  {navItems.map((item) => (
                    <ListItem
                      button
                      key={item.label}
                      onClick={() => handleNavClick(item)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  startIcon={item.icon}
                  onClick={() => handleNavClick(item)}
                  sx={{
                    color: 'white',
                    borderBottom: isActive(item.path)
                      ? '2px solid white'
                      : 'none',
                    borderRadius: 0,
                    fontWeight: isActive(item.path) ? 'bold' : 'normal',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      color: '#C0C0C0',
                      textShadow: '0 0 8px #C0C0C0',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopNavBar;
