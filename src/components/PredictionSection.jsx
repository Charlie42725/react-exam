import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import '../styles/components/PracticeSection.css';

const API_URL = 'http://localhost:5000/api';

const PredictionSection = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [categoryName, setCategoryName] = useState('');

  const fetchPredictions = async () => {
    try {
      console.log('Fetching predictions...');
      // 獲取分類名稱
      const categoryResponse = await axios.get(`${API_URL}/categories`);
      const category = categoryResponse.data.find(cat => cat.label === '預測考題及個人分析報告');
      setCategoryName(category ? category.label : '會考預測');

      // 獲取內容
      const response = await axios.get(`${API_URL}/contents?category=rd-prediction`);
      console.log('Received predictions:', response.data);
      setPredictions(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching predictions:', err);
      setError('獲取預測內容失敗：' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
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
      <h2 className="section-title">{categoryName}</h2>
      <div className="practices-grid">
        {predictions.map((prediction, index) => (
          <div key={prediction._id || index} className="practice-card">
            <h3 className="practice-title">{prediction.title}</h3>
            <div className="prompt-box">
              <pre className="prompt-text">{prediction.prompt}</pre>
              <button 
                className="copy-button"
                onClick={() => handleCopy(prediction.prompt)}
              >
                複製提示詞
              </button>
              <div className="steps-box">
                <h4>操作步驟：</h4>
                <ol>
                  {prediction.steps.map((step, stepIndex) => (
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

export default PredictionSection; 