import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material';
import { getAllUrlStats } from '../services/apiService';
import { log } from '../utils/logger';

interface UrlStat {
  shortcode: string;
  longUrl: string;
  createdAt: string;
  expiresAt: string;
  clicks: any[];
}

export const StatisticsPage: React.FC = () => {
  const [stats, setStats] = useState<UrlStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      log('frontend', 'info', 'StatisticsPage', 'Fetching all URL stats.');
      try {
        const response = await getAllUrlStats();
        setStats(response.data);
      } catch (err) {
        setError('Failed to fetch statistics.');
        log('frontend', 'error', 'api', 'Failed to fetch URL stats.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Statistics
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Expires At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((stat) => (
              <TableRow key={stat.shortcode}>
                <TableCell>
                  <Link href={`http://localhost:3001/${stat.shortcode}`} target="_blank" rel="noopener">
                    {stat.shortcode}
                  </Link>
                </TableCell>
                <TableCell sx={{ wordBreak: 'break-all' }}>{stat.longUrl}</TableCell>
                <TableCell>{stat.clicks.length}</TableCell>
                <TableCell>{new Date(stat.expiresAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
