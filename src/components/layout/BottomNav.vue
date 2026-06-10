<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore, type PanelIndex } from '@/stores/appStore'

const appStore = useAppStore()

const tabs = [
  { icon: '🏠', label: '首頁' },
  { icon: '📦', label: '配送' },
  { icon: '👤', label: '會員後台' },
]

const indicatorStyle = computed(() => ({
  transform: `translateX(${appStore.currentPanel * 100}%)`,
}))
</script>

<template>
  <nav class="bottom-nav">
    <div class="nav-indicator" :style="indicatorStyle"></div>
    <button
      v-for="(tab, i) in tabs"
      :key="i"
      class="nav-tab"
      :class="{ active: appStore.currentPanel === i }"
      @click="appStore.navigate(i as PanelIndex)"
    >
      <span class="nav-icon">{{ tab.icon }}</span>
      <span class="nav-label">{{ tab.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
.bottom-nav {
  height: 60px;
  background: var(--color-white);
  display: flex;
  border-top: 1px solid var(--color-border);
  position: relative;
  flex-shrink: 0;
  z-index: 100;
}

.nav-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% / 3);
  height: 3px;
  background: var(--color-primary);
  border-radius: 0 0 3px 3px;
  transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}

.nav-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px 0;
  transition: opacity var(--transition-fast);
  font-family: inherit;
  -webkit-tap-highlight-color: transparent;
}
.nav-tab:active {
  opacity: 0.7;
}

.nav-icon {
  font-size: 20px;
  line-height: 1;
  transition: transform var(--transition-fast);
}
.nav-tab.active .nav-icon {
  transform: scale(1.1);
}

.nav-label {
  font-size: 10px;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
  letter-spacing: 0.02em;
}
.nav-tab.active .nav-label {
  color: var(--color-primary);
  font-weight: 700;
}

/* ===== 響應式：平板 768px+ ===== */
@media (min-width: 768px) {
  .bottom-nav {
    height: 68px;
  }
  .nav-icon {
    font-size: 24px;
  }
  .nav-label {
    font-size: 12px;
  }
}

/* ===== 響應式：桌機 1280px+ ===== */
@media (min-width: 1280px) {
  .bottom-nav {
    height: 72px;
  }
}
</style>
