import React from 'react';
import { CssBaseline, Grid, Paper } from '@mui/material';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div>
      <CssBaseline />
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            {/* Add your dashboard content here */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
