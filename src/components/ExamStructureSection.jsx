import React, { useState } from 'react';
import { copyToClipboard } from '../utils/copyToClipboard';
import '../styles/components/ExamStructureSection.css';

const ExamStructureSection = () => {
  const [copiedPromptIndex, setCopiedPromptIndex] = useState(null);
  const [copiedQuestionIndex, setCopiedQuestionIndex] = useState(null);

  const practices = [
    {
      title: "從「刪除法」到「選項辨識」",
      question: `有研究報告指出，1880 年至 2020 年全球平均氣溫上升趨勢約為每十年上升 0.08℃。已知 2020 年全球平均氣溫為 14.88℃，假設未來的全球平均氣溫上升趨勢與上述趨勢相同，且每年上升的度數相同，則預估2020年之後第x年的全球平均氣溫為多少℃？（以 x 表示）
(A) 14.88＋0.08x
(B) 14.88＋0.008x
(C) 14.88＋0.08 [ x＋(2020－1880)]
(D) 14.88＋0.008 [ x＋(2020－1880)]`,
      prompt: "幫我分析每個對或錯的原因",
      steps: ["複製題目", "貼上GPT", "複製提示詞", "貼上GPT"]
    },
    {
      title: "混淆分析：AI幫你抓「陷阱選項」",
      question: `有研究報告指出，1880 年至 2020 年全球平均氣溫上升趨勢約為每十年上升 0.08℃。已知 2020 年全球平均氣溫為 14.88℃，假設未來的全球平均氣溫上升趨勢與上述趨勢相同，且每年上升的度數相同，則預估2020年之後第x年的全球平均氣溫為多少℃？（以 x 表示）
(A) 14.88＋0.08x
(B) 14.88＋0.008x
(C) 14.88＋0.08 [ x＋(2020－1880)]
(D) 14.88＋0.008 [ x＋(2020－1880)]`,
      prompt: "這題的錯誤選項是怎麼設計的？容易誤選在哪？",
      steps: ["複製題目", "貼上GPT", "複製提示詞", "貼上GPT"]
    },
    {
      title: "反向學習：透過AI讓你找出錯在哪",
      question: `有研究報告指出，1880 年至 2020 年全球平均氣溫上升趨勢約為每十年上升 0.08℃。已知 2020 年全球平均氣溫為 14.88℃，假設未來的全球平均氣溫上升趨勢與上述趨勢相同，且每年上升的度數相同，則預估2020年之後第x年的全球平均氣溫為多少℃？（以 x 表示）
(A) 14.88＋0.08x
(B) 14.88＋0.008x
(C) 14.88＋0.08 [ x＋(2020－1880)]
(D) 14.88＋0.008 [ x＋(2020－1880)]`,
      prompt: "請幫我為這題設計四個選項，其中兩個包含常見錯誤邏輯",
      steps: ["複製題目", "貼上GPT", "複製提示詞", "貼上GPT"]
    },
    {
      title: "題後複盤：用AI反問「還有哪些方法？」",
      question: `有研究報告指出，1880 年至 2020 年全球平均氣溫上升趨勢約為每十年上升 0.08℃。已知 2020 年全球平均氣溫為 14.88℃，假設未來的全球平均氣溫上升趨勢與上述趨勢相同，且每年上升的度數相同，則預估2020年之後第x年的全球平均氣溫為多少℃？（以 x 表示）
(A) 14.88＋0.08x
(B) 14.88＋0.008x
(C) 14.88＋0.08 [ x＋(2020－1880)]
(D) 14.88＋0.008 [ x＋(2020－1880)]`,
      prompt: "這題還有其他解法嗎？如果改變條件會怎樣？",
      steps: ["複製題目", "貼上GPT", "複製提示詞", "貼上GPT"]
    }
  ];

  const handleCopyPrompt = (text, index) => {
    copyToClipboard(text);
    setCopiedPromptIndex(index);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  const handleCopyQuestion = (text, index) => {
    copyToClipboard(text);
    setCopiedQuestionIndex(index);
    setTimeout(() => setCopiedQuestionIndex(null), 2000);
  };

  return (
    <div className="exam-structure-section">
      <h2 className="section-title">會考架構分析</h2>
      <div className="practices-grid">
        {practices.map((practice, index) => (
          <div key={index} className="practice-card">
            <h3 className="practice-title">{practice.title}</h3>
            <div className="prompt-box">
              <div className="question-box">
                <pre className="question-text">{practice.question}</pre>
                <button 
                  className="copy-button"
                  onClick={() => handleCopyQuestion(practice.question, index)}
                >
                  {copiedQuestionIndex === index ? '已複製題目！' : '複製題目'}
                </button>
              </div>
              <div className="prompt-content">
                <pre className="prompt-text">{practice.prompt}</pre>
                <button 
                  className="copy-button"
                  onClick={() => handleCopyPrompt(practice.prompt, index)}
                >
                  {copiedPromptIndex === index ? '已複製提示詞！' : '複製提示詞'}
                </button>
              </div>
              <div className="steps-box">
                <h4>操作步驟：</h4>
                <div className="steps-list">
                  {practice.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="step-item">
                      {stepIndex > 0 && <span className="step-arrow">➡️</span>}
                      <span className="step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamStructureSection; 