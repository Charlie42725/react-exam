import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useCategoryContents } from '../hooks/useAPI';
import { copyToClipboard } from '../utils/copyToClipboard';
import '../styles/components/PracticeSection.css';

const ExamStructureSection = ({ category = 'rd-exam-structure', system = 'rd' }) => {
  const [retryCount, setRetryCount] = useState(0);
  
  // 使用自定義Hook獲取會考架構分析內容
  const { 
    data: structures, 
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
        <Box className="loading-container" display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress size={40} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            正在載入會考架構分析內容...
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

  if (!structures || structures.length === 0) {
    return (
      <Box className="practice-section">
        <Alert severity="info">
          <Typography variant="h6">暫無內容</Typography>
          <Typography variant="body2">
            目前沒有可用的會考架構分析內容，請稍後再試或聯繫管理員添加內容。
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box className="practice-section">
      <Typography variant="h4" component="h2" className="section-title">
        會考架構分析
      </Typography>
      
      <Typography variant="body1" className="section-description" sx={{ mb: 3 }}>
        以下是會考架構分析內容，點擊複製按鈕將提示複製到剪貼簿。
      </Typography>

      <Box className="practices-grid">
        {structures.map((structure, index) => (
          <Card key={structure._id || index} className="practice-card" sx={{ mb: 2 }}>
            <CardContent>
              <Box className="card-header" display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                <Typography variant="h6" component="h3" className="practice-title">
                  {structure.title}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopyPrompt(structure.prompt)}
                  className="copy-button"
                  aria-label={`複製 ${structure.title} 到剪貼簿`}
                >
                  複製提示
                </Button>
              </Box>
              
              <Typography variant="body2" className="practice-prompt" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
                {structure.prompt}
              </Typography>
              
              {structure.steps && structure.steps.length > 0 && (
                <Box className="practice-steps" sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" className="steps-title" sx={{ mb: 1 }}>
                    操作步驟：
                  </Typography>
                  <Box component="ol" className="steps-list" sx={{ pl: 2 }}>
                    {structure.steps.map((step, stepIndex) => (
                      <Box component="li" key={stepIndex} className="step-item" sx={{ mb: 0.5 }}>
                        <Typography variant="body2">{step}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
              
              <Box className="card-footer">
                <Typography variant="caption" color="text.secondary">
                  更新時間: {structure.updatedAt ? new Date(structure.updatedAt).toLocaleDateString('zh-TW') : '未知'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      
      <Box className="section-footer" sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          共 {structures.length} 個分析項目
        </Typography>
      </Box>
    </Box>
  );
};

export default ExamStructureSection; 