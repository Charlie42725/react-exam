import React from 'react';
import '../styles/components/CourseLinks.css';

const CourseLinks = () => {
  const links = [
    {
      title: 'ChatGPT',
      url: 'https://chat.openai.com/',
      icon: '🤖'
    },
    {
      title: 'AI數學營',
      url: 'https://drive.google.com/drive/folders/1FyHFaFnUVx0uEvavByWBaY6OfjmYlGWi?usp=sharing',
      icon: '📚'
    },
    {
      title: '產出分享區',
      url: 'https://docs.google.com/document/d/1z2Sqsc8d8NqZvKZbwKvZrCLmjHqXQ0aw7HHyA7auqEk/edit?usp=sharing',
      icon: '📝'
    },
    {
      title: '課後意見回饋表',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSf-JSLcvDZrbrTXp-CDxZTofR5a2KjJD-mGM_Gpg0Z3r9EY6g/viewform?usp=dialog',
      icon: '📊'
    }
  ];

  const tools = [
    {
      title: 'Google AI Studio',
      url: 'https://aistudio.google.com/prompts/new_chat',
      icon: '🔧'
    },
    {
      title: 'Slovely AI',
      url: 'https://solvely.ai/history/2025_4_14_dd0668b9-b5cb-420c-9f7d-22fd1f8f59d4',
      icon: '⚡'
    },
    {
      title: 'Mathos AI',
      url: 'https://www.mathgptpro.com/zh-TW/',
      icon: '🧮'
    }
  ];

  return (
    <div className="course-links">
      <div className="links-section">
        <h3>課程相關連結</h3>
        <div className="links-grid">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <span className="link-icon">{link.icon}</span>
              <span className="link-title">{link.title}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="tools-section">
        <h3>輔助工具</h3>
        <div className="links-grid">
          {tools.map((tool, index) => (
            <a
              key={index}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <span className="link-icon">{tool.icon}</span>
              <span className="link-title">{tool.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseLinks; 