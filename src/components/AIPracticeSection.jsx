import { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import '../styles/components/PracticeSection.css';

const API_URL = 'http://localhost:5000/api';

const AIPracticeSection = () => {
  const [practices, setPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [categoryName, setCategoryName] = useState('');

  const fetchPractices = async () => {
    try {
      console.log('Fetching AI practices...');
      // 直接使用分類ID獲取內容
      const response = await axios.get(`${API_URL}/contents?category=ai-practice`);
      console.log('Received AI practices:', response.data);
      setPractices(response.data);
      
      // 獲取分類名稱
      const categoryResponse = await axios.get(`${API_URL}/categories`);
      const category = categoryResponse.data.find(cat => cat._id === 'ai-practice');
      if (category) {
        setCategoryName(category.label);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching AI practices:', err);
      setError('獲取AI實戰內容失敗：' + err.message);
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
      <h2 className="section-title">{categoryName}</h2>
      <div className="practices-grid">
        {practices.map((practice, index) => (
          <div key={practice._id} className="practice-card">
            <h3>{practice.title}</h3>
            <div className="practice-content">
              <pre>{practice.prompt}</pre>
            </div>
            {practice.steps && practice.steps.length > 0 && (
              <div className="practice-steps">
                <h4>操作步驟：</h4>
                <ol>
                  {practice.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
            <button 
              className="copy-button"
              onClick={() => {
                navigator.clipboard.writeText(practice.prompt);
                alert('已複製到剪貼簿');
              }}
            >
              複製提示詞
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIPracticeSection; 