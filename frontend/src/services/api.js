// frontend/src/services/api.js

import axios from 'axios';
import config from '../config';

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
});

export const fetchTotalDonations = async (params) => {
  const response = await apiClient.get('/analytics/total_donations', { params });
  return response.data;
};

export const fetchDonations = async (params) => {
  const response = await apiClient.get('/donations/', { params });
  return response.data;
};

export const refundDonation = async (donationId) => {
  const response = await apiClient.post(`/donations/${donationId}/refund`);
  return response.data;
};

export const getDonors = async () => {
  const response = await apiClient.get('/donors/');
  return response.data;
};

export const fetchFinancialOverview = async () => {
  const response = await apiClient.get('/financials/overview');
  return response.data;
};

export const fetchTransactionsByLocation = async () => {
  const response = await apiClient.get('/analytics/transactions_by_location');
  return response.data;
};

export const fetchRevenueByLocation = async () => {
  const response = await apiClient.get('/analytics/revenue_by_location');
  return response.data;
};

export const getNfcReaders = async (id) => {
  const response = await apiClient.get(`/nfc_readers`);
  return response.data;
};

export const updateNfcReader = async (id, data) => {
  const response = await apiClient.put(`/nfc_readers/${id}`, data);
  return response.data;
};

export const deleteNfcReader = async (id) => {
  const response = await apiClient.delete(`/nfc_readers/${id}`);
  return response.data;
};


// Other API methods...
