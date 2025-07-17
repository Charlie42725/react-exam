import React from 'react';
import '../styles/components/ReminderNote.css';

const ReminderNote = ({ note }) => {
  return (
    <div className="reminder-note">
      <div className="note-icon">!</div>
      <div className="note-content">
        <p>{note}</p>
      </div>
    </div>
  );
};

export default ReminderNote; 