<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { PRICING } from '@/constants/pricing'

const userStore = useUserStore()

const redeemFeedback = ref<string | null>(null)

function canRedeem(cost: number) {
  return userStore.greenPoints >= cost
}

function redeem(optId: string, cost: number, label: string) {
  if (!canRedeem(cost)) return
  userStore.redeemPoints(cost)
  redeemFeedback.value = `🎁 ${label} 兌換成功！`
  setTimeout(() => { redeemFeedback.value = null }, 2500)
}

// 樹木 SVG 計算
const growthPct = computed(() => userStore.treeGrowthPct)

function canopyRy(layer: number): number {
  const maxRy = [36, 28, 20][layer] ?? 0
  return Math.max(4, (growthPct.value / 100) * maxRy)
}

const levelSegments = computed(() => {
  return Array.from({ length: PRICING.loyalty.treeLevelMax }, (_, i) => ({
    filled: i < userStore.treeLevel,
  }))
})
</script>

<template>
  <div class="loyalty-section">
    <h3 class="section-sub-title">🌱 綠色足跡 &amp; 瑞可爾點數</h3>

    <!-- 兌換回饋提示 -->
    <Transition name="toast-fade">
      <div v-if="redeemFeedback" class="redeem-toast">{{ redeemFeedback }}</div>
    </Transition>

    <!-- 樹木卡片 -->
    <div class="tree-card card">
      <div class="tree-layout">
        <!-- SVG 樹木 -->
        <div class="tree-container">
          <svg viewBox="0 0 120 200" class="tree-svg">
            <!-- 樹幹 -->
            <rect x="52" y="115" width="16" height="85" rx="5" fill="#8B6914" />
            <!-- 根部草地 -->
            <ellipse cx="60" cy="198" rx="28" ry="6" fill="#9ac780" opacity="0.4"/>
            <!-- 樹冠層 3（最底層）-->
            <ellipse
              cx="60" cy="120"
              :rx="40 * (growthPct / 100)"
              :ry="canopyRy(0)"
              fill="#3a7c52"
              class="canopy"
            />
            <!-- 樹冠層 2 -->
            <ellipse
              cx="60" cy="88"
              :rx="32 * (growthPct / 100)"
              :ry="canopyRy(1)"
              fill="#4a9c6c"
              class="canopy"
            />
            <!-- 樹冠層 1（頂部）-->
            <ellipse
              cx="60" cy="58"
              :rx="22 * (growthPct / 100)"
              :ry="canopyRy(2)"
              fill="#6dc98a"
              class="canopy"
            />
            <!-- 葉片光澤 -->
            <ellipse
              v-if="growthPct > 40"
              cx="52" cy="70"
              rx="8" ry="5"
              fill="rgba(255,255,255,0.15)"
            />
          </svg>
          <div class="tree-level">Lv.{{ userStore.treeLevel }}</div>
        </div>

        <!-- 統計資訊 -->
        <div class="tree-stats">
          <div class="stat-item">
            <div class="stat-value">{{ userStore.carbonSavedKg }} kg</div>
            <div class="stat-label">已減少碳排放</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userStore.renewableFiberPct }}%</div>
            <div class="stat-label">再生植物纖維比例</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userStore.deliveryCount }} 次</div>
            <div class="stat-label">累積配送次數</div>
          </div>
        </div>
      </div>

      <!-- 等級進度條 -->
      <div class="level-row">
        <span class="level-label">成長進度</span>
        <div class="level-segments">
          <div
            v-for="(seg, i) in levelSegments"
            :key="i"
            class="level-seg"
            :class="{ filled: seg.filled }"
          ></div>
        </div>
        <span class="level-next">再 {{ userStore.pointsToNextLevel }} pt 升級</span>
      </div>
    </div>

    <!-- 點數餘額 -->
    <div class="points-card card">
      <div class="points-header">
        <div>
          <div class="points-label">我的環保積分</div>
          <div class="points-value">{{ userStore.greenPoints.toLocaleString() }} <span class="points-unit">pt</span></div>
        </div>
        <div class="points-cash">
          <div class="points-cash-label">可折抵現金</div>
          <div class="points-cash-value">NT$ {{ userStore.cashRedeemable }}</div>
        </div>
      </div>

      <!-- 兌換選項 -->
      <div class="redeem-options">
        <div
          v-for="opt in PRICING.loyalty.redemptionOptions"
          :key="opt.id"
          class="redeem-card"
          :class="{ disabled: !canRedeem(opt.pointsRequired) }"
        >
          <div class="redeem-info">
            <div class="redeem-name">{{ opt.label }}</div>
            <div class="redeem-desc">{{ opt.description }}</div>
            <div class="redeem-cost">需要 {{ opt.pointsRequired }} pt</div>
          </div>
          <button
            class="redeem-btn"
            :disabled="!canRedeem(opt.pointsRequired)"
            @click="redeem(opt.id, opt.pointsRequired, opt.label)"
          >
            兌換
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loyalty-section {
  padding: 20px 16px 0;
  position: relative;
}

.section-sub-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
}

/* 樹木卡片 */
.tree-card {
  margin-bottom: 12px;
  background: linear-gradient(145deg, #f0f7f4, #e8f5e9);
  border: 1px solid rgba(57, 99, 82, 0.12);
}

.tree-layout {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.tree-container {
  position: relative;
  flex-shrink: 0;
}
.tree-svg {
  width: 90px;
  height: 120px;
}
.canopy {
  transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
}
.tree-level {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}

.tree-stats {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.stat-item {}
.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-primary);
}
.stat-label {
  font-size: 11px;
  color: var(--color-text-muted);
}

/* 等級進度 */
.level-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.level-label {
  font-size: 12px;
  color: var(--color-text-muted);
  white-space: nowrap;
}
.level-segments {
  display: flex;
  gap: 4px;
  flex: 1;
}
.level-seg {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: var(--color-border);
  transition: background 0.4s ease;
}
.level-seg.filled {
  background: var(--color-secondary);
}
.level-next {
  font-size: 11px;
  color: var(--color-text-muted);
  white-space: nowrap;
}

/* 點數卡片 */
.points-card {
  border: 1px solid var(--color-border);
  margin-bottom: 12px;
}

.points-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
}
.points-label {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 4px;
}
.points-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}
.points-unit {
  font-size: 16px;
  font-weight: 500;
}
.points-cash {
  text-align: right;
}
.points-cash-label {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-bottom: 2px;
}
.points-cash-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-secondary);
}

/* 兌換選項 */
.redeem-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.redeem-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--color-background);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}
.redeem-card.disabled {
  opacity: 0.6;
}
.redeem-info { flex: 1; }
.redeem-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 2px;
}
.redeem-desc {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-bottom: 3px;
}
.redeem-cost {
  font-size: 12px;
  color: var(--color-primary);
  font-weight: 600;
}

.redeem-btn {
  flex-shrink: 0;
  padding: 8px 16px;
  background: var(--color-secondary);
  border: none;
  border-radius: var(--radius-pill);
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: all var(--transition-fast);
}
.redeem-btn:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
}
.redeem-btn:not(:disabled):active {
  transform: scale(0.96);
}

/* 兌換 Toast */
.redeem-toast {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: white;
  padding: 10px 20px;
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-weight: 600;
  box-shadow: var(--shadow-md);
  z-index: 999;
  white-space: nowrap;
}
.toast-fade-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-fade-leave-active { transition: all 0.2s ease; }
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}
</style>
