import React from 'react';
import { copyToClipboard } from '../utils/copyToClipboard';
import '../styles/components/ChatPromptBox.css';

const ChatPromptBox = ({ prompt }) => {
  const handleCopy = () => {
    copyToClipboard(prompt);
  };

  return (
    <div className="chat-prompt-box">
      <div className="prompt-content">
        <pre>{prompt}</pre>
      </div>
      <button className="copy-button" onClick={handleCopy}>
        複製問法
      </button>
    </div>
  );
};

export default ChatPromptBox; 