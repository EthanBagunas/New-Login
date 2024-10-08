// CameraFeed.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const CameraFeed = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={4} sx={{ height: '100%', borderRadius: 4 }}>
        <Typography variant="h6" align="center" sx={{ marginTop: 3 }}>
          Live Camera Feed
        </Typography>
        {/* Add additional layout or components here as needed */}
      </Paper>
    </Box>
  );
};

export default CameraFeed;
