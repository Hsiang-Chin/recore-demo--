<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import { PRICING, type PackageId } from '@/constants/pricing'

const appStore = useAppStore()
const subStore = useSubscriptionStore()

const previewPackages = PRICING.packages.filter(p => p.id === 'trial' || p.id === 'standard')

function selectAndGo(id: PackageId) {
  subStore.reset()
  subStore.selectPackage(id)
  appStore.navigate(1)
}
</script>

<template>
  <section class="entry-section section-accent section">
    <h2 class="section-title">選擇適合的方案</h2>

    <div class="entry-cards">
      <div
        v-for="pkg in previewPackages"
        :key="pkg.id"
        class="entry-card"
      >
        <div v-if="pkg.tag" class="entry-badge badge">{{ pkg.tag }}</div>
        <div class="entry-icon">{{ pkg.id === 'trial' ? '🌱' : '⭐' }}</div>
        <h3 class="entry-name">{{ pkg.name }}</h3>
        <p class="entry-desc">{{ pkg.description }}</p>
        <div class="entry-pricing">
          <span class="entry-original">NT$ {{ pkg.originalPrice }}</span>
          <span class="entry-price">NT$ {{ pkg.price }}</span>
          <span class="entry-discount badge">85折</span>
        </div>
        <button class="btn-primary entry-btn" @click="selectAndGo(pkg.id as PackageId)">
          選擇此方案
        </button>
      </div>
    </div>

    <div class="entry-custom">
      <p class="entry-custom-label">想自訂數量？</p>
      <div class="entry-custom-btns">
        <button class="btn-outline entry-custom-btn" @click="selectAndGo('shell-only')">
          單買瑞兒外褲
        </button>
        <button class="btn-outline entry-custom-btn" @click="selectAndGo('liner-only')">
          單買替換芯
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.entry-section {
  background: var(--color-accent);
}

.entry-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.entry-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  position: relative;
  border: 2px solid transparent;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}
.entry-card:active {
  border-color: var(--color-secondary);
  box-shadow: var(--shadow-md);
}

.entry-badge {
  position: absolute;
  top: -10px;
  right: 16px;
}

.entry-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.entry-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 6px;
}

.entry-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: 14px;
}

.entry-pricing {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.entry-original {
  font-size: 13px;
  color: var(--color-text-muted);
  text-decoration: line-through;
}
.entry-price {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-primary);
}
.entry-discount {
  font-size: 11px;
}

.entry-btn {
  width: 100%;
}

.entry-custom {
  text-align: center;
}
.entry-custom-label {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}
.entry-custom-btns {
  display: flex;
  gap: 12px;
}
.entry-custom-btn {
  flex: 1;
  font-size: 14px;
  padding: 10px 16px;
}
</style>
