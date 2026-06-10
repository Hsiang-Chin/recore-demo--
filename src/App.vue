<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/appStore'
import AppHeader from '@/components/layout/AppHeader.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import HomeView from '@/views/HomeView.vue'
import SubscriptionView from '@/views/SubscriptionView.vue'
import DashboardView from '@/views/DashboardView.vue'
import SplashScreen from '@/components/SplashScreen.vue'
import AboutView from '@/views/AboutView.vue'
import FaqView from '@/views/FaqView.vue'

const appStore = useAppStore()
const trackStyle = computed(() => ({
  transform: `translateX(${-appStore.currentPanel * (100 / 3)}%)`,
}))

// 修正 iOS Safari 的 100vh 問題
onMounted(() => {
  const setVH = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
  }
  setVH()
  window.addEventListener('resize', setVH)
})
</script>

<template>
  <SplashScreen />
  <div class="phone-frame">
    <!-- 關於瑞可爾覆蓋頁（從右側滑入） -->
    <Transition name="page-slide">
      <AboutView v-if="appStore.showAbout" />
    </Transition>

    <!-- 常見問題覆蓋頁（從右側滑入） -->
    <Transition name="page-slide">
      <FaqView v-if="appStore.showFaq" />
    </Transition>

    <AppHeader />

    <div class="carousel-track" :style="trackStyle">
      <div class="panel">
        <HomeView />
      </div>
      <div class="panel">
        <SubscriptionView />
      </div>
      <div class="panel">
        <DashboardView />
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<style>
/* 手機框架 */
.phone-frame {
  width: 100%;
  max-width: 480px;
  height: 100dvh;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-background);
  position: relative;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.4);
}

/* 橫向輪播軌道 */
.carousel-track {
  display: flex;
  width: 300%;
  flex: 1;
  min-height: 0;
  transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}

/* 各頁面面板 */
.panel {
  width: calc(100% / 3);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
}

/* ===== 響應式：平板 768px+ ===== */
@media (min-width: 768px) {
  .phone-frame {
    max-width: 100%;
    box-shadow: none;
  }
}

/* ===== 響應式：桌機 1280px+ ===== */
@media (min-width: 1280px) {
  .phone-frame {
    max-width: 1100px;
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.5);
  }
}

/* ===== 關於頁面滑入動畫 ===== */
.page-slide-enter-active {
  transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
}
.page-slide-leave-active {
  transition: transform 0.35s ease;
}
.page-slide-enter-from,
.page-slide-leave-to {
  transform: translateX(100%);
}
</style>
