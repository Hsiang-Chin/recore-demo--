<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

const stats = [
  { value: '94%', label: '垃圾減量', icon: '♻️' },
  { value: '多次', label: '外殼可重複清洗', icon: '🔄' },
  { value: 'FSC', label: '竹纖維國際認證', icon: '🍃' },
  { value: '98%', label: '準時配送率', icon: '📦' },
]

const values = [
  {
    icon: '🌱',
    title: '永續為本',
    desc: '我們相信環保不應該是消費者的妥協，而是更好的選擇。每一片替換芯都採用 FSC 認證竹纖維，生長週期短、自然抑菌。',
  },
  {
    icon: '💚',
    title: '安心呵護',
    desc: '瑞可爾通過台灣 SGS 嬰兒安全認證，無螢光劑、無甲醛、低過敏，守護寶寶最嬌嫩的肌膚。',
  },
  {
    icon: '🤝',
    title: '以人為核心',
    desc: '從設計到配送，我們傾聽每位家長的需求，讓訂閱制度真正靈活彈性，不綁約、不壓力。',
  },
]
</script>

<template>
  <div class="about-view">
    <!-- 頂部導覽列 -->
    <div class="about-header">
      <button class="back-btn" @click="appStore.closeAbout" aria-label="返回">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M14 5L8 11l6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="about-nav-title">關於瑞可爾</span>
      <div style="width: 44px"></div>
    </div>

    <div class="about-content">
      <!-- 品牌 Hero -->
      <div class="brand-hero">
        <img src="/images/trademark_only_img.png" alt="瑞可爾" class="brand-hero-logo" />
        <img src="/images/trademark_name.png" alt="RECORE 瑞可爾" class="brand-hero-name" />
        <p class="brand-hero-tagline">為下一代守護這片土地</p>
      </div>

      <!-- 環保數據 -->
      <div class="stats-section">
        <div
          v-for="s in stats"
          :key="s.label"
          class="stat-card"
        >
          <span class="stat-icon">{{ s.icon }}</span>
          <span class="stat-value">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>

      <!-- 廢棄尿布環境衝擊 -->
      <div class="crisis-section">
        <div class="crisis-intro-block">
          <h2 class="crisis-main-title">廢棄尿布的環境衝擊</h2>
          <p class="crisis-intro-text">看似輕薄的一片尿布，正在對地球造成不可忽視的負擔。</p>
        </div>

        <!-- 全球數據 -->
        <div class="crisis-card">
          <div class="crisis-stat-bar">
            <div class="crisis-stat-inner">
              <span class="crisis-number">300,000<span class="crisis-plus">+</span></span>
              <div class="crisis-stat-text">
                <span class="crisis-unit">片 / 每分鐘</span>
                <span class="crisis-label">全球一次性尿布被丟棄</span>
              </div>
            </div>
          </div>
          <img src="/images/Carousel/image1.png" alt="全球尿布廢棄物現況" class="crisis-img" />
        </div>

        <!-- 台灣數據 -->
        <div class="crisis-card">
          <div class="crisis-stat-bar crisis-stat-bar--tw">
            <div class="crisis-stat-inner">
              <span class="crisis-number">1,300</span>
              <div class="crisis-stat-text">
                <span class="crisis-unit">噸 / 每天（台灣）</span>
                <span class="crisis-label">每年廢棄尿布堆高相當於超過 6 萬座台北 101，長期以焚化為唯一出路</span>
              </div>
            </div>
          </div>
          <img src="/images/Carousel/image2.png" alt="台灣廢棄尿布的環境影響" class="crisis-img" />
        </div>
      </div>

      <!-- 品牌故事 -->
      <div class="story-section section">
        <h2 class="section-title">我們的故事</h2>
        <p class="story-text">
          瑞可爾 RECORE 創立於 2026 年，由一群熱愛自然的明志畢業生共同創辦。
          我們親身體驗了每天丟棄大量一次性尿布的無奈，決心找到一條更永續的路。
        </p>
        <p class="story-text">
          我們推出了全台首款<strong>竹纖維替換芯</strong>系統：外殼可重複使用，
          替換芯採用天然竹纖維，與甘蔗製成的保高分子吸收體 (SAP)，其吸水力強、自然抑菌，讓環保與舒適不再是對立選擇。
        </p>
      </div>

      <!-- 品牌理念 -->
      <div class="values-section section">
        <h2 class="section-title">核心理念</h2>
        <div class="value-list">
          <div v-for="v in values" :key="v.title" class="value-card">
            <div class="value-icon">{{ v.icon }}</div>
            <div class="value-body">
              <h3 class="value-title">{{ v.title }}</h3>
              <p class="value-desc">{{ v.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 環境承諾 -->
      <div class="eco-section">
        <div class="eco-inner">
          <h2 class="eco-title">🌳 綠色足跡計畫</h2>
          <p class="eco-desc">
            每筆訂閱，瑞可爾都會提撥一部份收益用於台灣本土植樹計畫。
            透過會員後台的「樹木成長」功能，您可以即時追蹤自己對地球的貢獻。
          </p>
          <div class="eco-badge-row">
            <span class="eco-badge">🍃 FSC 認證</span>
            <span class="eco-badge">♻️ 循環包裝</span>
            <span class="eco-badge">🚚 碳中和配送</span>
          </div>
        </div>
      </div>

      <!-- 聯絡我們 -->
      <div class="contact-section section">
        <h2 class="section-title">聯絡我們</h2>
        <div class="contact-list">
          <div class="contact-item">
            <span class="contact-icon">📧</span>
            <div>
              <div class="contact-label">客服信箱</div>
              <div class="contact-val">mcut@mail.mcut.edu.tw</div>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-icon">📞</span>
            <div>
              <div class="contact-label">客服專線</div>
              <div class="contact-val">02-2908-9899（週一至週五 09:00–18:00）</div>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-icon">📍</span>
            <div>
              <div class="contact-label">公司地址</div>
              <div class="contact-val">243303 新北市泰山區貴子里工專路84號</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部 -->
      <footer class="about-footer">
        <img src="/images/trademark_name.png" alt="瑞可爾" class="footer-logo" />
        <p class="footer-copy">© 2026 RECORE 瑞可爾. All rights reserved.</p>
        <p class="footer-sub">永續 · 安心 · 天然竹纖維</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  position: absolute;
  inset: 0;
  z-index: 200;
  background: var(--color-background);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 頂部導覽 */
.about-header {
  height: 56px;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  flex-shrink: 0;
  z-index: 10;
}
.back-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}
.back-btn:active {
  background: rgba(255, 255, 255, 0.15);
}
.about-nav-title {
  font-size: 17px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.03em;
}

/* 可捲動內容區 */
.about-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* 品牌 Hero */
.brand-hero {
  background: linear-gradient(150deg, #2d5143 0%, var(--color-primary) 50%, #4a7c64 100%);
  padding: 40px 24px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}
.brand-hero-logo {
  width: 110px;
  height: 110px;
  object-fit: contain;
}
.brand-hero-name {
  width: 200px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.95;
}
.brand-hero-tagline {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.08em;
  margin-top: 4px;
}

/* 環保數據 */
.stats-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--color-border);
  border-top: 1px solid var(--color-border);
}
.stat-card {
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 20px 12px;
  text-align: center;
}
.stat-icon {
  font-size: 24px;
  line-height: 1;
}
.stat-value {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.1;
}
.stat-label {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.4;
}

/* 廢棄尿布環境衝擊 */
.crisis-section {
  border-bottom: 1px solid var(--color-border);
}

.crisis-intro-block {
  padding: 24px 20px 20px;
  background: var(--color-white);
}
.crisis-main-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
  letter-spacing: 0.02em;
}
.crisis-intro-text {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.crisis-card {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-border);
}

.crisis-stat-bar {
  background: #1f3329;
  padding: 18px 20px;
}
.crisis-stat-bar--tw {
  background: var(--color-primary);
}
.crisis-stat-inner {
  display: flex;
  align-items: center;
  gap: 16px;
}
.crisis-number {
  font-size: 38px;
  font-weight: 700;
  color: var(--color-secondary);
  line-height: 1;
  flex-shrink: 0;
  letter-spacing: -0.02em;
}
.crisis-plus {
  font-size: 24px;
  vertical-align: super;
}
.crisis-stat-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.crisis-unit {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}
.crisis-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
}
.crisis-img {
  width: 100%;
  display: block;
  height: auto;
}

/* 品牌故事 */
.story-section {
  border-bottom: 1px solid var(--color-border);
}
.story-text {
  font-size: 15px;
  line-height: 1.75;
  color: var(--color-text);
  margin-bottom: 14px;
}
.story-text:last-child {
  margin-bottom: 0;
}
.story-text strong {
  color: var(--color-primary);
  font-weight: 700;
}

/* 核心理念 */
.values-section {
  border-bottom: 1px solid var(--color-border);
}
.value-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.value-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.value-icon {
  font-size: 32px;
  line-height: 1;
  flex-shrink: 0;
  padding-top: 2px;
}
.value-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 6px;
}
.value-desc {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.65;
}

/* 環境承諾 */
.eco-section {
  background: var(--color-primary);
  padding: 28px 0;
}
.eco-inner {
  padding: 0 20px;
}
.eco-title {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}
.eco-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: 16px;
}
.eco-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.eco-badge {
  font-size: 12px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  backdrop-filter: blur(4px);
}

/* 聯絡我們 */
.contact-section {
  border-bottom: 1px solid var(--color-border);
}
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.contact-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.contact-icon {
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
  padding-top: 2px;
}
.contact-label {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 3px;
}
.contact-val {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.5;
}

/* 底部 */
.about-footer {
  padding: 32px 24px;
  text-align: center;
  background: var(--color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.footer-logo {
  height: 44px;
  filter: brightness(0) invert(1);
  opacity: 0.9;
}
.footer-copy {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
}
.footer-sub {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.06em;
}

/* ===== 響應式 ===== */
@media (min-width: 768px) {
  .about-header {
    height: 64px;
  }
  .brand-hero {
    padding: 56px 40px 60px;
  }
  .brand-hero-logo {
    width: 140px;
    height: 140px;
  }
  .brand-hero-name {
    width: 240px;
  }
  .stats-section {
    grid-template-columns: repeat(4, 1fr);
  }
  .eco-inner {
    padding: 0 28px;
  }
  .crisis-intro-block {
    padding: 28px 28px 20px;
  }
  .crisis-stat-bar {
    padding: 22px 28px;
  }
  .crisis-number {
    font-size: 48px;
  }
}

@media (min-width: 1280px) {
  .eco-inner {
    padding: 0 48px;
    max-width: 800px;
    margin-inline: auto;
  }
  .crisis-intro-block {
    padding: 36px 48px 24px;
  }
  .crisis-stat-bar {
    padding: 24px 48px;
  }
}
</style>
