import { useState, useEffect, useCallback } from 'react';
import { contentAPI, categoryAPI } from '../services/api';

// 通用的 API Hook
export const useAPI = (apiFunction, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || '請求失敗');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, ...deps]);

  return {
    data,
    loading,
    error,
    fetchData,
    setData,
    setError
  };
};

// 內容相關 Hooks
export const useContents = (system = '') => {
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 獲取內容列表
  const fetchContents = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await contentAPI.getContents({ system, ...params });
      
      // 處理新的 API 響應格式
      let contentList = [];
      if (result && result.data && Array.isArray(result.data.contents)) {
        contentList = result.data.contents;
      } else if (result && Array.isArray(result.contents)) {
        contentList = result.contents;
      } else if (Array.isArray(result)) {
        contentList = result;
      } else {
        console.warn('意外的內容API響應格式:', result);
        contentList = [];
      }
      
      setContents(contentList);
      setFilteredContents(contentList);
      
      return contentList;
    } catch (err) {
      const errorMessage = err.message || '獲取內容失敗';
      setError(errorMessage);
      console.error('獲取內容失敗:', err);
      // 確保在錯誤情況下設置為空陣列
      setContents([]);
      setFilteredContents([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [system]);

  // 創建內容
  const createContent = useCallback(async (contentData) => {
    try {
      const result = await contentAPI.createContent(contentData);
      setContents(prev => [result, ...prev]);
      setFilteredContents(prev => [result, ...prev]);
      return result;
    } catch (err) {
      const errorMessage = err.message || '創建內容失敗';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // 更新內容
  const updateContent = useCallback(async (id, contentData) => {
    try {
      const result = await contentAPI.updateContent(id, contentData);
      setContents(prev => prev.map(item => item._id === id ? result : item));
      setFilteredContents(prev => prev.map(item => item._id === id ? result : item));
      return result;
    } catch (err) {
      const errorMessage = err.message || '更新內容失敗';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // 刪除內容
  const deleteContent = useCallback(async (id) => {
    try {
      await contentAPI.deleteContent(id);
      setContents(prev => prev.filter(item => item._id !== id));
      setFilteredContents(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      const errorMessage = err.message || '刪除內容失敗';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // 分類過濾
  useEffect(() => {
    if (selectedCategory) {
      setFilteredContents(contents.filter(content => content.category === selectedCategory));
    } else {
      setFilteredContents(contents);
    }
  }, [contents, selectedCategory]);

  return {
    contents,
    filteredContents,
    selectedCategory,
    setSelectedCategory,
    loading,
    error,
    fetchContents,
    createContent,
    updateContent,
    deleteContent,
    setError
  };
};

// 分類相關 Hooks
export const useCategories = (system = '') => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 獲取分類列表
  const fetchCategories = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await categoryAPI.getCategories({ system, ...params });
      
      // 處理後端響應格式: { success: true, data: [...] }
      let categoryList = [];
      if (result && result.success && Array.isArray(result.data)) {
        categoryList = result.data;
      } else if (result && Array.isArray(result.data)) {
        categoryList = result.data;
      } else if (Array.isArray(result)) {
        categoryList = result;
      } else {
        console.warn('意外的分類API響應格式:', result);
        categoryList = [];
      }
      
      setCategories(categoryList);
      return categoryList;
    } catch (err) {
      const errorMessage = err.message || '獲取分類失敗';
      setError(errorMessage);
      console.error('獲取分類失敗:', err);
      setCategories([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [system]);

  // 創建分類
  const createCategory = useCallback(async (categoryData) => {
    try {
      const result = await categoryAPI.createCategory(categoryData);
      setCategories(prev => [result, ...prev]);
      return result;
    } catch (err) {
      const errorMessage = err.message || '創建分類失敗';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // 更新分類
  const updateCategory = useCallback(async (id, categoryData) => {
    try {
      const result = await categoryAPI.updateCategory(id, categoryData);
      setCategories(prev => prev.map(item => item._id === id ? result : item));
      return result;
    } catch (err) {
      const errorMessage = err.message || '更新分類失敗';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // 刪除分類
  const deleteCategory = useCallback(async (id) => {
    try {
      await categoryAPI.deleteCategory(id);
      setCategories(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      const errorMessage = err.message || '刪除分類失敗';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    setError
  };
};

// 特定分類內容的 Hook
export const useCategoryContents = (category, system = '') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!category) {
      setData([]);
      return [];
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔍 正在獲取內容: category=${category}, system=${system}`);
      const result = await contentAPI.getContents({ category, system });
      console.log(`📦 API響應:`, result);
      
      // 處理後端響應格式: { success: true, data: { contents: [...], pagination: {...} } }
      let contentList = [];
      if (result && result.success && result.data && result.data.contents) {
        // 標準格式
        contentList = result.data.contents;
        console.log(`✅ 解析內容 (標準格式):`, contentList.length, '項');
      } else if (result && result.data && Array.isArray(result.data)) {
        // 模擬數據格式
        contentList = result.data;
        console.log(`✅ 解析內容 (模擬數據格式):`, contentList.length, '項');
      } else if (Array.isArray(result)) {
        // 直接陣列格式
        contentList = result;
        console.log(`✅ 解析內容 (直接陣列格式):`, contentList.length, '項');
      } else {
        // 其他情況，預設為空陣列
        console.warn('❓ 意外的API響應格式:', result);
        contentList = [];
      }
      
      // 確保返回的是陣列
      const finalData = Array.isArray(contentList) ? contentList : [];
      setData(finalData);
      console.log(`🎯 最終設定數據:`, finalData.length, '項');
      return finalData;
    } catch (err) {
      const errorMessage = err.message || '獲取內容失敗';
      setError(errorMessage);
      console.error('❌ 獲取分類內容失敗:', err);
      // 錯誤時設置為空陣列
      setData([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [category, system]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setError
  };
};
