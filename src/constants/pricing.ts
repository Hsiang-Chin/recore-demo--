// ============================================================
// 瑞可爾 RECORE — 價格與規格常數設定區
// 修改此處即可快速調整全站價格與單位設定
// ============================================================

export const PRICING = {
  // ── 單品售價 ──────────────────────────────────────────────
  shell: {
    unitPrice: 349,           // 瑞兒外褲單售價（NT$）
    addonDiscountPrice: 100,  // 加購優惠價（搭配方案時）
    maxQty: 10,               // 瑞兒外褲最大可購數量
  },
  liner: {
    unitPrice: 18,             // 替換芯單片售價（NT$）
    minQty: 10,               // 最少購買片數
    maxQty: 300,              // 最大可購片數
    stepQty: 10,              // 每次調整步進數量
  },

  // ── 訂閱方案 ──────────────────────────────────────────────
  packages: [
    {
      id: 'trial' as const,
      name: '瑞可爾安心體驗組',
      subtitle: '試用',
      tag: '新客首選',
      shells: 1,
      liners: 30,
      price: 750,
      originalPrice: 899,
      addOnShellsAllowed: false,
      description: '瑞兒外褲 × 1 + 替換芯 × 30 片',
    },
    {
      id: 'standard' as const,
      name: '瑞可爾日常標準組',
      subtitle: '',
      tag: '最受歡迎',
      shells: 1,
      liners: 120,
      price: 2200,
      originalPrice: 2499,
      addOnShellsAllowed: true,
      description: '瑞兒外褲 × 1 + 替換芯 × 120 片',
    },
    {
      id: 'shell-only' as const,
      name: '瑞兒外褲單購',
      subtitle: '',
      tag: '',
      shells: 0,
      liners: 0,
      price: 0,
      originalPrice: 0,
      addOnShellsAllowed: false,
      description: '可自由選擇數量',
    },
    {
      id: 'liner-only' as const,
      name: '替換芯單購',
      subtitle: '',
      tag: '',
      shells: 0,
      liners: 0,
      price: 0,
      originalPrice: 0,
      addOnShellsAllowed: false,
      description: '可自由選擇數量（每片 NT$18）',
    },
  ] as const,

  // ── 訂閱優惠與頻率 ────────────────────────────────────────
  subscription: {
    discountRate: 0.79,       // 訂閱折扣（85折）
    frequencyOptions: [
      { label: '單次購買', weeks: 0, hint: '不使用訂閱週期，單次出貨' },
      { label: '每週配送', weeks: 1, hint: '適合新生兒高消耗期' },
      { label: '每 2 週配送', weeks: 2, hint: '最靈活的選擇' },
      { label: '每 4 週配送', weeks: 4, hint: '多數家庭的首選' },
      { label: '每 8 週配送', weeks: 8, hint: '儲量充足時適用' },
    ] as const,
  },

  // ── 尺寸規格 ──────────────────────────────────────────────
  sizes: {
    child: [
      { code: 'NB', label: 'NB', weightRange: '0–5 kg' },
      { code: 'S',  label: 'S',  weightRange: '4–8 kg' },
      { code: 'M',  label: 'M',  weightRange: '7–12 kg' },
      { code: 'L',  label: 'L',  weightRange: '9–14 kg' },
      { code: 'XL', label: 'XL', weightRange: '12 kg 以上' },
    ] as const,
    adult: [
      { code: 'S',  label: 'S',  weightRange: '適合纖細體型' },
      { code: 'M',  label: 'M',  weightRange: '標準體型' },
      { code: 'L',  label: 'L',  weightRange: '寬鬆舒適' },
      { code: 'XL', label: 'XL', weightRange: '加大尺碼' },
    ] as const,
  },

  // ── 點數與回饋 ────────────────────────────────────────────
  loyalty: {
    earnRate: 1,              // 每消費 NT$100 得 1 點
    pointValue: 0.5,          // 1 點 = NT$0.5
    treeLevelMax: 5,          // 樹木最高等級
    pointsPerLevel: 500,      // 每升一級所需點數
    redemptionOptions: [
      {
        id: 'cash',
        label: '折抵現金',
        description: '1 點 = NT$0.5，直接折扣下期費用',
        pointsRequired: 200,
      },
      {
        id: 'towel',
        label: '換竹纖維小毛巾',
        description: '品牌限量環保周邊，每條僅需 800 點',
        pointsRequired: 800,
      },
    ] as const,
  },
} as const

// ── 型別輔助 ─────────────────────────────────────────────────
export type PackageId = typeof PRICING.packages[number]['id']
export type ChildSizeCode = typeof PRICING.sizes.child[number]['code']
export type AdultSizeCode = typeof PRICING.sizes.adult[number]['code']
export type SizeCode = ChildSizeCode | AdultSizeCode
export type UserType = 'child' | 'adult'
export type DeliveryWeeks = 0 | 1 | 2 | 4 | 8
