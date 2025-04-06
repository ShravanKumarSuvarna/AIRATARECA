import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import AnimatedBackground from '../components/AnimatedBackground';
import TopNavBar from '../components/TopNavBar';
import db from '../firebase';
import { ref, onValue, set } from 'firebase/database';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [data, setData] = useState([
    { name: 'Bette', value: 0 },
    { name: 'Gorabalu', value: 0 },
    { name: 'RashiEdi', value: 0 },
  ]);

  const [mode, setMode] = useState(false);

  // Sync from Firebase
  useEffect(() => {
    const arecaRef = ref(db, 'Areca');
    const switchRef = ref(db, 'Switch');

    const unsubscribeCounts = onValue(arecaRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setData([
          { name: 'Bette', value: val.Bette || 0 },
          { name: 'Gorabalu', value: val.Gorabalu || 0 },
          { name: 'RashiEdi', value: val.RashiEdi || 0 },
        ]);
      }
    });

    const unsubscribeSwitch = onValue(switchRef, (snapshot) => {
      const val = snapshot.val();
      setMode(!!val);
    });

    return () => {
      unsubscribeCounts();
      unsubscribeSwitch();
    };
  }, []);

  // Handle mode toggle
  const handleModeToggle = (event) => {
    const newValue = event.target.checked;
    set(ref(db, 'Switch'), newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflowX: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      <AnimatedBackground />
      <TopNavBar />

      <Box
        sx={{
          zIndex: 2,
          position: 'relative',
          px: 2,
          pt: { xs: 10, sm: 25 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 3,
            width: '100%',
            maxWidth: 1200,
            mb: 4,
          }}
        >
          {data.map((item, index) => (
            <Paper
              key={item.name}
              elevation={6}
              sx={{
                width: isMobile ? '90%' : 250,
                height: 160,
                p: 3,
                backdropFilter: 'blur(8px)',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
              }}
            >
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="h4">{item.value}</Typography>
            </Paper>
          ))}

          <Paper
            elevation={6}
            sx={{
              width: isMobile ? '90%' : 300,
              height: isMobile ? 260 : 250,
              p: 2,
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          >
            <Typography variant="h6" mb={2}>
              Sorted Breakdown
            </Typography>
            <Box sx={{ width: '100%', height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={isMobile ? 50 : 70}
                    dataKey="value"
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>

        {/* Switch */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
            gap: 1,
          }}
        >
          <Typography color="white">Mode</Typography>
          <Switch
            checked={mode}
            onChange={handleModeToggle}
            color="secondary"
          />
        </Box>

        <Box
          sx={{
            mt: 'auto',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 14,
            pb: 2,
          }}
        >
          © {new Date().getFullYear()} AIRAT SYSTEMS — Innovate and Evolve.
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
