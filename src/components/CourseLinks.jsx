import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useCategoryContents } from '../hooks/useAPI';
import '../styles/components/CourseLinks.css';

const CourseLinks = ({ category = 'rd-course-links', system = 'rd' }) => {
  const [retryCount, setRetryCount] = useState(0);
  
  // 使用自定義Hook獲取課程連結內容
  const { 
    data: links, 
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

  if (loading) {
    return (
      <Box className="course-links">
        <Box className="loading-container" display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress size={40} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            正在載入課程連結...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="course-links">
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

  if (!links || links.length === 0) {
    return (
      <Box className="course-links">
        <Alert severity="info">
          <Typography variant="h6">暫無課程連結</Typography>
          <Typography variant="body2">
            目前沒有可用的課程連結內容，請稍後再試或聯繫管理員添加內容。
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box className="course-links">
      <Typography variant="h4" component="h2" className="section-title" sx={{ mb: 3 }}>
        課程連結
      </Typography>
      
      <Box className="links-grid">
        {links.map((link, index) => (
          <Card key={link._id || index} className="link-card" sx={{ mb: 2 }}>
            <CardContent>
              <Box className="card-header" display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                <Typography variant="h6" component="h3" className="link-title">
                  {link.title}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<LinkIcon />}
                  component="a"
                  href={link.prompt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                  aria-label={`開啟 ${link.title} 連結`}
                >
                  開啟連結
                </Button>
              </Box>
              
              <Typography variant="body2" className="link-url" sx={{ mb: 2, wordBreak: 'break-all' }}>
                {link.prompt}
              </Typography>
              
              {link.steps && link.steps.length > 0 && (
                <Box className="link-steps" sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" className="steps-title" sx={{ mb: 1 }}>
                    使用步驟：
                  </Typography>
                  <Box component="ol" className="steps-list" sx={{ pl: 2 }}>
                    {link.steps.map((step, stepIndex) => (
                      <Box component="li" key={stepIndex} className="step-item" sx={{ mb: 0.5 }}>
                        <Typography variant="body2">{step}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
              
              <Box className="card-footer">
                <Typography variant="caption" color="text.secondary">
                  更新時間: {link.updatedAt ? new Date(link.updatedAt).toLocaleDateString('zh-TW') : '未知'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      
      <Box className="section-footer" sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          共 {links.length} 個課程連結
        </Typography>
      </Box>
    </Box>
  );
};

export default CourseLinks; 