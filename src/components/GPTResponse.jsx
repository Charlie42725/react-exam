import React from 'react';
import '../styles/components/GPTResponse.css';

const GPTResponse = ({ response }) => {
  return (
    <div className="gpt-response">
      <div className="response-content">
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default GPTResponse; 