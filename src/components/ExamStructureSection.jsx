import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import '../styles/components/PracticeSection.css';

const API_URL = 'http://localhost:5000/api';

const ExamStructureSection = () => {
  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 獲取分類名稱
        const categoryResponse = await axios.get(`${API_URL}/categories`);
        const category = categoryResponse.data.find(cat => cat.label === '會考架構分析');
        setCategoryName(category ? category.label : '會考架構分析');

        // 獲取內容
        const response = await axios.get(`${API_URL}/contents?category=rd-exam-structure`);
        setStructures(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('獲取數據失敗');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRetry = () => {
    setLoading(true);
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
        {structures.map((structure, index) => (
          <div key={structure._id || index} className="practice-card">
            <h3 className="practice-title">{structure.title}</h3>
            <div className="prompt-box">
              <pre className="prompt-text">{structure.prompt}</pre>
                <button 
                  className="copy-button"
                onClick={() => handleCopy(structure.prompt)}
                >
                複製提示詞
                </button>
              <div className="steps-box">
                <h4>操作步驟：</h4>
                <ol>
                  {structure.steps.map((step, stepIndex) => (
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

export default ExamStructureSection; 