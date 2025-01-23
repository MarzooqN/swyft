// frontend/src/pages/TransactionsPage.js

import React, { useState, useEffect } from 'react';
import Filters from '../components/Transactions/Filters';
import TransactionsTable from '../components/Transactions/TransactionsTable';
import { fetchDonations, refundDonation } from '../services/api';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async (filters) => {
    console.log(filters);
    const data = await fetchDonations(filters);
    setTransactions(data);
  };

  const handleRefund = async (id) => {
    await refundDonation(id);
    loadTransactions(); // Reload transactions after refund
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div>
      <Filters onFilter={loadTransactions} />
      <TransactionsTable transactions={transactions} onRefund={handleRefund} />
    </div>
  );
};

export default TransactionsPage;
