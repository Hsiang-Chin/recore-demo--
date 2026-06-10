<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

</script>

<template>
  <header class="app-header">
    <button class="icon-btn menu-btn" @click="appStore.toggleMenu" aria-label="選單">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect y="3" width="22" height="2.5" rx="1.25" fill="currentColor"/>
        <rect y="9.75" width="22" height="2.5" rx="1.25" fill="currentColor"/>
        <rect y="16.5" width="22" height="2.5" rx="1.25" fill="currentColor"/>
      </svg>
    </button>

    <div class="header-logo" @click="appStore.navigate(0)">
      <img src="/images/trademark_name.png" alt="瑞可爾 RECORE" class="logo-img" />
    </div>

    <button
      class="icon-btn"
      :aria-label="appStore.currentPanel === 2 ? '會員中心' : '購物車'"
      @click="appStore.navigate(appStore.currentPanel === 2 ? 2 : 2)"
    >
      <svg v-if="appStore.currentPanel === 2" width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/>
        <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" stroke-width="2"/>
      </svg>
    </button>
  </header>

  <!-- 漢堡選單下拉 -->
  <Transition name="menu-slide">
    <div v-if="appStore.menuOpen" class="header-menu">
      <button class="menu-item" @click="appStore.navigate(0)">🏠 首頁</button>
      <button class="menu-item" @click="appStore.navigate(1)">📦 定期配訂閱</button>
      <button class="menu-item" @click="appStore.navigate(2)">👤 會員後台</button>
      <div class="menu-divider"></div>
      <button class="menu-item menu-item-muted" @click="appStore.openAbout">關於瑞可爾</button>
      <button class="menu-item menu-item-muted" @click="appStore.openFaq">常見問題</button>
    </div>
  </Transition>
</template>

<style scoped>
.app-header {
  height: 56px;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 12px;
  flex-shrink: 0;
  position: relative;
  z-index: 100;
}

.header-logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

.logo-img {
  height: 80px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.header-menu {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  flex-shrink: 0;
  z-index: 99;
}

.menu-item {
  display: block;
  width: 100%;
  padding: 16px 20px;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  font-family: inherit;
  transition: background var(--transition-fast);
}
.menu-item:active {
  background: var(--color-background);
}
.menu-item-muted {
  color: var(--color-text-muted);
  font-size: 15px;
}

.menu-divider {
  height: 1px;
  background: var(--color-border);
  margin: 4px 0;
}

.menu-slide-enter-active {
  transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}
.menu-slide-leave-active {
  transition: all 0.2s ease;
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* ===== 響應式：平板 768px+ ===== */
@media (min-width: 768px) {
  .app-header {
    height: 64px;
  }
}
</style>
