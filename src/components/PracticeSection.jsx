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
      
      // 使用示例數據，避免空白顯示
      const samplePractices = [
        {
          _id: '1',
          title: 'AI數學解題助手使用指南',
          content: '學習如何使用AI工具來協助數學解題，提升學習效率。',
          steps: [
            '選擇適合的AI數學工具（如Wolfram Alpha、PhotoMath等）',
            '學習正確的問題輸入方式',
            '理解AI提供的解題步驟',
            '驗證答案並加深理解'
          ]
        },
        {
          _id: '2',
          title: 'AI在數學教學中的應用',
          content: '探索AI技術如何改變數學教學方式，提供個性化學習體驗。',
          steps: [
            '了解適應性學習系統的原理',
            '使用AI進行錯誤診斷與回饋',
            '利用AI生成個性化練習題',
            '透過數據分析優化學習路徑'
          ]
        },
        {
          _id: '3',
          title: '數學概念可視化工具',
          content: '運用AI驅動的可視化工具，幫助學生更好地理解抽象的數學概念。',
          steps: [
            '使用GeoGebra等動態幾何軟體',
            '利用3D建模理解立體幾何',
            '透過圖表工具分析函數特性',
            '製作互動式數學演示'
          ]
        }
      ];
      
      setPractices(samplePractices);
      setError(null);
    } catch (err) {
      console.error('Error fetching practices:', err);
      setError('獲取練習內容失敗：' + err.message);
      setPractices([]); // 確保在錯誤時 practices 仍然是陣列
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
                  {Array.isArray(practice.steps) && practice.steps.map((step, stepIndex) => (
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