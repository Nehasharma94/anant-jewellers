import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom'; // Import 'Switch' from the correct location
import Login from './components/Auth';
import { CssBaseline, Container, ListItem } from '@mui/material';
import '../src/styles/style.css';
import Auth from './components/Auth';
import SignInSide from './components/SignInSide';
import Dashboard from './components/Dashboard';
import listitems from './components/listitems';
import StockPage from './components/StockEntry';
import StockEntry from './components/StockEntry';
// import Register from './components/Register';

const App = () => {
  return (
     <Router>
    <Routes>
      {/* Render your home page component */}
      <Route path="/login" element={<Dashboard/>} />
      <Route path="/register" element={<Auth />} />
      <Route path="/stock" component={<StockEntry/>} />
      {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
    
  </Router>
  );
};

export default App;
