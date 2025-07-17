export const promptDatas = [
  {
    title: "使用工具",
    value: "tools",
    id: 1,
    prompts: [
      {
        isLink: true,
        label: "書僮 Perplexity",
        value: `https://www.perplexity.ai/`,
      },
      {
        isLink: true,
        label: "圖書館 NotebookLM",
        value: `https://notebooklm.google.com/`,
      },
      {
        isLink: true,
        label: "特助 ChatGPT",
        value: `https://chat.openai.com/`,
      },
    ],
  },

  {
    title: "團隊簡介",
    value: "team-introduction",
    id: 2,
    prompts: [
      {
        isLink: false,
        label: "",
        value: `幫我生成一段專業的團隊成員介紹。\n這些成員的教育背景：[成員A: 教育背景; 成員B: 教育背景; ….]。\n成員A: [年資]、[專長]、[具體成就];\n成員B: [年資]、[專長]、[具體成就];…。\n請使用正式且專業的語氣，強調這些成員的專業能力和成就，並將介紹控制在3至4句話之內，最後使用表格呈現。`,
      },
    ],
  },

  {
    title: "產業與市場分析",
    value: "industry-analysis",
    id: 3,
    prompts: [
      {
        isLink: false,
        label: "市場現況",
        value: `[時間區間]+[地區]+[業別]+市場狀況`,
      },
      {
        isLink: false,
        label: "市場現況",
        value: `[業別]的市場問題與痛點?`,
      },
      {
        isLink: false,
        label: "產業現況",
        value: `[時間]+[地區]+[業別]+產業現況`,
      },
      {
        isLink: false,
        label: "產業現況",
        value: `[研究單位]在[時間][業別]的研究報告`,
      },
      {
        isLink: false,
        label: "分析方法",
        value: `僅基於資料來源進行[分析方法]後嚴格比對標的符合來源內容的百分比，並在各標題處各別標註百分比\nNote: PEST分析、五力分析、SWOT分析….等`,
      },
    ],
  },

  {
    title: "服務介紹",
    value: "service-introduction",
    id: 4,
    prompts: [
      {
        isLink: false,
        label: "Step 1. 產品/服務重點介紹",
        value: `"我要做一個服務介紹，服務產品資料為:\n名稱：[OOOO]\n核心功能：[OOOO]目標用戶：[OOOO]描述：[OOOO]\n特色亮點：[OOOO]\n用一段話進行簡介，用500個字內介紹，陳述時使用繁體中文。"
`,
      },
      {
        isLink: false,
        label: "Step 2.根據服務介紹生成情境故事",
        value: `"我有一個產品服務介紹:\n[服務情境介紹]\n依照產品服務介紹生成一段300字的故事。"
`,
      },
      {
        isLink: false,
        label: "Step3. 根據產品服務介紹與情境故事生成服務流程",
        value: `"產品服務介紹：[介紹]故事內容: [內容]\n依照故事內容設計與產品服務介紹，給我服務流程，用表格的方式呈現。"
`,
      },
      {
        isLink: false,
        label: "Step 4.根據情境故事生成分鏡表",
        value: `我有一個故事:\n[故事內容]\n依照故事內容生成分鏡圖的文字說明，根據分鏡說明分別產生圖片描述說明，描述過程過程中需要有人事時地物，用表格呈現，表格內容是分鏡、故事內容、圖片描述。`,
      },
      {
        isLink: false,
        label: "Step 5.根據圖片描述生成圖片",
        value: `我需要一張圖，圖片內容是:[圖片描述]`,
      },
      {
        isLink: false,
        label: "Step 6. 組合成服務故事",
        value: `在AI工具上繼續貼上圖片描述`,
      },
    ],
  },

  {
    title: "商業模式",
    value: "business-model",
    id: 5,
    prompts: [
      {
        isLink: false,
        label: "市場現況",
        value: `你是一位專業的商業模式分析師擅長透過產品服務介紹與商業九宮格進行分析與建議，以下是一個產品服務介紹: [產品服務介紹]\n這個產品的關鍵資訊:\n客戶對象：[顧客的年齡層、職業] 合作夥伴:[填寫上下游重要的合作夥伴]\n成本結構：[必要的支出項目]\n行銷通路:[實體或線上]\n收入來源：[主要獲利方式]\n核心資源:[技術、通路或管道] 活動:[定期或不定期的活動方式]\n根據上述進行商業模式分析後清楚說明此產品服務的成本結構、收益流與產品特色與優勢。`,
      },
      {
        isLink: false,
        label: "市場現況",
        value: `你是一位專業的商業模式分析師擅長透過產品服務介紹與商業九宮格進行分析與建議，以下是一個產品服務介紹: [產品服務介紹]\n這個產品的關鍵資訊:\n客戶對象：[顧客的年齡層、職業] 合作夥伴:[填寫上下游重要的合作夥伴]\n成本結構：[必要的支出項目]\n行銷通路:[實體或線上]\n收入來源：[主要獲利方式]\n核心資源:[技術、通路或管道] 活動:[定期或不定期的活動方式]\n根據上述進行商業模式分析後清楚說明此產品服務的成本結構、收益流與產品特色與優勢。`,
      },
      {
        isLink: false,
        label: "產業現況",
        value: `你是一位商業服務計畫書的寫作\n專家，我的可以提供的資訊:\n[團隊成員簡介];\n[產品與市場分析];\n[產品服務介紹];\n[產品服務流程];\n[商業模式];\n基於上述內容幫我整理成一份專\n業的商業計畫書，每一個項目要 提供詳細的說明，使用繁體中文。`,
      },
    ],
  },
];
