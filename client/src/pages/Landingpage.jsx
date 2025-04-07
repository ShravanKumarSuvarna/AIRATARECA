import React from 'react';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AnimatedBackground from '../components/AnimatedBackground';
import { useLocation, useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

const LandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleGoogleLogin = () => {
    window.location.href = 'https://airatareca.onrender.com/auth/google';
  };

  return (
    <Box
      sx={{
        fontFamily: "'Orbitron', sans-serif",
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
      }}
    >
      <AnimatedBackground />

      <Box
        sx={{
          zIndex: 2,
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Left Side: Heading */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isSmallScreen ? 2 : 4,
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Typography
              variant={isSmallScreen ? 'h4' : 'h3'}
              color="white"
              fontWeight="bold"
            >
              Welcome to AIRAT SYSTEMS
            </Typography>
          </motion.div>
        </Box>

        {/* Right Side: Login Form */}
        <motion.div
          initial={{ x: isSmallScreen ? 0 : '100%' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isSmallScreen ? 16 : 32,
          }}
        >
          <Paper
            elevation={10}
            sx={{
              padding: 4,
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              color: 'white',
              minWidth: isSmallScreen ? '80%' : 350,
              width: isSmallScreen ? '90%' : 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Sign in to continue
            </Typography>
            <Button
              onClick={handleGoogleLogin}
              variant="contained"
              startIcon={<GoogleIcon />}
              sx={{
                backgroundColor: '#4285F4',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#357ae8',
                },
              }}
              fullWidth
            >
              Sign in with Google
            </Button>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};

export default LandingPage;
