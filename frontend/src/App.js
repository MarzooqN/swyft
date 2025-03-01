// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DashboardPage from './pages/DashboardPage';
import ManageReadersPage from './pages/ManageReadersPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/manage-readers" element={<ManageReadersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
