import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export const createShortUrl = (longUrl: string) => {
  return apiClient.post('/shorturls', { url: longUrl });
};

export const getAllUrlStats = () => {
  return apiClient.get('/shorturls');
};
