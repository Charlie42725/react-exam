import '../styles/components/QuestionCard.css';

const QuestionCard = ({ question, imageUrl }) => {
  return (
    <div className="question-card">
      <div className="question-content">
        <p className="question-text">{question}</p>
        {imageUrl && (
          <div className="question-image">
            <img src={imageUrl} alt="Question illustration" />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard; 