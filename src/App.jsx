import React, { useState } from 'react';
import QuestionBlock from './components/QuestionBlock';
import CourseLinks from './components/CourseLinks';
import PracticeSection from './components/PracticeSection';
import AIPracticeSection from './components/AIPracticeSection';
import PredictionSection from './components/PredictionSection';
import ExamStructureSection from './components/ExamStructureSection';
import { questionData } from './data/questions';
import './styles/main.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="app">
      <h1>國中會考數學 AI 輔助學習系統</h1>
      
      <div className="category-selector">
        <label htmlFor="category">選擇功能：</label>
        <select 
          id="category" 
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">--請選擇--</option>
          <option value="course-links">課程相關連結</option>
          <option value="ai-math">AI怎麼應用在數學</option>
          <option value="exam-structure">會考架構分析</option>
          <option value="ai-practice">AI實戰</option>
          <option value="prediction">預測考題及個人分析報告</option>
        </select>
      </div>

      <div className="content-area">
        {selectedCategory === '' ? (
          <div className="welcome-box fade-in">
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'16px'}}>
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="AI Icon" style={{width:'80px',height:'80px',marginBottom:'10px',filter:'drop-shadow(0 2px 8px #2196F355)'}}/>
              <h2 style={{color:'var(--primary-color)',fontWeight:'bold',fontSize:'2rem',marginBottom:'10px'}}>歡迎使用「國中會考數學 AI 輔助學習系統」</h2>
              <p style={{fontSize:'1.2rem',color:'#555',maxWidth:'500px',textAlign:'center'}}>本系統結合 <span style={{color:'var(--primary-color)',fontWeight:'bold'}}>AI 技術</span>，協助你針對會考數學進行練習、分析與規劃。<br/>請從上方選單選擇你想使用的功能開始探索！</p>
            </div>
          </div>
        ) : selectedCategory === 'course-links' ? (
          <CourseLinks />
        ) : selectedCategory === 'ai-math' ? (
          <PracticeSection />
        ) : selectedCategory === 'exam-structure' ? (
          <ExamStructureSection />
        ) : selectedCategory === 'ai-practice' ? (
          <AIPracticeSection />
        ) : selectedCategory === 'prediction' ? (
          <PredictionSection />
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

export default App; 