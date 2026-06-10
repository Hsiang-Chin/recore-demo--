<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const news = [
  {
    tag: '新品',
    tagBg: '#396352',
    title: '竹纖維春季新色上市',
    desc: '清新薄荷綠、珊瑚粉新色外殼，限量發售中！',
    date: '2026/05/28',
    bg: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    icon: '🎨',
  },
  {
    tag: '優惠',
    tagBg: '#2563eb',
    title: '訂閱週年限定 9 折回饋',
    desc: '訂閱滿 365 天自動升級，本月全品享 9 折優惠。',
    date: '2026/06/01',
    bg: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
    icon: '🎁',
  },
  {
    tag: '榮譽',
    tagBg: '#b45309',
    title: '榮獲 2026 綠色品牌大獎',
    desc: '瑞可爾連續三年榮獲台灣永續環保品牌認證肯定。',
    date: '2026/05/15',
    bg: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
    icon: '🏆',
  },
  {
    tag: '活動',
    tagBg: '#9333ea',
    title: '母親節限定禮盒開始預購',
    desc: '竹纖維外殼 × 精緻禮盒，送給最愛的媽媽。',
    date: '2026/05/10',
    bg: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
    icon: '💐',
  },
  {
    tag: '公告',
    tagBg: '#0f766e',
    title: '配送系統升級，速度更快',
    desc: '全新智能排程系統上線，配送準時率提升至 98%！',
    date: '2026/04/30',
    bg: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
    icon: '📦',
  },
]

const activeIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null
let touchStartX = 0

function goTo(i: number) {
  activeIndex.value = ((i % news.length) + news.length) % news.length
}

function next() { goTo(activeIndex.value + 1) }
function prev() { goTo(activeIndex.value - 1) }

function startAuto() {
  timer = setInterval(next, 4000)
}
function stopAuto() {
  if (timer) { clearInterval(timer); timer = null }
}

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0]?.clientX ?? 0
  stopAuto()
}
function onTouchEnd(e: TouchEvent) {
  const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX
  if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
  startAuto()
}

onMounted(startAuto)
onUnmounted(stopAuto)
</script>

<template>
  <section class="news-section">
    <div class="news-header">
      <h2 class="news-title">最新消息</h2>
      <span class="news-count">{{ activeIndex + 1 }} / {{ news.length }}</span>
    </div>

    <div
      class="carousel-viewport"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <div
        class="carousel-track"
        :style="{ transform: `translateX(${-activeIndex * 100}%)` }"
      >
        <div
          v-for="item in news"
          :key="item.title"
          class="news-card"
          :style="{ background: item.bg }"
        >
          <div class="news-icon">{{ item.icon }}</div>
          <div class="news-body">
            <div class="news-meta">
              <span class="news-tag" :style="{ background: item.tagBg }">{{ item.tag }}</span>
              <span class="news-date">{{ item.date }}</span>
            </div>
            <h3 class="news-card-title">{{ item.title }}</h3>
            <p class="news-card-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="news-dots">
      <button
        v-for="(_, i) in news"
        :key="i"
        class="dot"
        :class="{ active: i === activeIndex }"
        :aria-label="`前往第 ${i + 1} 則`"
        @click="goTo(i); stopAuto(); startAuto()"
      ></button>
    </div>
  </section>
</template>

<style scoped>
.news-section {
  padding: 24px 0 20px;
  background: var(--color-background);
}

.news-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 14px;
}
.news-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.02em;
}
.news-count {
  font-size: 13px;
  color: var(--color-text-muted);
}

/* 視口（裁切溢出） */
.carousel-viewport {
  overflow: hidden;
  padding: 4px 20px 8px;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
  gap: 0;
}

.news-card {
  flex: 0 0 100%;
  border-radius: var(--radius-md);
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: var(--shadow-sm);
  min-height: 120px;
}

.news-icon {
  font-size: 36px;
  line-height: 1;
  flex-shrink: 0;
  padding-top: 2px;
}

.news-body {
  flex: 1;
  min-width: 0;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.news-tag {
  font-size: 11px;
  font-weight: 700;
  color: white;
  padding: 2px 9px;
  border-radius: var(--radius-pill);
  letter-spacing: 0.03em;
}
.news-date {
  font-size: 11px;
  color: var(--color-text-muted);
}

.news-card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 6px;
  line-height: 1.35;
}
.news-card-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* 圓點指示器 */
.news-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 8px 0 0;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-border);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
.dot.active {
  background: var(--color-primary);
  width: 20px;
  border-radius: 3px;
}

/* ===== 響應式 ===== */
@media (min-width: 768px) {
  .news-header {
    padding: 0 28px;
  }
  .carousel-viewport {
    padding: 4px 28px 8px;
  }
  .news-card {
    padding: 24px 28px;
    min-height: 140px;
  }
  .news-icon {
    font-size: 44px;
  }
  .news-card-title {
    font-size: 18px;
  }
}

@media (min-width: 1280px) {
  .news-header {
    padding: 0 48px;
  }
  .carousel-viewport {
    padding: 4px 48px 8px;
  }
}
</style>
