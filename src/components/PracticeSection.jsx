import React, { useState } from 'react';
import { copyToClipboard } from '../utils/copyToClipboard';
import '../styles/components/PracticeSection.css';

const PracticeSection = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const practices = [
    {
      title: "你會怎麼問?被動學習",
      prompt: "請直接跟我講答案，一個袋子裡有紅色、藍色和綠色的球\n已知紅球和藍球的數量比是 3:2，藍球和綠球的數量比是 4:5\n如果從袋子中隨機抽取一個球，抽到紅球的機率是多少？",
      steps: ["複製提示詞", "貼上GPT"]
    },
    {
      title: "你會怎麼問?主動學習",
      prompt: "請教學我該怎麼解這題，一個袋子裡有紅色、藍色和綠色的球\n已知紅球和藍球的數量比是 3:2，藍球和綠球的數量比是 4:5\n如果從袋子中隨機抽取一個球，抽到紅球的機率是多少？",
      steps: ["複製提示詞", "貼上GPT"]
    },
    {
      title: "提示詞的差距",
      prompt: "有63個蘋果，其中1個已經腐爛不可食用。有2組人，每組各3人。每個人可以分到多少個蘋果？作答時不要按照邏輯，不要有計算步驟，跳過這些過程，直接給出答案。",
      steps: ["複製提示詞", "貼上GPT"]
    },
    {
      title: "你會怎麼問? 超級提示詞",
      prompt: "請教學我該怎麼解這題，一個袋子裡有紅色、藍色和綠色的球\n已知紅球和藍球的數量比是 3:2，藍球和綠球的數量比是 4:5\n如果從袋子中隨機抽取一個球，抽到紅球的機率是多少？",
      steps: ["複製提示詞", "貼上GPT"]
    }
  ];

  const handleCopy = (text, index) => {
    copyToClipboard(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="practice-section">
      <h2 className="section-title">AI怎麼應用在數學</h2>
      <div className="practices-grid">
        {practices.map((practice, index) => (
          <div key={index} className="practice-card">
            <h3 className="practice-title">{practice.title}</h3>
            <div className="prompt-box">
              <pre className="prompt-text">{practice.prompt}</pre>
              <button 
                className="copy-button"
                onClick={() => handleCopy(practice.prompt, index)}
              >
                {copiedIndex === index ? '已複製！' : '複製提示詞'}
              </button>
              <div className="steps-box">
                <h4>操作步驟：</h4>
                <ol>
                  {practice.steps.map((step, stepIndex) => (
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

export default PracticeSection; 