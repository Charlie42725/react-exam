import React, { useState } from 'react';
import { aiPromptData } from '../data/aiPrompts';
import '../styles/components/AIPromptSection.css';

function AIPromptSection() {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [copiedPrompt, setCopiedPrompt] = useState(null);

  const toggleCategory = (categoryIndex) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex]
    }));
  };

  const copyToClipboard = async (text, promptIndex) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(promptIndex);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('複製失敗:', err);
    }
  };

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="ai-prompt-section">
      <div className="section-header">
        <h2>AI Prompt 指令庫</h2>
        <p>專業的 AI 指令模板，幫助您快速生成高品質的內容</p>
      </div>

      <div className="prompt-categories">
        {aiPromptData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="category-card">
            <div 
              className="category-header"
              onClick={() => toggleCategory(categoryIndex)}
            >
              <h3>{category.category}</h3>
              <span className={`expand-icon ${expandedCategories[categoryIndex] ? 'expanded' : ''}`}>
                ▼
              </span>
            </div>

            {expandedCategories[categoryIndex] && (
              <div className="category-content">
                {/* 如果有子分類 */}
                {category.subcategories ? (
                  <div className="subcategories">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <div key={subIndex} className="subcategory">
                        <h4>{subcategory.name}</h4>
                        <div className="prompts-grid">
                          {subcategory.prompts.map((prompt, promptIndex) => (
                            <div key={promptIndex} className="prompt-card">
                              <div className="prompt-header">
                                <h5>{prompt.title}</h5>
                                <button
                                  className="copy-btn"
                                  onClick={() => copyToClipboard(prompt.content, `${categoryIndex}-${subIndex}-${promptIndex}`)}
                                >
                                  {copiedPrompt === `${categoryIndex}-${subIndex}-${promptIndex}` ? '已複製!' : '複製'}
                                </button>
                              </div>
                              <div className="prompt-content">
                                <pre>{prompt.content}</pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* 一般 prompts */
                  <div className="prompts-grid">
                    {category.prompts.map((prompt, promptIndex) => (
                      <div key={promptIndex} className="prompt-card">
                        <div className="prompt-header">
                          <h5>{prompt.title}</h5>
                          <div className="prompt-actions">
                            {prompt.isLink && (
                              <button
                                className="link-btn"
                                onClick={() => openLink(prompt.url)}
                              >
                                開啟連結
                              </button>
                            )}
                            <button
                              className="copy-btn"
                              onClick={() => copyToClipboard(prompt.content, `${categoryIndex}-${promptIndex}`)}
                            >
                              {copiedPrompt === `${categoryIndex}-${promptIndex}` ? '已複製!' : '複製'}
                            </button>
                          </div>
                        </div>
                        <div className="prompt-content">
                          {prompt.isLink ? (
                            <div className="link-content">
                              <span>🔗 {prompt.content}</span>
                            </div>
                          ) : (
                            <pre>{prompt.content}</pre>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="usage-tips">
        <h3>💡 使用提示</h3>
        <ul>
          <li>點擊「複製」按鈕將 Prompt 複製到剪貼簿</li>
          <li>將 [括號] 內的內容替換為您的具體資訊</li>
          <li>可以根據需要調整 Prompt 的內容和格式</li>
          <li>建議在使用前先了解各個 AI 工具的特性</li>
        </ul>
      </div>
    </div>
  );
}

export default AIPromptSection;
