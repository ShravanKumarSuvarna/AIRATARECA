import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import AnimatedBackground from '../components/AnimatedBackground';
import TopNavBar from '../components/TopNavBar';
import image1 from '../assets/slider1.jpg';
import image2 from '../assets/slider2.jpg';
import image3 from '../assets/slider3.jpeg';
import logo from '../assets/AiratWhite.svg';

const images = [image1, image2, image3];

const AboutPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <AnimatedBackground />
      <TopNavBar />

      <Box
        sx={{
          zIndex: 2,
          position: 'relative',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          [theme.breakpoints.down('sm')]: {
            p: 2,
            pt: 10,
          },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            backdropFilter: 'blur(8px)',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            p: 4,
            mb: 4,
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
              p: 2,
              mt: 6,
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '80%',
              height: 300,
              mb: 2,
              borderRadius: 4,
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
              },
              [theme.breakpoints.down('sm')]: {
                width: '100%',
                height: 200,
              },
            }}
          >
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <IconButton
              onClick={goToPrev}
              sx={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
              }}
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              onClick={goToNext}
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>

          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            About Our Mission
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            We at Frostify AI Robotics are dedicated to revolutionizing waste
            management with the power of AI and robotics. Our autonomous rover
            is designed to clean environments, detect pollution sources, and
            adapt to its surroundings, ensuring a smarter, cleaner world. With
            cutting-edge technology and sustainable innovation, we aim to reduce
            environmental impact and raise awareness about responsible waste
            handling.
          </Typography>
        </Paper>

        <Box
          sx={{
            mt: 'auto',
            px: 4,
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            background: 'transparent',
            textAlign: 'left',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 14,
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 2,
              px: 2,
            },
          }}
        >
          <Box>
            © {new Date().getFullYear()} AIRAT SYSTEMS — Innovate and Evolve.
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <a
              href="https://airatsystems.com/"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src={logo}
                alt="Frostify Logo"
                height="40"
                style={{ marginBottom: 4 }}
              />
            </a>
            <Typography
              variant="body2"
              sx={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}
            >
              <a
                href="https://airatsystems.com/"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Click logo to contact
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPage;
