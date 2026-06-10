# RECORE 瑞可爾 — Demo App

> 天然竹纖維尿布訂閱服務互動原型 · 創意整合課程期末展示

**Live Demo → https://xiangren265.github.io/recore-demo-創意整合課程/**

---

## 專案介紹

RECORE 瑞可爾是一款以**永續環保**為核心理念的天然竹纖維尿布訂閱服務。本 Demo 為課程期末作品，模擬完整的品牌 App 操作流程，包含：

| 模組 | 說明 |
|------|------|
| 🏠 **首頁** | Hero Banner、品牌特色、最新消息輪播、訂閱入口 |
| 📦 **訂閱流程** | 三步驟下單（選擇方案 → 配送頻率 → 結帳資訊） |
| 📊 **會員儀表板** | 忠誠點數、帳單配送、調整頻率、尺寸更換 |
| ℹ️ **關於我們** | 品牌理念與故事（滑入頁面） |
| ❓ **常見問題** | Q&A 查詢（滑入頁面） |

---

## 技術棧

- **框架**：[Vue 3](https://vuejs.org/) + Composition API + `<script setup>`
- **語言**：TypeScript
- **建置工具**：[Vite](https://vitejs.dev/)
- **狀態管理**：[Pinia](https://pinia.vuejs.org/)
- **路由**：Vue Router 5
- **部署**：GitHub Actions → GitHub Pages

---

## 本地開發

```bash
# 安裝相依套件
npm install

# 啟動開發伺服器（熱重載）
npm run dev

# 型別檢查 + 生產環境打包
npm run build

# 預覽打包結果
npm run preview
```

> **環境需求**：Node.js `^20.19.0` 或 `>=22.12.0`

---

## 自動部署說明

推送至 `main` 分支後，[GitHub Actions](.github/workflows/deploy.yml) 會自動：

1. 安裝 Node.js 22 與專案相依
2. 執行 `npm run build`（含 TypeScript 型別檢查）
3. 將 `dist/` 目錄部署至 GitHub Pages

---

## 專案結構

```
src/
├── components/
│   ├── dashboard/     # 儀表板子元件
│   ├── home/          # 首頁子元件
│   ├── layout/        # 共用 Header / BottomNav
│   ├── subscription/  # 訂閱三步驟元件
│   └── ui/            # 通用 UI 元件
├── constants/
│   └── pricing.ts     # 全站價格與規格設定
├── stores/
│   ├── appStore.ts    # 全域導航狀態
│   └── subscriptionStore.ts  # 訂閱流程狀態
├── views/             # 各頁面視圖
└── styles/            # 全域樣式
```

---

## 訂閱方案

| 方案 | 內容 | 售價 |
|------|------|------|
| 安心體驗組 | 外褲 ×1 + 替換芯 ×30 片 | NT$750 |
| 日常標準組 | 外褲 ×1 + 替換芯 ×120 片 | NT$2,200 |
| 瑞兒外褲單購 | 自選數量（NT$349 / 件） | — |
| 替換芯單購 | 自選數量（NT$18 / 片） | — |

訂閱方案享 **85 折**優惠，支援每週 / 每 2 週 / 每 4 週 / 每 8 週彈性配送。

---

© 2026 RECORE 瑞可爾 · 創意整合課程期末作品
