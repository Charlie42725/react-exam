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
      // 暫時使用示例數據，避免空白顯示
      const samplePredictions = [
        {
          _id: '1',
          title: '數學會考預測題型分析',
          content: '根據近年會考趨勢，預測今年重點題型包括：代數運算、幾何證明、統計圖表分析等。',
          steps: [
            '分析近三年會考題型分布',
            '統計各主題出現頻率',
            '預測今年重點方向',
            '提供針對性練習建議'
          ]
        },
        {
          _id: '2',
          title: '個人數學能力分析報告',
          content: '基於學習歷程和練習成果，為您生成專屬的數學能力分析報告。',
          steps: [
            '收集個人學習數據',
            '分析強弱項目',
            '比對同儕表現',
            '提供改進建議'
          ]
        }
      ];
      
      // 獲取分類名稱 - 使用示例數據
      setCategoryName('會考預測');
      
      // 設置示例數據
      setPredictions(samplePredictions);
      setError(null);
    } catch (err) {
      console.error('Error fetching predictions:', err);
      setError('獲取預測內容失敗：' + err.message);
      setPredictions([]); // 確保在錯誤時 predictions 仍然是陣列
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
                  {Array.isArray(prediction.steps) && prediction.steps.map((step, stepIndex) => (
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