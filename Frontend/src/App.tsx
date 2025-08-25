import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { ShortenerForm } from './components/ShortenerForm';
import { StatisticsPage } from './components/StatisticsPage';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              URL Service
            </Typography>
            <Button color="inherit" component={Link} to="/">Shortener</Button>
            <Button color="inherit" component={Link} to="/stats">Statistics</Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<ShortenerForm />} />
            <Route path="/stats" element={<StatisticsPage />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
