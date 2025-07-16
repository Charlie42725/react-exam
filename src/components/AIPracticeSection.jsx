import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
      
      // 使用示例數據，避免空白顯示
      const samplePractices = [
        {
          _id: '1',
          title: 'AI實戰：自動數學解題系統',
          content: '建立一個能夠自動解決基礎數學問題的AI系統。',
          steps: [
            '收集和整理數學題目數據集',
            '訓練自然語言處理模型理解題目',
            '開發數學運算引擎',
            '整合系統並測試準確率'
          ]
        },
        {
          _id: '2',
          title: 'AI實戰：個性化學習推薦',
          content: '利用機器學習技術為學生推薦適合的數學學習內容。',
          steps: [
            '分析學生學習行為數據',
            '建立學習者能力模型',
            '設計推薦算法',
            '實現個性化內容推送'
          ]
        },
        {
          _id: '3',
          title: 'AI實戰：數學概念知識圖譜',
          content: '構建數學領域的知識圖譜，幫助理解概念間的關係。',
          steps: [
            '定義數學概念本體結構',
            '擷取概念間的關係',
            '建立知識圖譜數據庫',
            '開發查詢和可視化介面'
          ]
        }
      ];
      
      // 設置分類名稱
      setCategoryName('AI實戰');
      
      setPractices(samplePractices);
      setError(null);
    } catch (err) {
      console.error('Error fetching AI practices:', err);
      setError('獲取AI實戰內容失敗：' + err.message);
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
                  {Array.isArray(practice.steps) && practice.steps.map((step, index) => (
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