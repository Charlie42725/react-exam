import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { promptDatas } from "../libs/prompts";
import { PromptCard } from "../components/Index/PromptCard";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "../libs/motion";
export const Index = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        /**
        // 如果需要從後端獲取分類列表，可以取消註釋以下代碼
        const response = await axios.get(`${API_URL}/categories?system=rd`); 
        setCategories(response.data);
        */
        // 模擬獲取分類列表
        setCategories(
          promptDatas.map((item) => ({
            _id: item.id,
            label: item.title,
            value: item.value,
          }))
        );

        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("獲取分類失敗：" + err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const matchCategory = useMemo(
    () => promptDatas.find((category) => category.value === selectedCategory),
    [selectedCategory]
  );

  if (loading) {
    return <section className="loading">載入中...</section>;
  }

  if (error) {
    return <section className="error">{error}</section>;
  }

  return (
    <section>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>研發補助</h1>

        <div
          className="card"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1rem",
          }}
        >
          <label htmlFor="category">選擇章節：</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => {
              if (e.target.value === selectedCategory) return;
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="">--請選擇--</option>
            {categories.map((category) => (
              <option key={category._id} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="card" style={{ padding: "1.5rem", minHeight: "25rem" }}>
          {!selectedCategory || !matchCategory ? (
            <div
              className="card"
              style={{
                width: "fit-content",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
                padding: "2rem",
                marginInline: "auto",
                maxWidth: "600px",
              }}
            >
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                  alt="AI Icon"
                  style={{
                    width: "90px",
                    height: "90px",
                    filter: "drop-shadow(0 4px 12px #2196F355)",
                  }}
                />
              </div>
              <h2
                style={{
                  color: "var(--text-color-primary)",
                  fontWeight: "bold",
                  fontSize: "1.8rem",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                歡迎使用「研發補助」
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-color-muted)",
                  textAlign: "center",
                  lineHeight: "1.6",
                  margin: "0",
                }}
              >
                本系統結合{" "}
                <span
                  style={{
                    color: "var(--text-color-primary)",
                    fontWeight: "bold",
                  }}
                >
                  AI 技術
                </span>
                ，協助你進行研發補助相關的練習、分析與規劃。
                <br />
                請從上方選單選擇你想使用的功能開始探索！
              </p>
              <Link
                to="/new-system"
                className="btn-primary"
                style={{
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                前往企業內訓專案
              </Link>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={matchCategory.value}
                variants={staggerContainer}
                initial="hiddenBottom"
                animate="show"
                exit="hiddenBottom"
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                }}
              >
                {matchCategory.prompts.map((prompt, index) => (
                  <motion.div key={index} variants={fadeInItem}>
                    <PromptCard
                      prompt={prompt}
                      caregory={matchCategory.title}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};
