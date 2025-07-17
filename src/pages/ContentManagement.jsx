import  { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tabs,
  Tab
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import { Science as ScienceIcon, Business as BusinessIcon } from '@mui/icons-material';

const API_URL = 'http://localhost:5000/api';

function ContentManagement() {
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSystem, setSelectedSystem] = useState('rd'); // 預設選擇研發系統
  const [open, setOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    prompt: '',
    steps: [],
    system: 'rd' // 預設為研發系統
  });
  const [newStep, setNewStep] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState({
    value: '',
    label: '',
    system: 'rd'
  });

  // 獲取分類列表
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/categories?system=${selectedSystem}`);
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('獲取分類列表失敗');
    }
  }, [selectedSystem]);

  // 獲取所有內容
  const fetchContents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/contents?system=${selectedSystem}`);
      setContents(response.data);
      setFilteredContents(response.data);
      setError(null);
    } catch (err) {
      setError('獲取內容失敗：' + err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedSystem]);

  useEffect(() => {
    fetchCategories();
    fetchContents();
  }, [fetchCategories, fetchContents, selectedSystem]);

  // 處理分類過濾
  useEffect(() => {
    if (selectedCategory) {
      setFilteredContents(contents.filter(content => content.category === selectedCategory));
    } else {
      setFilteredContents(contents);
    }
  }, [selectedCategory, contents]);

  const handleSystemChange = (event, newValue) => {
    setSelectedSystem(newValue);
    setSelectedCategory('');
    setFormData(prev => ({ ...prev, system: newValue }));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingContent(null);
    setFormData({
      category: '',
      title: '',
      prompt: '',
      steps: [],
      system: selectedSystem
    });
    setNewStep('');
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setFormData({
      category: content.category,
      title: content.title,
      prompt: content.prompt,
      steps: content.steps,
      system: content.system
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('確定要刪除這個內容嗎？')) {
      try {
        await axios.delete(`${API_URL}/contents/${id}`);
        fetchContents();
      } catch (err) {
        setError('刪除內容失敗：' + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 驗證必填欄位
      if (!formData.category || !formData.title || !formData.prompt) {
        setError('請填寫所有必填欄位');
        return;
      }

      const contentData = {
        ...formData,
        system: selectedSystem
      };

      if (editingContent) {
        await axios.put(`${API_URL}/contents/${editingContent._id}`, contentData);
      } else {
        await axios.post(`${API_URL}/contents`, contentData);
      }

      handleClose();
      fetchContents();
      setError(null);
    } catch (err) {
      console.error('Error saving content:', err);
      const errorMessage = err.response?.data?.message || err.message;
      setError(`保存內容失敗：${errorMessage}`);
    }
  };

  const handleAddStep = () => {
    if (newStep.trim()) {
      setFormData(prev => ({
        ...prev,
        steps: [...prev.steps, newStep.trim()]
      }));
      setNewStep('');
    }
  };

  const handleRemoveStep = (index) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  // 分類管理相關函數
  const handleOpenCategoryDialog = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryFormData({
        value: category.value,
        label: category.label,
        system: category.system
      });
    } else {
      setEditingCategory(null);
      setCategoryFormData({
        value: '',
        label: '',
        system: selectedSystem
      });
    }
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setEditingCategory(null);
    setCategoryFormData({
      value: '',
      label: '',
      system: selectedSystem
    });
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      const categoryData = {
        ...categoryFormData,
        value: categoryFormData.label.toLowerCase().replace(/\s+/g, '-'),
        system: selectedSystem
      };

      if (editingCategory) {
        await axios.put(`${API_URL}/categories/${editingCategory._id}`, categoryData);
      } else {
        await axios.post(`${API_URL}/categories`, categoryData);
      }

      handleCloseCategoryDialog();
      fetchCategories();
      setError(null);
    } catch (err) {
      console.error('Error saving category:', err);
      setError('保存分類失敗：' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('確定要刪除這個分類嗎？刪除分類可能會影響相關內容。')) {
      try {
        await axios.delete(`${API_URL}/categories/${id}`);
        fetchCategories();
      } catch (err) {
        console.error('Error deleting category:', err);
        setError('刪除分類失敗');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 'bold',
        color: 'primary.main',
        textAlign: 'center',
        mb: 4,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 60,
          height: 4,
          backgroundColor: 'primary.main',
          borderRadius: 2
        }
      }}>
        內容管理系統
      </Typography>

      <Paper 
        elevation={3}
        sx={{ 
          p: 3, 
          mb: 4,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Tabs
          value={selectedSystem}
          onChange={handleSystemChange}
          sx={{ 
            mb: 3,
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0'
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 500,
              minWidth: 120,
              transition: 'all 0.3s',
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600
              }
            }
          }}
        >
          <Tab 
            value="rd" 
            label="研發補助"
            icon={<ScienceIcon sx={{ mr: 1 }} />}
            iconPosition="start"
          />
          <Tab 
            value="corp" 
            label="企業內訓"
            icon={<BusinessIcon sx={{ mr: 1 }} />}
            iconPosition="start"
          />
        </Tabs>

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>選擇分類</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="選擇分類"
                sx={{ 
                  height: 56,
                  minWidth: 200,
                  '& .MuiSelect-select': {
                    fontSize: '1.1rem'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main'
                  }
                }}
              >
                <MenuItem value="">全部內容</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpen}
              sx={{ 
                mr: 2,
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.3s'
              }}
            >
              新增內容
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleOpenCategoryDialog()}
              sx={{ 
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: 2,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: 'rgba(33, 150, 243, 0.04)'
                }
              }}
            >
              管理分類
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(211, 47, 47, 0.1)'
          }}
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        <Box>
          <Grid container spacing={3}>
            {filteredContents.map((content) => (
              <Grid item xs={12} sm={6} md={4} key={content._id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    },
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <CardContent sx={{ 
                    p: 3, 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden'
                  }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box flex={1} sx={{ minWidth: 0, pr: 2 }}>
                        <Typography 
                          variant="h6" 
                          component="div" 
                          sx={{ 
                            fontWeight: 'bold',
                            mb: 1,
                            color: 'primary.main',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {content.title}
                        </Typography>
                        <Typography 
                          color="textSecondary" 
                          sx={{ 
                            fontSize: '0.9rem',
                            mb: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          分類：{categories.find(c => c.value === content.category)?.label || content.category}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton 
                          onClick={() => handleEdit(content)}
                          size="small"
                          sx={{ 
                            mr: 1,
                            color: 'primary.main',
                            '&:hover': {
                              backgroundColor: 'rgba(33, 150, 243, 0.1)'
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete(content._id)}
                          size="small"
                          sx={{ 
                            color: 'error.main',
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 0.1)'
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography 
                      variant="body2" 
                      color="textSecondary"
                      sx={{ 
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.6
                      }}
                    >
                      {content.prompt}
                    </Typography>

                    {content.steps && content.steps.length > 0 && (
                      <Box sx={{ mt: 'auto' }}>
                        <Typography 
                          variant="subtitle2" 
                          color="primary"
                          sx={{ 
                            mb: 1,
                            fontWeight: 600
                          }}
                        >
                          步驟：
                        </Typography>
                        <List dense sx={{ py: 0 }}>
                          {content.steps.map((step, index) => (
                            <ListItem 
                              key={index}
                              sx={{ 
                                py: 0.5,
                                '&:before': {
                                  content: `"${index + 1}."`,
                                  color: 'primary.main',
                                  mr: 1,
                                  fontWeight: 'bold'
                                }
                              }}
                            >
                              <ListItemText 
                                primary={step}
                                primaryTypographyProps={{
                                  variant: 'body2',
                                  sx: {
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    lineHeight: 1.6
                                  }
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
            minHeight: 600,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'primary.main',
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          {editingContent ? '編輯內容' : '新增內容'}
        </DialogTitle>
        <DialogContent>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              mt: 2,
              '& .MuiFormControl-root': {
                mb: 3
              }
            }}
          >
            <FormControl fullWidth>
              <InputLabel>分類</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                label="分類"
                required
                sx={{ 
                  height: 56,
                  '& .MuiSelect-select': {
                    fontSize: '1.1rem'
                  }
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="標題"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="提示"
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              multiline
              rows={4}
              sx={{ mb: 3 }}
            />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                步驟
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="新增步驟"
                  value={newStep}
                  onChange={(e) => setNewStep(e.target.value)}
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={handleAddStep}
                  disabled={!newStep.trim()}
                  sx={{ 
                    minWidth: 100,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)'
                    }
                  }}
                >
                  添加
                </Button>
              </Box>
              <List>
                {formData.steps.map((step, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        onClick={() => handleRemoveStep(index)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText 
                      primary={`${index + 1}. ${step}`}
                      primaryTypographyProps={{
                        sx: {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              mr: 1,
              px: 3,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            取消
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{ 
              px: 3,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)'
              }
            }}
          >
            {editingContent ? '保存' : '新增'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCategoryDialog}
        onClose={handleCloseCategoryDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'primary.main',
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          {editingCategory ? '編輯分類' : '管理分類'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <List>
              {categories.map((category) => (
                <ListItem
                  key={category._id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <ListItemText
                    primary={category.label}
                    primaryTypographyProps={{
                      fontSize: '1.1rem'
                    }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleOpenCategoryDialog(category)}
                      sx={{ 
                        mr: 1,
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'rgba(33, 150, 243, 0.1)'
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteCategory(category._id)}
                      sx={{ 
                        color: 'error.main',
                        '&:hover': {
                          backgroundColor: 'rgba(211, 47, 47, 0.1)'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            {editingCategory ? (
              <Box 
                component="form" 
                onSubmit={handleSubmitCategory} 
                sx={{ mt: 3 }}
              >
                <TextField
                  fullWidth
                  label="分類名稱"
                  value={categoryFormData.label}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, label: e.target.value })}
                  required
                  sx={{ mb: 3 }}
                />
              </Box>
            ) : (
              <Box 
                component="form" 
                onSubmit={handleSubmitCategory} 
                sx={{ mt: 3 }}
              >
                <TextField
                  fullWidth
                  label="新增分類名稱"
                  value={categoryFormData.label}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, label: e.target.value })}
                  required
                  sx={{ mb: 3 }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button 
            onClick={handleCloseCategoryDialog}
            sx={{ 
              mr: 1,
              px: 3,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            取消
          </Button>
          <Button 
            onClick={handleSubmitCategory} 
            variant="contained"
            sx={{ 
              px: 3,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)'
              }
            }}
          >
            {editingCategory ? '保存' : '新增'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ContentManagement; 