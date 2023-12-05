import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import '../styles/style.css';
import axios from 'axios';

const Auth = () => {
  const cardStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
  };

  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/user/v1/login', {
        username: username,
        password: password,
      });

      // Handle successful login response here
    } catch (error) {
      // Handle error here
      console.error('Error logging in:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/user/v1/create', {
        username: username,
        password: password,
        mobilenumber:  mobileNumber
      });

      // Handle successful login response here
    } catch (error) {
      // Handle error here
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="centered-container">
      <Card className="auth-card" style={cardStyle}>
        <CardContent>
          {location.pathname === '/login' ? (
            <>
              <Typography variant="h4" gutterBottom style={{ marginBottom: '16px', textAlign: 'center' }}>
                Login
              </Typography>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                fullWidth
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '24px' }}
              />
              <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                Login
              </Button>
              <Typography variant="body2" component="p" style={{ marginTop: '16px', textAlign: 'center' }}>
                Don't have an account? <Link to="/register">Register here</Link>
              </Typography>
            </>
          ) : location.pathname === '/register' ? (
            <>
              <Typography variant="h4" gutterBottom style={{ marginBottom: '16px', textAlign: 'center' }}>
                Register
              </Typography>
              <TextField
            id="outlined-basic"
            label="Mobile Number"
            variant="outlined"
            fullWidth
            required
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            style={{ marginBottom: '24px' }}
          />
              <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '24px' }}
          />
          <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
            Register
          </Button>
          <Typography variant="body2" component="p" style={{ marginTop: '16px', textAlign: 'center' }}>
           Want to Sign in ? <Link to="/login">Click here</Link>
          </Typography>
            </>
          ) : (
            <Typography variant="h4" gutterBottom style={{ marginBottom: '16px', textAlign: 'center' }}>
              Page not found
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
