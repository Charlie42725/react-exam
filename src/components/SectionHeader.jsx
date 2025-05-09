import React from 'react';
import '../styles/components/SectionHeader.css';

const SectionHeader = ({ title }) => {
  return (
    <div className="section-header">
      <h2>{title}</h2>
    </div>
  );
};

export default SectionHeader; 