import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import QuestionBlock from './components/QuestionBlock';
import CourseLinks from './components/CourseLinks';
import PracticeSection from './components/PracticeSection';
import AIPracticeSection from './components/AIPracticeSection';
import PredictionSection from './components/PredictionSection';
import ExamStructureSection from './components/ExamStructureSection';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { questionData } from './data/questions';
import { useCategories } from './hooks/useAPI';
import './styles/main.css';

// 主題配置
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Noto Sans TC", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const {
    categories,
    loading,
    error,
    fetchCategories
  } = useCategories('rd');

  useEffect(() => {
    // 如果沒有從API獲取到分類，使用模擬數據作為後備
    fetchCategories().catch(() => {
      console.warn('使用模擬分類數據');
    });
  }, [fetchCategories]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // 模擬分類數據作為後備
  const fallbackCategories = [
    { _id: '1', value: 'rd-course-links', label: '課程連結' },
    { _id: '2', value: 'rd-ai-math', label: 'AI 數學練習' },
    { _id: '3', value: 'rd-exam-structure', label: '考試結構' },
    { _id: '4', value: 'rd-prediction', label: '預測分析' }
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>載入中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>⚠️ {error}</p>
        <button onClick={() => window.location.reload()}>重新載入</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>研發補助</h1>
        <p className="subtitle">AI 驅動的研發輔助系統</p>
      </header>
      
      <div className="category-selector">
        <label htmlFor="category">選擇功能：</label>
        <select 
          id="category" 
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="">--請選擇--</option>
          {displayCategories.map((category) => (
            <option key={category._id} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <main className="content-area">
        {selectedCategory === '' ? (
          <div className="welcome-box fade-in">
            <div className="welcome-content">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" 
                alt="AI Icon" 
                className="welcome-icon"
              />
              <h2 className="welcome-title">歡迎使用「研發補助」</h2>
              <p className="welcome-description">
                本系統結合 <span className="highlight">AI 技術</span>，
                協助你進行研發補助相關的練習、分析與規劃。<br/>
                請從上方選單選擇你想使用的功能開始探索！
              </p>
              <Link to="/new-system" className="new-system-link">
                前往企業內訓專案
              </Link>
            </div>
          </div>
        ) : (() => {
          // 動態組件渲染邏輯 - 研發補助系統
          const renderComponent = () => {
            const selectedCategoryObj = displayCategories.find(cat => cat.value === selectedCategory);
            if (!selectedCategoryObj) {
              return <div className="no-content">請選擇一個有效的功能</div>;
            }

            // 根據分類值和標籤智能選擇組件
            const categoryValue = selectedCategoryObj.value;
            const categoryLabel = selectedCategoryObj.label.toLowerCase();

            // 傳遞正確的system和category參數
            const props = {
              category: categoryValue,
              system: 'rd'
            };

            if (categoryLabel.includes('課程') || categoryLabel.includes('連結') || categoryValue.includes('course-links')) {
              return <CourseLinks {...props} />;
            } else if (categoryLabel.includes('數學') || categoryValue.includes('ai-math')) {
              return <PracticeSection {...props} />;
            } else if (categoryLabel.includes('架構') || categoryLabel.includes('結構') || categoryValue.includes('exam-structure')) {
              return <ExamStructureSection {...props} />;
            } else if (categoryLabel.includes('預測') || categoryLabel.includes('分析') || categoryValue.includes('prediction')) {
              return <PredictionSection {...props} />;
            } else if (questionData[selectedCategory]) {
              // 如果是問題數據中的分類，渲染問題組件
              return questionData[selectedCategory].map((question, index) => (
                <QuestionBlock
                  key={index}
                  question={question.question}
                  steps={question.steps}
                  explanation={question.explanation}
                  index={index}
                />
              ));
            } else {
              // 預設使用練習組件
              return <PracticeSection {...props} />;
            }
          };

          return renderComponent();
        })()}
      </main>
    </div>
  );
}

function NewSystem() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const {
    categories,
    loading,
    error,
    fetchCategories
  } = useCategories('enterprise');

  useEffect(() => {
    // 如果沒有從API獲取到分類，使用模擬數據作為後備
    fetchCategories().catch(() => {
      console.warn('使用模擬分類數據');
    });
  }, [fetchCategories]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // 模擬分類數據作為後備
  const fallbackCategories = [
    { _id: '1', value: 'course-links', label: '課程連結' },
    { _id: '2', value: 'ai-english', label: 'AI 英語練習' },
    { _id: '3', value: 'exam-structure', label: '考試結構' },
    { _id: '4', value: 'ai-practice', label: 'AI 練習' },
    { _id: '5', value: 'prediction', label: '預測分析' }
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>載入中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>⚠️ {error}</p>
        <button onClick={() => window.location.reload()}>重新載入</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>OO企業內訓專案</h1>
        <p className="subtitle">企業AI技能提升平台</p>
      </header>
      
      <div className="category-selector">
        <label htmlFor="category">選擇功能：</label>
        <select 
          id="category" 
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="">--請選擇--</option>
          {displayCategories.map((category) => (
            <option key={category._id} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <main className="content-area">
        {selectedCategory === '' ? (
          <div className="welcome-box fade-in">
            <div className="welcome-content">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" 
                alt="AI Icon" 
                className="welcome-icon"
              />
              <h2 className="welcome-title">歡迎使用「OO企業內訓專案」</h2>
              <p className="welcome-description">
                本系統結合 <span className="highlight">AI 技術</span>，<br/>
                協助你進行企業內訓相關的練習、分析與規劃。<br/>
                請從上方選單選擇你想使用的功能開始探索！
              </p>
              <Link to="/" className="back-link">
                返回研發補助
              </Link>
            </div>
          </div>
        ) : (() => {
          // 動態組件渲染邏輯
          const renderComponent = () => {
            const selectedCategoryObj = displayCategories.find(cat => cat.value === selectedCategory);
            if (!selectedCategoryObj) {
              return <div className="no-content">請選擇一個有效的功能</div>;
            }

            // 根據分類值和標籤智能選擇組件
            const categoryValue = selectedCategoryObj.value;
            const categoryLabel = selectedCategoryObj.label.toLowerCase();

            // 傳遞正確的system和category參數
            const props = {
              category: categoryValue,
              system: 'enterprise'
            };

            if (categoryLabel.includes('課程') || categoryLabel.includes('連結') || categoryValue.includes('course-links')) {
              return <CourseLinks {...props} />;
            } else if (categoryLabel.includes('ai') && categoryLabel.includes('練習') || categoryValue.includes('ai-practice')) {
              return <AIPracticeSection {...props} />;
            } else if (categoryLabel.includes('架構') || categoryLabel.includes('結構') || categoryValue.includes('exam-structure')) {
              return <ExamStructureSection {...props} />;
            } else if (categoryLabel.includes('預測') || categoryLabel.includes('分析') || categoryValue.includes('prediction')) {
              return <PredictionSection {...props} />;
            } else if (categoryLabel.includes('英') || categoryValue.includes('english')) {
              return <PracticeSection {...props} />;
            } else {
              // 預設使用AI練習組件
              return <AIPracticeSection {...props} />;
            }
          };

          return renderComponent();
        })()}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-system" element={<NewSystem />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 