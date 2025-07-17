import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuestionBlock from "../components/QuestionBlock";
import CourseLinks from "../components/CourseLinks";
import PracticeSection from "../components/PracticeSection";
import ExamStructureSection from "../components/ExamStructureSection";
import PredictionSection from "../components/PredictionSection";
import { questionData } from "../libs/questions";
import AIPracticeSection from "../components/AIPracticeSection";

export const NewSystem = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        /**
        // 如果需要從後端獲取分類列表，可以取消註釋以下代碼
        const response = await axios.get(`${API_URL}/categories?system=corp`);
        setCategories(response.data);
        */
        // 模擬獲取分類列表
        setCategories([
          { _id: "1", label: "團隊簡介", value: "team-introduction" },
          { _id: "2", label: "使用工具", value: "tools" },
          { _id: "3", label: "產業與市場分析", value: "industry-analysis" },
          { _id: "4", label: "服務介紹", value: "service-introduction" },
          { _id: "5", label: "商業模式", value: "business-model" },
        ]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("獲取分類失敗：" + err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return <div className="loading">載入中...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <h1>OO企業內訓專案</h1>

      <div className="category-selector">
        <label htmlFor="category">選擇功能：</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">--請選擇--</option>
          {categories.map((category) => (
            <option key={category._id} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="content-area">
        {selectedCategory === "" ? (
          <div className="welcome-box fade-in">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                alt="AI Icon"
                style={{
                  width: "80px",
                  height: "80px",
                  marginBottom: "10px",
                  filter: "drop-shadow(0 2px 8px #2196F355)",
                }}
              />
              <h2
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                  fontSize: "2rem",
                  marginBottom: "10px",
                }}
              >
                歡迎使用「OO企業內訓專案」
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#555",
                  maxWidth: "500px",
                  textAlign: "center",
                }}
              >
                本系統結合{" "}
                <span
                  style={{ color: "var(--primary-color)", fontWeight: "bold" }}
                >
                  AI 技術，
                  <br />
                </span>
                協助你進行企業內訓相關的練習、分析與規劃。
                <br />
                請從上方選單選擇你想使用的功能開始探索！
              </p>
              <Link to="/" className="back-link">
                返回研發補助
              </Link>
            </div>
          </div>
        ) : selectedCategory === "course-links" ? (
          <CourseLinks />
        ) : selectedCategory === "ai-english" ? (
          <PracticeSection />
        ) : selectedCategory === "exam-structure" ? (
          <ExamStructureSection />
        ) : selectedCategory === "ai-practice" ? (
          <AIPracticeSection />
        ) : selectedCategory === "prediction" ? (
          <PredictionSection />
        ) : (
          selectedCategory &&
          questionData[selectedCategory]?.map((question, index) => (
            <QuestionBlock
              key={index}
              question={question.question}
              steps={question.steps}
              explanation={question.explanation}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};
