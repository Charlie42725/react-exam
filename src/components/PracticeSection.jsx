import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import '../styles/components/PracticeSection.css';

const API_URL = 'http://localhost:5000/api';

const PracticeSection = () => {
  const [practices, setPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchPractices = async () => {
    try {
      console.log('Fetching practices...');
      const response = await axios.get(`${API_URL}/contents?category=rd-ai-math&system=rd`);
      console.log('Received practices:', response.data);
      setPractices(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching practices:', err);
      setError('獲取練習內容失敗：' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPractices();
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setRetryCount(prev => prev + 1);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

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
        <Alert 
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              重試
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <div className="practice-section">
      <h2 className="section-title">AI怎麼應用在數學</h2>
      <div className="practices-grid">
        {practices.map((practice, index) => (
          <div key={practice._id || index} className="practice-card">
            <h3 className="practice-title">{practice.title}</h3>
            <div className="prompt-box">
              <pre className="prompt-text">{practice.prompt}</pre>
              <button 
                className="copy-button"
                onClick={() => handleCopy(practice.prompt)}
              >
                複製提示詞
              </button>
              <div className="steps-box">
                <h4>操作步驟：</h4>
                <ol>
                  {practice.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeSection; 