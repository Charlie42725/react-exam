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
        }}
      >
        <h1 style={{ marginBottom: "2.5rem" }}>研發補助</h1>

        <div
          className="card"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1rem",
            padding: "1.5rem",
            marginBottom: "2rem",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
          }}
        >
          <label
            htmlFor="category"
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "var(--text-color-primary)",
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
              flex: "1",
              maxWidth: "16rem",
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

        <div className="card" style={{ padding: "2rem", minHeight: "30rem" }}>
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
                    className="card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "2rem",
                      padding: "3rem 2.5rem",
                      marginInline: "auto",
                      maxWidth: "650px",
                    }}
                  >
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                        alt="AI Icon"
                        style={{
                          width: "120px",
                          height: "120px",
                        }}
                      />
                    </div>
                    <h2
                      style={{
                        color: "var(--text-color-primary)",
                        fontWeight: "700",
                        fontSize: "2rem",
                      }}
                    >
                      歡迎使用「研發補助」
                    </h2>
                    <p
                      style={{
                        fontSize: "1.15rem",
                        color: "var(--text-color-muted)",
                        textAlign: "center",
                        lineHeight: "1.7",
                        margin: "0",
                        letterSpacing: "0.3px",
                      }}
                    >
                      本系統結合{" "}
                      <span
                        style={{
                          color: "var(--text-color-primary)",
                          fontWeight: "700",
                          background: "rgba(33, 150, 243, 0.1)",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "0.25rem",
                        }}
                      >
                        AI 技術
                      </span>
                      ，協助你進行研發補助相關的練習、分析與規劃。
                      <br />
                      請從上方選單選擇你想了解的章節開始探索！
                    </p>
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
                      gap: "1rem",
                      borderRadius: "0.75rem",
                      borderLeft: "5px solid var(--text-color-primary)",
                      background: "linear-gradient(135deg, #e3f2fd, #f3e5f5)",
                      padding: "1.5rem",
                      maxWidth: "650px",
                      marginInline: "auto",
                    }}
                  >
                    <h3
                      style={{
                        color: "var(--text-color-primary)",
                        fontSize: "1.2rem",
                        fontWeight: "700",
                      }}
                    >
                      💡 使用提示
                    </h3>
                    <ul
                      style={{
                        listStyle: "none",
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
                            paddingBlock: "0.5rem",
                            color: "var(--text-color-muted)",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              color: "var(--text-color-primary)",
                            }}
                          >
                            ✓
                          </span>{" "}
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
