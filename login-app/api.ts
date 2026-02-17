import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000'; // Android emulator localhost
// use 'http://localhost:3000' for iOS simulator or web

export const createParcel = async (parcelData: any) => {
  try {
    const response = await axios.post(`${API_URL}/parcels`, parcelData);
    return response.data;
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};
