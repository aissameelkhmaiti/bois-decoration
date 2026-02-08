import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// ================= LOGIN =================
export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

// ================= FETCH USER CONNECTÉ =================
export const fetchUser = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  return response.data.user;
};
