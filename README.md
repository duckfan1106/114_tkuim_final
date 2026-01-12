PikaShare - 寶可夢物品分享平台
這是一個使用 MERN 全端架構 (MongoDB, Express, React, Node.js) 開發的應用程式，專為 114 學年度（上）網頁程式設計期末專題 所設計。此平台允許使用者分享、瀏覽、更新並管理他們的寶可夢收藏品。

專案概觀 (Project Overview)
PikaShare 展示了一個具備完整 CRUD (增刪查改) 功能的應用程式，使用者可以執行以下操作：

新增 (Create)：將新的寶可夢物品（如玩偶、卡牌、遊戲片）新增至分享列表。

讀取 (Read)：瀏覽所有訓練家所分享的物品清單。

更新 (Update)：編輯物品的詳細資訊（例如：保存狀況、物品描述）。

刪除 (Delete)：從列表中移除不再分享的物品。

技術堆疊 (Tech Stack)
前端 (Frontend): React (使用 Vite 建置)

後端 (Backend): Node.js, Express.js

資料庫 (Database): MongoDB (Atlas 或 Localhost)

如何執行 (How to Run)
請依照以下步驟，分別啟動後端與前端伺服器。

1. 後端設定 (Backend Setup)
開啟終端機 (Terminal)，進入後端資料夾並安裝套件：

Bash

cd backend
npm install
確保您的 .env 檔案中已設定正確的 MONGO_URI (連線字串)，然後啟動伺服器：

Bash

node server.js
成功時您應該會看到： Server running on port 5000

2. 前端設定 (Frontend Setup)
開啟一個 新的 終端機視窗，進入前端資料夾並安裝套件：

Bash

cd frontend
npm install
啟動開發伺服器：

Bash

npm run dev
接著請在瀏覽器中開啟： http://localhost:5173

專案結構 (Project Structure)
Plaintext

rewear-project/
├── backend/            # API 伺服器與資料庫模型
│   ├── controllers/    # API 邏輯控制 (ItemController)
│   ├── models/         # 資料庫 Schema 定義 (Item.js)
│   ├── routes/         # API 路由設定 (itemRoutes.js)
│   └── server.js       # 後端程式進入點
│
├── frontend/           # React 前端應用程式
│   ├── src/            # 原始碼目錄
│   │   ├── App.jsx     # 主要元件 (包含前端邏輯)
│   │   ├── App.css     # 元件樣式表
│   │   └── index.css   # 全域樣式 (主題設定)
│   └── ...
│
└── docs/               # 專案文件
    └── API_SPEC.md     # API 規格說明書