import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DetailPage from './pages/DetailPage';
import ManagementPage from './pages/ManagementPage';
import listMember from './shared/utilities/data';

localStorage.setItem('members', JSON.stringify(listMember));

const App = () => {
  const [members, setMembers] = useState<[]>(() => {
    try {
      const listMember = JSON.parse(localStorage.getItem('members') || '');
      return listMember;
    } catch {
      return [];
    }
  });

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<ManagementPage members={members} />} />
        <Route path='/detail' element={<DetailPage />} />
      </Routes>
    </Container>
  );
};

export default App;
