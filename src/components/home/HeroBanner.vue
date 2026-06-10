<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'
import { useSubscriptionStore } from '@/stores/subscriptionStore'

const appStore = useAppStore()
const subStore = useSubscriptionStore()

function startSubscription() {
  subStore.reset()
  appStore.navigate(1)
}
</script>

<template>
  <section class="hero">
    <div class="hero-bg">
      <div class="hero-decoration hero-dec-1"></div>
      <div class="hero-decoration hero-dec-2"></div>
      <div class="hero-decoration hero-dec-3"></div>
    </div>
    <div class="hero-content">
      <div class="hero-brand">
        <img src="/images/trademark_only_img.png" alt="" class="hero-brand-icon" />
        <span class="hero-brand-text">瑞可爾 RECORE</span>
      </div>
      <h1 class="hero-tagline">
        選擇RECORE<br>
        <span class="tagline-highlight">讓每一次的日常替換</span>
        <span class="tagline-highlight">都成為回歸自然的起點</span>
      </h1>
      <p class="hero-sub">竹纖維+竹製環保高分子吸收體 (SAP) · 定期配送 · 免運到家</p>
      <div class="hero-badges">
        <span class="hero-badge">🍃 天然竹纖維</span>
        <span class="hero-badge">♻️ 環保永續</span>
        <span class="hero-badge">📦 智能配送</span>
      </div>
      <button class="btn-primary hero-cta" @click="startSubscription">
        立即訂購
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style="margin-left:6px">
          <path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <p class="hero-discount">訂閱立享 <strong>85折</strong> 優惠，隨時可調整</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(150deg, #2d5143 0%, var(--color-primary) 50%, #4a7c64 100%);
  padding: 40px 24px 48px;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-decoration {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
}
.hero-dec-1 { width: 200px; height: 200px; top: -60px; right: -60px; }
.hero-dec-2 { width: 120px; height: 120px; bottom: -30px; left: -30px; }
.hero-dec-3 { width: 80px; height: 80px; top: 50%; right: 10%; }

.hero-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
}

.hero-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}
.hero-brand-icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
.hero-brand-text {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.08em;
}

.hero-tagline {
  font-size: 30px;
  font-weight: 700;
  color: var(--color-white);
  line-height: 1.35;
  letter-spacing: 0.02em;
}
.tagline-highlight {
  color: var(--color-secondary);
  white-space: nowrap;
}

.hero-sub {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.05em;
}

.hero-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}
.hero-badge {
  font-size: 12px;
  background: rgba(255, 255, 255, 0.15);
  color: var(--color-white);
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  backdrop-filter: blur(4px);
}

.hero-cta {
  width: 100%;
  max-width: 280px;
  font-size: 17px;
  padding: 16px 32px;
  background: var(--color-white);
  color: var(--color-primary);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.hero-cta:active {
  background: var(--color-background);
}

.hero-discount {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}
.hero-discount strong {
  color: var(--color-secondary);
}

/* ===== 響應式：平板 768px+ ===== */
@media (min-width: 768px) {
  .hero {
    padding: 56px 40px 64px;
  }
  .hero-brand-icon {
    width: 130px;
    height: 130px;
  }
  .hero-tagline {
    font-size: 38px;
  }
  .hero-sub {
    font-size: 16px;
  }
  .hero-cta {
    max-width: 360px;
    font-size: 18px;
  }
  .hero-dec-1 { width: 280px; height: 280px; top: -80px; right: -80px; }
  .hero-dec-2 { width: 180px; height: 180px; bottom: -40px; left: -40px; }
}

/* ===== 響應式：桌機 1280px+ ===== */
@media (min-width: 1280px) {
  .hero {
    padding: 72px 80px 88px;
  }
  .hero-brand-icon {
    width: 160px;
    height: 160px;
  }
  .hero-tagline {
    font-size: 48px;
  }
  .hero-sub {
    font-size: 17px;
  }
  .hero-cta {
    max-width: 400px;
    font-size: 19px;
    padding: 18px 40px;
  }
  .hero-dec-1 { width: 360px; height: 360px; top: -100px; right: -100px; }
  .hero-dec-2 { width: 220px; height: 220px; bottom: -60px; left: -60px; }
  .hero-dec-3 { width: 120px; height: 120px; }
}
</style>
