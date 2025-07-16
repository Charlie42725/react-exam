import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import QuestionBlock from './components/QuestionBlock';
import AIPromptSection from './components/AIPromptSection';
import { TeamIntroSection, ToolsSection, MarketAnalysisSection, ServiceIntroSection, BusinessModelSection } from './components/AIPromptCategories';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { questionData } from './data/questions';
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
});

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  // 使用靜態分類資料，只包含 AI Prompt 相關分類
  const categories = [
    { _id: '6', value: 'team-intro', label: '團隊簡介' },
    { _id: '7', value: 'tools', label: '使用工具' },
    { _id: '8', value: 'market-analysis', label: '產業與市場分析' },
    { _id: '9', value: 'service-intro', label: '服務介紹' },
    { _id: '10', value: 'business-model', label: '商業模式' }
  ];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="app">
      <h1>研發補助</h1>
      
      <div className="category-selector">
        <label htmlFor="category">選擇功能：</label>
        <select 
          id="category" 
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">--請選擇--</option>
          {categories.map((category) => (
            <option key={category._id} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="content-area">
        {selectedCategory === '' ? (
          <div>
            <div className="welcome-box fade-in">
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'16px'}}>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="AI Icon" style={{width:'80px',height:'80px',marginBottom:'10px',filter:'drop-shadow(0 2px 8px #2196F355)'}}/>
                <h2 style={{color:'var(--primary-color)',fontWeight:'bold',fontSize:'2rem',marginBottom:'10px'}}>歡迎使用「研發補助」</h2>
                <p style={{fontSize:'1.2rem',color:'#555',maxWidth:'500px',textAlign:'center'}}>本系統結合 <span style={{color:'var(--primary-color)',fontWeight:'bold'}}>AI 技術</span>，協助你進行研發補助相關的練習、分析與規劃。<br/>請從上方選單選擇你想使用的功能開始探索！</p>
                <Link to="/new-system" className="new-system-link">
                  前往企業內訓專案
                </Link>
              </div>
            </div>
            <AIPromptSection />
          </div>
        ) : selectedCategory === 'team-intro' ? (
          <TeamIntroSection />
        ) : selectedCategory === 'tools' ? (
          <ToolsSection />
        ) : selectedCategory === 'market-analysis' ? (
          <MarketAnalysisSection />
        ) : selectedCategory === 'service-intro' ? (
          <ServiceIntroSection />
        ) : selectedCategory === 'business-model' ? (
          <BusinessModelSection />
        ) : (
          selectedCategory && questionData[selectedCategory]?.map((question, index) => (
            <QuestionBlock
              key={index}
              question={question.question}
              steps={question.steps}
              explanation={question.explanation}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
}

function NewSystem() {
  const [selectedCategory, setSelectedCategory] = useState('');
  // 使用靜態分類資料，只包含 AI Prompt 相關分類
  const categories = [
    { _id: '6', value: 'team-intro', label: '團隊簡介' },
    { _id: '7', value: 'tools', label: '使用工具' },
    { _id: '8', value: 'market-analysis', label: '產業與市場分析' },
    { _id: '9', value: 'service-intro', label: '服務介紹' },
    { _id: '10', value: 'business-model', label: '商業模式' }
  ];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="app">
      <h1>OO企業內訓專案</h1>
      
      <div className="category-selector">
        <label htmlFor="category">選擇功能：</label>
        <select 
          id="category" 
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">--請選擇--</option>
          {categories.map((category) => (
            <option key={category._id} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="content-area">
        {selectedCategory === '' ? (
          <div>
            <div className="welcome-box fade-in">
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'16px'}}>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="AI Icon" style={{width:'80px',height:'80px',marginBottom:'10px',filter:'drop-shadow(0 2px 8px #2196F355)'}}/>
                <h2 style={{color:'var(--primary-color)',fontWeight:'bold',fontSize:'2rem',marginBottom:'10px'}}>歡迎使用「OO企業內訓專案」</h2>
                <p style={{fontSize:'1.2rem',color:'#555',maxWidth:'500px',textAlign:'center'}}>本系統結合 <span style={{color:'var(--primary-color)',fontWeight:'bold'}}>AI 技術，<br/></span>協助你進行企業內訓相關的練習、分析與規劃。<br/>請從上方選單選擇你想使用的功能開始探索！</p>
                <Link to="/" className="back-link">
                  返回研發補助
                </Link>
              </div>
            </div>
            <AIPromptSection />
          </div>
        ) : selectedCategory === 'team-intro' ? (
          <TeamIntroSection />
        ) : selectedCategory === 'tools' ? (
          <ToolsSection />
        ) : selectedCategory === 'market-analysis' ? (
          <MarketAnalysisSection />
        ) : selectedCategory === 'service-intro' ? (
          <ServiceIntroSection />
        ) : selectedCategory === 'business-model' ? (
          <BusinessModelSection />
        ) : (
          selectedCategory && questionData[selectedCategory]?.map((question, index) => (
            <QuestionBlock
              key={index}
              question={question.question}
              steps={question.steps}
              explanation={question.explanation}
              index={index}
            />
          ))
        )}
      </div>
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