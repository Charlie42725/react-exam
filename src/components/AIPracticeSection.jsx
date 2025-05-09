import React, { useState } from 'react';
import { copyToClipboard } from '../utils/copyToClipboard';
import '../styles/components/PracticeSection.css';

const AIPracticeSection = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const practices = [
    {
      title: "產出一份考卷並優化",
      prompt: "我目前是國中{ 年級 } 請幫我出{ }題選擇題\n這是我已經會的章節{數與式、幾何、代數、統計與機率、函數與圖形}\n難度為{ 簡單、中等、困難、資優 }的考卷",
      steps: ["複製提示詞", "貼上GPT"]
    },
    {
      title: "檢查解法",
      prompt: "我的步驟 [具體內容] 對嗎？有沒有錯？",
      steps: ["先貼上自己的解題過程", "複製提示詞", "貼上GPT"]
    },
    {
      title: "理解錯誤",
      prompt: "我這裡 [具體錯誤] 為什麼錯？請解釋並示範",
      steps: ["複製提示詞", "貼上GPT"]
    },
    {
      title: "練習類似題目",
      prompt: "請給我 [數量] 道類似題目，附答案",
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
      <h2 className="section-title">AI實戰</h2>
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

export default AIPracticeSection; 