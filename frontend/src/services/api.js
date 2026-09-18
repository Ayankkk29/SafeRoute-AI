import axios from 'axios';

const API_BASE = '/api';

export const fetchHealth = async () => {
  const res = await axios.get(`${API_BASE}/health`);
  return res.data;
};

export const predictSeverity = async (inputData) => {
  const res = await axios.post(`${API_BASE}/predict`, inputData);
  return res.data;
};

export const fetchAnalytics = async (filters = {}) => {
  const res = await axios.get(`${API_BASE}/analytics`, { params: filters });
  return res.data;
};

export const fetchAccidents = async (filters = {}) => {
  const res = await axios.get(`${API_BASE}/accidents`, { params: filters });
  return res.data;
};

export const fetchModelPerformance = async () => {
  const res = await axios.get(`${API_BASE}/model-performance`);
  return res.data;
};
