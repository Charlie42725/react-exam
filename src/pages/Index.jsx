import { useState, useEffect, useMemo } from "react";
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
          gap: "2rem",
        }}
      >
        <h1>研發補助</h1>

        <div
          className="card"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1rem",
            padding: "2rem",
          }}
        >
          <label
            htmlFor="category"
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "var(--text-color-primary)",
              minWidth: "fit-content",
            }}
          >
            選擇章節：
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => {
              if (e.target.value === selectedCategory) return;
              setSelectedCategory(e.target.value);
            }}
            style={{
              minWidth: "10rem",
              maxWidth: "20rem",
              color: "var(--text-color-muted)",
              fontSize: "1rem",
            }}
          >
            <option value="">--請選擇章節--</option>
            {categories.map((category) => (
              <option key={category._id} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div
          className="card"
          style={{
            padding: "2.5rem",
            minHeight: "32rem",
            borderRadius: "16px",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={staggerContainer}
              initial="hiddenBottom"
              animate="show"
              exit="hiddenBottom"
              style={{
                display: "flex",
                gap: "1.5rem",
                flexDirection: "column",
              }}
            >
              {!selectedCategory || !matchCategory ? (
                <>
                  <motion.div
                    variants={fadeInItem}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "1.5rem",
                      padding: "3.5rem 3rem",
                      borderRadius: "1rem",
                      border: "1px solid rgba(33, 150, 243, 0.1)",
                      boxShadow: "0 4px 16px rgba(33, 150, 243, 0.08)",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                        alt="AI Icon"
                        style={{
                          width: "140px",
                          height: "140px",
                          filter:
                            "drop-shadow(0 4px 8px rgba(33, 150, 243, 0.2))",
                        }}
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <h2
                        style={{
                          color: "var(--text-color-primary)",
                          fontWeight: "700",
                          fontSize: "2.2rem",
                          marginBottom: "1rem",
                          background:
                            "linear-gradient(135deg, #1976d2, #42a5f5)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        歡迎使用「研發補助」
                      </h2>
                      <p
                        style={{
                          fontSize: "1.2rem",
                          color: "var(--text-color-muted)",
                          textAlign: "center",
                          lineHeight: "1.8",
                          margin: "0",
                          letterSpacing: "0.3px",
                        }}
                      >
                        本系統結合{" "}
                        <span
                          style={{
                            color: "var(--text-color-primary)",
                            fontWeight: "700",
                            background:
                              "linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.2))",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "6px",
                            border: "1px solid rgba(33, 150, 243, 0.2)",
                          }}
                        >
                          AI 技術
                        </span>
                        ，協助你進行研發補助相關的練習、分析與規劃。
                        <br />
                        請從上方選單選擇你想了解的章節開始探索！
                      </p>
                    </div>
                    {/* <Link
                to="/new-system"
                className="btn-primary"
                style={{
                  borderRadius: "0.75rem",
                  padding: "1rem 2rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                前往企業內訓專案
              </Link> */}
                  </motion.div>
                  <motion.div
                    variants={fadeInItem}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.2rem",
                      borderRadius: "12px",
                      borderLeft: "4px solid var(--text-color-primary)",
                      background:
                        "linear-gradient(135deg, rgba(227, 242, 253, 0.8), rgba(243, 229, 245, 0.8))",
                      padding: "2rem",
                      marginTop: "1rem",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    }}
                  >
                    <h3
                      style={{
                        color: "var(--text-color-primary)",
                        fontSize: "1.3rem",
                        fontWeight: "700",
                        margin: "0 0 0.5rem 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ fontSize: "1.5rem" }}>💡</span>
                      使用提示
                    </h3>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: "0",
                        padding: "0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.8rem",
                      }}
                    >
                      {[
                        "點擊「複製」按鈕將 Prompt 複製到剪貼簿",
                        "將 [括號] 內的內容替換為您的具體資訊",
                        "可以根據需要調整 Prompt 的內容和格式",
                        "建議在使用前先了解各個 AI 工具的特性",
                      ].map((tip, index) => (
                        <li
                          key={index}
                          style={{
                            color: "var(--text-color-muted)",
                            position: "relative",
                            paddingLeft: "1.5rem",
                            lineHeight: "1.6",
                          }}
                        >
                          <span
                            style={{
                              color: "var(--text-color-primary)",
                              position: "absolute",
                              left: "0",
                              fontWeight: "bold",
                              fontSize: "1.1rem",
                            }}
                          >
                            ✓
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </>
              ) : (
                matchCategory.prompts.map((prompt, index) => (
                  <motion.div key={index} variants={fadeInItem}>
                    <PromptCard
                      prompt={prompt}
                      caregory={matchCategory.title}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
