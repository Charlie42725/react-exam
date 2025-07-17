import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import '../styles/components/CourseLinks.css';

const API_URL = 'http://localhost:5000/api';

const CourseLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`${API_URL}/contents?category=rd-course-links`);
        setLinks(response.data);
        setError(null);
      } catch (err) {
        setError('獲取課程連結失敗：' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      {links.map((link, index) => (
        <Card key={link._id || index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {link.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {link.prompt}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href={link.steps[0]}
              target="_blank"
              rel="noopener noreferrer"
            >
              前往連結
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CourseLinks; 