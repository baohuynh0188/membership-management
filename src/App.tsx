import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DetailPage from './pages/DetailPage';
import ManagementPage from './pages/ManagementPage';

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<ManagementPage />} />
        <Route path='/detail' element={<DetailPage />} />
      </Routes>
    </Container>
  );
};

export default App;
