import React from 'react';
import { aiPromptData } from '../data/aiPrompts';
import '../styles/components/AIPromptSection.css';

// 團隊簡介組件
export const TeamIntroSection = () => {
  const teamData = aiPromptData.find(category => category.category === "團隊簡介");
  
  return (
    <div className="ai-prompt-section">
      <h2 className="section-title">團隊簡介</h2>
      <div className="prompts-grid">
        {teamData?.prompts.map((prompt, index) => (
          <div key={index} className="prompt-card">
            <h3 className="prompt-title">{prompt.title}</h3>
            <div className="prompt-content">{prompt.content}</div>
            <button 
              className="copy-button"
              onClick={() => navigator.clipboard.writeText(prompt.content)}
            >
              複製提示詞
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 使用工具組件
export const ToolsSection = () => {
  const toolsData = aiPromptData.find(category => category.category === "使用工具");
  
  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div className="ai-prompt-section">
      <h2 className="section-title">使用工具</h2>
      <div className="prompts-grid">
        {toolsData?.prompts.map((prompt, index) => (
          <div key={index} className="prompt-card">
            <h3 className="prompt-title">{prompt.title}</h3>
            <div className="prompt-content">{prompt.content}</div>
            {prompt.isLink ? (
              <button 
                className="external-link-button"
                onClick={() => handleLinkClick(prompt.url)}
              >
                開啟連結
              </button>
            ) : (
              <button 
                className="copy-button"
                onClick={() => navigator.clipboard.writeText(prompt.content)}
              >
                複製提示詞
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 產業與市場分析組件
export const MarketAnalysisSection = () => {
  const marketData = aiPromptData.find(category => category.category === "產業與市場分析");
  
  return (
    <div className="ai-prompt-section">
      <h2 className="section-title">產業與市場分析</h2>
      {marketData?.subcategories.map((subcategory, subIndex) => (
        <div key={subIndex} className="subcategory-section">
          <h3 className="subcategory-title">{subcategory.name}</h3>
          <div className="prompts-grid">
            {subcategory.prompts.map((prompt, promptIndex) => (
              <div key={promptIndex} className="prompt-card">
                <h4 className="prompt-title">{prompt.title}</h4>
                <div className="prompt-content">{prompt.content}</div>
                <button 
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(prompt.content)}
                >
                  複製提示詞
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// 服務介紹組件
export const ServiceIntroSection = () => {
  const serviceData = aiPromptData.find(category => category.category === "服務介紹");
  
  return (
    <div className="ai-prompt-section">
      <h2 className="section-title">服務介紹</h2>
      <div className="prompts-grid">
        {serviceData?.prompts.map((prompt, index) => (
          <div key={index} className="prompt-card">
            <h3 className="prompt-title">{prompt.title}</h3>
            <div className="prompt-content">{prompt.content}</div>
            <button 
              className="copy-button"
              onClick={() => navigator.clipboard.writeText(prompt.content)}
            >
              複製提示詞
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 商業模式組件
export const BusinessModelSection = () => {
  const businessData = aiPromptData.find(category => category.category === "商業模式");
  
  return (
    <div className="ai-prompt-section">
      <h2 className="section-title">商業模式</h2>
      <div className="prompts-grid">
        {businessData?.prompts.map((prompt, index) => (
          <div key={index} className="prompt-card">
            <h3 className="prompt-title">{prompt.title}</h3>
            <div className="prompt-content">{prompt.content}</div>
            <button 
              className="copy-button"
              onClick={() => navigator.clipboard.writeText(prompt.content)}
            >
              複製提示詞
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
