import React from 'react';

const QuestionBlock = ({ question, steps, explanation, index }) => {
  return (
    <div className="question-block">
      <h2>第 {index + 1} 題</h2>
      <p>{question}</p>
      
      <div className="steps">
        <strong>解題步驟：</strong>
        {steps.map((step, i) => (
          <p key={i}>{step}</p>
        ))}
      </div>

      <div className="explanation">
        <strong>說明：</strong>
        <p>{explanation}</p>
      </div>
    </div>
  );
};

export default QuestionBlock; 