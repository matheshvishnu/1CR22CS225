import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Alert, Link } from '@mui/material';
import { createShortUrl } from '../services/apiService';
import { log } from '../utils/logger';

export const ShortenerForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!url) {
      setError('Please enter a URL.');
      return;
    }
    setLoading(true);
    setResult(null);
    setError('');
    log('frontend', 'info', 'ShortenerForm', `Attempting to shorten URL: ${url}`);

    try {
      const response = await createShortUrl(url);
      setResult(response.data.shortLink);
      log('frontend', 'info', 'api', 'Successfully shortened URL.');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to shorten URL. Please try again.';
      setError(errorMessage);
      log('frontend', 'error', 'api', `API call failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // The main fix is here: adding the correct type for the 'e' parameter.
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        URL Shortener
      </Typography>
      <TextField
        label="Enter Long URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={handleUrlChange}
        disabled={loading}
      />
      <Button type="submit" variant="contained" size="large" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Shorten'}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      {result && (
        <Alert severity="success">
          Shortened URL: <Link href={result} target="_blank" rel="noopener">{result}</Link>
        </Alert>
      )}
    </Box>
  );
};
