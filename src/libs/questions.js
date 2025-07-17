export const questions = [
  {
    id: 1,
    text: "請解釋以下程式碼的輸出結果：\n\n```javascript\nlet x = 10;\nfunction test() {\n  console.log(x);\n  let x = 20;\n}\ntest();\n```",
    imageUrl: null,
    prompt: "請分析這段 JavaScript 程式碼的執行結果，並解釋為什麼會產生這樣的輸出。",
    gptResponse: "這段程式碼會產生 ReferenceError 錯誤。原因是在 test 函數中，我們使用了 let 宣告了變數 x，這會產生暫時性死區（Temporal Dead Zone, TDZ）。在 let 宣告之前，該變數是不可存取的，即使外部作用域有同名的變數。",
    reminder: "注意 JavaScript 的變數提升（Hoisting）和暫時性死區（TDZ）的概念。"
  },
  {
    id: 2,
    text: "請解釋以下 SQL 查詢的執行順序：\n\n```sql\nSELECT department, COUNT(*) as employee_count\nFROM employees\nWHERE salary > 50000\nGROUP BY department\nHAVING COUNT(*) > 5\nORDER BY employee_count DESC;\n```",
    imageUrl: null,
    prompt: "請詳細說明這個 SQL 查詢的執行順序，並解釋每個子句的作用。",
    gptResponse: "SQL 查詢的執行順序如下：\n1. FROM：從 employees 表中獲取數據\n2. WHERE：過濾 salary > 50000 的記錄\n3. GROUP BY：按 department 分組\n4. HAVING：過濾分組後 COUNT(*) > 5 的組\n5. SELECT：選擇 department 和計算 COUNT(*)\n6. ORDER BY：按 employee_count 降序排序",
    reminder: "注意 SQL 查詢的執行順序與寫法順序不同，這對於理解查詢效能很重要。"
  }
];

export const questionData = {
  "112": [
    {
      question: "已知函數 f(x) = x^2 - 4x + 3，求 f(x) 的最小值。",
      steps: [
        "將函數寫成完全平方形式：f(x) = (x^2 - 4x + 4) - 1",
        "化簡得：f(x) = (x - 2)^2 - 1",
        "因為 (x - 2)^2 ≥ 0，所以最小值為 -1"
      ],
      explanation: "這是一個二次函數求極值的問題。通過配方法將函數轉化為完全平方形式，可以很容易地看出函數的最小值。"
    },
    {
      question: "解方程組：\n2x + y = 5\nx - y = 1",
      steps: [
        "將兩個方程相加：3x = 6",
        "解得 x = 2",
        "將 x = 2 代入第二個方程：2 - y = 1",
        "解得 y = 1"
      ],
      explanation: "這是一個二元一次方程組，可以使用加減消元法來求解。"
    }
  ],
  "111": [
    {
      question: "已知三角形 ABC 中，AB = 5，BC = 12，AC = 13，求三角形 ABC 的面積。",
      steps: [
        "檢查是否為直角三角形：5^2 + 12^2 = 13^2",
        "確認是直角三角形，直角在 B 點",
        "面積 = (5 × 12) ÷ 2 = 30"
      ],
      explanation: "這是一個利用畢氏定理判斷直角三角形並計算面積的問題。"
    }
  ]
}; 