import React, { useState } from 'react';
import { copyToClipboard } from '../utils/copyToClipboard';
import '../styles/components/PracticeSection.css';

const PredictionSection = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const practices = [
    {
      title: "產出個人分析報告",
      prompt: "請你根據我的作答結果，和剛剛的錯題分析，幫我做一份數學分析表。分析內容請包含以下項目：\n\n- 每個章節的答對題數、總題數、正確率\n- 按章節排序我的強項與弱項\n- 整體章節掌握度分類（高、中、低）\n- 根據錯題，提供我該章節中可能要複習的概念或常見易錯點\n- 若有某章節完全答對，請告訴我是穩定掌握還是可能僥倖，並說明判斷依據（例如題目太簡單）\n\n分析完後請幫我匯出成PDF檔案，分析表以兩頁的方式呈現，並且注意我是以中文字體呈現，請避免亂碼。",
      steps: ["複製提示詞", "貼上GPT"]
    },
    {
      title: "預測會考出題方向",
      prompt: "這是近5年台灣國中生的會考題目，請幫我進行出題方向趨勢分析(出題占比)、114會考可能會出現的時事趨勢",
      steps: ["複製提示詞", "貼上GPT"]
    },
    {
      title: "打造一份考卷",
      prompt: "請幫我根據先前預測會考方向，產生一份國中會考考題，{25題選擇題，要有3題左右是素養題，最後2題是非選題",
      steps: ["複製提示詞", "貼上GPT"]
    },
    {
      title: "個人學習規劃表",
      prompt: "國三：根據個人學習表給與建議複習重點，並且幫我打造倒數{ }天的學習規畫表\n\n以下：根據個人學習表給與國中三年規劃，並且專注於未來會考出題趨勢",
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
      <h2 className="section-title">預測考題及個人分析報告</h2>
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

export default PredictionSection; 