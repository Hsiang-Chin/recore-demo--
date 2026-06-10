<script setup lang="ts">
const features = [
  {
    icon: '🍃',
    title: '天然竹纖維/竹製SAP科技',
    desc: 'FSC 認證竹纖維與竹製環保高分子吸收體 (SAP)科技，天然抑菌透氣，柔軟吸水力強，溫和不過敏，守護寶寶嬌嫩肌膚。',
    color: '#e8f5e9',
  },
  {
    icon: '🔄',
    title: '永續循環系統',
    desc: '瑞兒外褲可重複使用 500 次以上，替換芯單獨更換，相較傳統尿布減少垃圾量高達 94%。',
    color: '#e3f2fd',
  },
  {
    icon: '📦',
    title: '智能定期配送',
    desc: '設定配送週期，根據寶寶月齡自動推薦尺寸，不斷貨、不囤貨，剛剛好到你家。',
    color: '#fff3e0',
  },
  {
    icon: '🌱',
    title: '綠色足跡計畫',
    desc: '每次訂閱都為地球出一份力，累積環保積分可折抵現金或兌換品牌限量環保周邊。',
    color: '#f3e5f5',
  },
]
</script>

<template>
  <section class="features-section">
    <div class="section-header">
      <h2 class="section-title">為什麼選擇瑞可爾</h2>
      <p class="section-subtitle">環保 · 安心 · 智能</p>
    </div>
    <div class="features-track">
      <div
        v-for="f in features"
        :key="f.title"
        class="feature-card"
        :style="{ background: f.color }"
      >
        <div class="feature-icon">{{ f.icon }}</div>
        <h3 class="feature-title">{{ f.title }}</h3>
        <p class="feature-desc">{{ f.desc }}</p>
      </div>
    </div>
    <div class="features-dots">
      <span v-for="(_, i) in features" :key="i" class="dot"></span>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding: 28px 0 20px;
}

.section-header {
  padding: 0 20px;
  margin-bottom: 16px;
}

.features-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 12px;
  padding: 4px 20px 16px;
  -webkit-overflow-scrolling: touch;
}

.feature-card {
  scroll-snap-align: start;
  min-width: 220px;
  max-width: 240px;
  border-radius: var(--radius-md);
  padding: 20px 18px;
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
}

.feature-icon {
  font-size: 32px;
  margin-bottom: 12px;
  line-height: 1;
}

.feature-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.feature-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.features-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 0 20px;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-border);
}
.dot:first-child {
  background: var(--color-secondary);
  width: 18px;
  border-radius: 3px;
}

/* ===== 響應式：平板 768px+ — 改為 2 欄 Grid ===== */
@media (min-width: 768px) {
  .section-header {
    padding: 0 28px;
  }
  .features-track {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow-x: visible;
    scroll-snap-type: none;
    padding: 4px 28px 16px;
    gap: 16px;
  }
  .feature-card {
    min-width: unset;
    max-width: unset;
  }
  .features-dots {
    display: none;
  }
}

/* ===== 響應式：桌機 1280px+ — 改為 4 欄 Grid ===== */
@media (min-width: 1280px) {
  .section-header {
    padding: 0 48px;
  }
  .features-track {
    grid-template-columns: repeat(4, 1fr);
    padding: 4px 48px 20px;
    gap: 20px;
  }
  .feature-icon {
    font-size: 36px;
  }
  .feature-title {
    font-size: 16px;
  }
  .feature-desc {
    font-size: 14px;
  }
}
</style>
