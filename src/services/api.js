import axios from 'axios';

// API 基礎配置
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// 創建 axios 實例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 請求攔截器
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API請求: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API請求錯誤:', error);
    return Promise.reject(error);
  }
);

// 響應攔截器
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API響應成功: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API響應錯誤:', error.response?.data || error.message);
    
    // 統一錯誤處理
    const errorMessage = error.response?.data?.message || error.message || '網路錯誤';
    const customError = new Error(errorMessage);
    customError.status = error.response?.status;
    customError.data = error.response?.data;
    
    return Promise.reject(customError);
  }
);

// 內容相關 API
export const contentAPI = {
  // 獲取所有內容
  getContents: async (params = {}) => {
    const response = await apiClient.get('/contents', { params });
    // 後端返回格式: { success: true, data: { contents: [...], pagination: {...} } }
    return response.data;
  },

  // 獲取單個內容
  getContent: async (id) => {
    const response = await apiClient.get(`/contents/${id}`);
    return response.data;
  },

  // 創建內容
  createContent: async (data) => {
    const response = await apiClient.post('/contents', data);
    return response.data;
  },

  // 更新內容
  updateContent: async (id, data) => {
    const response = await apiClient.put(`/contents/${id}`, data);
    return response.data;
  },

  // 刪除內容
  deleteContent: async (id) => {
    const response = await apiClient.delete(`/contents/${id}`);
    return response.data;
  },
};

// 分類相關 API
export const categoryAPI = {
  // 獲取所有分類
  getCategories: async (params = {}) => {
    const response = await apiClient.get('/categories', { params });
    return response.data;
  },

  // 獲取單個分類
  getCategory: async (id) => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },

  // 創建分類
  createCategory: async (data) => {
    const response = await apiClient.post('/categories', data);
    return response.data;
  },

  // 更新分類
  updateCategory: async (id, data) => {
    const response = await apiClient.put(`/categories/${id}`, data);
    return response.data;
  },

  // 刪除分類
  deleteCategory: async (id) => {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },
};

// 健康檢查 API
export const healthAPI = {
  checkHealth: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

// 導出默認的 API 客戶端
export default apiClient;
