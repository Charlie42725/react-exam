import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import '../styles/components/CourseLinks.css';

const CourseLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        // 使用示例數據，避免空白顯示
        const sampleLinks = [
          {
            _id: '1',
            title: 'Khan Academy 數學課程',
            content: '免費的線上數學課程，涵蓋從基礎算術到高等數學的所有內容。',
            url: 'https://www.khanacademy.org/math'
          },
          {
            _id: '2',
            title: 'Coursera 數學與邏輯課程',
            content: '由世界知名大學提供的數學課程，包括微積分、線性代數、統計學等。',
            url: 'https://www.coursera.org/browse/math-and-logic'
          },
          {
            _id: '3',
            title: 'edX 數學課程',
            content: '高品質的線上數學課程，適合不同程度的學習者。',
            url: 'https://www.edx.org/learn/math'
          },
          {
            _id: '4',
            title: '臺灣數位學習平台',
            content: '配合本土教育體系的數學學習資源。',
            url: 'https://www.ewant.org/'
          }
        ];
        
        setLinks(sampleLinks);
        setError(null);
      } catch (err) {
        setError('獲取課程連結失敗：' + err.message);
        setLinks([]); // 確保在錯誤時 links 仍然是陣列
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
              {link.content}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href={link.url}
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