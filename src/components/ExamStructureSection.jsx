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
        // 設置分類名稱
        setCategoryName('會考架構分析');

        // 使用示例數據，避免空白顯示
        const sampleStructures = [
          {
            _id: '1',
            title: '會考數學科架構分析',
            content: '深入分析會考數學科的考試架構，包括題型分配、難度層次、評分標準等。',
            steps: [
              '了解會考數學科目標與能力指標',
              '分析題型分配：選擇題、非選擇題比例',
              '掌握各單元權重分布',
              '研究評分標準與答題技巧'
            ]
          },
          {
            _id: '2',
            title: '各主題知識架構圖',
            content: '建立完整的數學知識架構圖，幫助學生理解各主題間的關聯性。',
            steps: [
              '整理數與量、代數、幾何、統計各主題',
              '建立知識點間的連結關係',
              '標示重點與次要概念',
              '製作學習路徑建議'
            ]
          }
        ];

        setStructures(sampleStructures);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('獲取數據失敗');
        setStructures([]); // 確保在錯誤時 structures 仍然是陣列
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
                  {Array.isArray(structure.steps) && structure.steps.map((step, stepIndex) => (
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