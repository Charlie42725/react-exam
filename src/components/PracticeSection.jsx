import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useCategoryContents } from '../hooks/useAPI';
import { copyToClipboard } from '../utils/copyToClipboard';
import '../styles/components/PracticeSection.css';

const PracticeSection = ({ category = 'rd-ai-math', system = 'rd' }) => {
  const [retryCount, setRetryCount] = useState(0);
  
  // 使用自定義Hook獲取練習內容
  const { 
    data: practices, 
    loading, 
    error, 
    refetch,
    setError 
  } = useCategoryContents(category, system);

  // 重試功能
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
    refetch();
  };

  // 複製到剪貼簿功能
  const handleCopyPrompt = async (prompt) => {
    try {
      await copyToClipboard(prompt);
      alert('已複製到剪貼簿！');
    } catch (err) {
      console.error('複製失敗:', err);
      alert('複製失敗，請手動複製');
    }
  };

  if (loading) {
    return (
      <Box className="practice-section">
        <Box className="loading-container">
          <CircularProgress size={40} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            正在載入 AI 數學練習內容...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="practice-section">
        <Alert 
          severity="error" 
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={handleRetry}
              startIcon={<RefreshIcon />}
            >
              重試
            </Button>
          }
        >
          <Typography variant="h6">載入失敗</Typography>
          <Typography variant="body2">{error}</Typography>
          {retryCount > 0 && (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              已重試 {retryCount} 次
            </Typography>
          )}
        </Alert>
      </Box>
    );
  }

  if (!practices || practices.length === 0) {
    return (
      <Box className="practice-section">
        <Alert severity="info">
          <Typography variant="h6">暫無練習內容</Typography>
          <Typography variant="body2">
            目前沒有可用的AI數學練習內容，請稍後再試或聯繫管理員添加內容。
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box className="practice-section">
      <Typography variant="h4" component="h2" className="section-title">
        AI 數學練習
      </Typography>
      
      <Typography variant="body1" className="section-description">
        以下是 AI 驅動的數學練習內容，點擊複製按鈕將提示複製到剪貼簿。
      </Typography>

      <Box className="practices-grid">
        {practices.map((practice, index) => (
          <Card key={practice._id || index} className="practice-card">
            <CardContent>
              <Box className="card-header">
                <Typography variant="h6" component="h3" className="practice-title">
                  {practice.title}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopyPrompt(practice.prompt)}
                  className="copy-button"
                  aria-label={`複製 ${practice.title} 到剪貼簿`}
                >
                  複製提示
                </Button>
              </Box>
              
              <Typography variant="body2" className="practice-prompt">
                {practice.prompt}
              </Typography>
              
              {practice.steps && practice.steps.length > 0 && (
                <Box className="practice-steps">
                  <Typography variant="subtitle2" className="steps-title">
                    練習步驟：
                  </Typography>
                  <ol className="steps-list">
                    {practice.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="step-item">
                        <Typography variant="body2">{step}</Typography>
                      </li>
                    ))}
                  </ol>
                </Box>
              )}
              
              <Box className="card-footer">
                <Typography variant="caption" color="text.secondary">
                  更新時間: {new Date(practice.updatedAt).toLocaleDateString('zh-TW')}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      
      <Box className="section-footer">
        <Typography variant="body2" color="text.secondary" align="center">
          共 {practices.length} 個練習項目
        </Typography>
      </Box>
    </Box>
  );
};

export default PracticeSection; 