<script setup lang="ts">
import { computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import { PRICING, type DeliveryWeeks } from '@/constants/pricing'

const emit = defineEmits<{ next: []; prev: [] }>()
const store = useSubscriptionStore()

const discountedPrice = computed(() =>
  store.totalPrice,
)

function nextDeliveryDate(weeks: number) {
  const d = new Date()
  d.setDate(d.getDate() + weeks * 7)
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}
</script>

<template>
  <div class="step2">
    <div class="section">
      <h3 class="field-label">選擇配送方式</h3>
      <p class="step-hint">定期訂閱享 79 折優惠，可隨時調整頻率或暫停</p>

      <div class="freq-list">
        <div
          v-for="opt in PRICING.subscription.frequencyOptions"
          :key="opt.weeks"
          class="freq-card"
          :class="{ selected: store.deliveryWeeks === opt.weeks, 'one-time': opt.weeks === 0 }"
          @click="store.deliveryWeeks = opt.weeks as DeliveryWeeks"
        >
          <div class="freq-left">
            <div class="freq-name">
              {{ opt.label }}
              <span v-if="opt.weeks === 0" class="one-time-tag">無訂閱</span>
            </div>
            <div class="freq-hint">{{ opt.hint }}</div>
          </div>
          <div class="freq-right">
            <div class="freq-price">
              NT$ {{ opt.weeks === 0 ? store.basePrice : discountedPrice }}
            </div>
            <div v-if="opt.weeks === 0" class="freq-date one-time-note">不享折扣，一次性出貨</div>
            <div v-else class="freq-date">{{ nextDeliveryDate(opt.weeks) }} 首配</div>
          </div>
          <div class="freq-radio" :class="{ checked: store.deliveryWeeks === opt.weeks }"></div>
        </div>
      </div>
    </div>

    <Transition name="fade-up">
      <div v-if="store.deliveryWeeks !== 0" class="benefits-box">
        <div class="benefits-title">📋 訂閱彈性保障</div>
        <div class="benefit-item">✅ 隨時可調整配送頻率</div>
        <div class="benefit-item">✅ 一鍵提前或延後配送</div>
        <div class="benefit-item">✅ 可跳過任意一期</div>
        <div class="benefit-item">✅ 無合約，隨時取消</div>
      </div>
    </Transition>

    <div class="step-footer">
      <button class="btn-ghost prev-btn" @click="emit('prev')">
        ← 上一步
      </button>
      <button class="btn-primary next-btn" @click="emit('next')">
        下一步：填寫資料
      </button>
    </div>
  </div>
</template>

<style scoped>
.step2 {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: var(--color-background);
}

.section {
  padding: 20px 16px;
}

.field-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 6px;
  letter-spacing: 0.02em;
}

.step-hint {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.freq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.freq-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: 16px;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-sm);
  transition: border-color var(--transition-fast);
}
.freq-card.selected {
  border-color: var(--color-primary);
  background: #f0f7f4;
}

.freq-left { flex: 1; }
.freq-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 3px;
}
.freq-hint {
  font-size: 12px;
  color: var(--color-text-muted);
}

.freq-right {
  text-align: right;
  flex-shrink: 0;
}
.freq-price {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary);
}
.freq-date {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.freq-radio {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  flex-shrink: 0;
  transition: all var(--transition-fast);
  position: relative;
}
.freq-radio.checked {
  border-color: var(--color-primary);
  background: var(--color-primary);
}
.freq-radio.checked::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: white;
}

/* 單次購卡片 */
.freq-card.one-time {
  border-style: dashed;
  border-color: var(--color-border);
}
.freq-card.one-time.selected {
  border-style: solid;
  border-color: var(--color-primary);
}
.one-time-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  background: var(--color-accent);
  color: var(--color-primary);
  padding: 1px 8px;
  border-radius: var(--radius-pill);
  margin-left: 6px;
  vertical-align: middle;
}
.one-time-note {
  color: var(--color-text-muted) !important;
  font-style: italic;
}

/* 訂閱保障淡入 */
.fade-up-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.benefits-box {
  margin: 0 16px 16px;
  background: var(--color-accent);
  border-radius: var(--radius-md);
  padding: 16px;
}
.benefits-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 10px;
}
.benefit-item {
  font-size: 13px;
  color: var(--color-text);
  padding: 4px 0;
}

.step-footer {
  margin-top: auto;
  padding: 16px;
  background: var(--color-white);
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: 12px;
}
.prev-btn {
  flex-shrink: 0;
  color: var(--color-text-muted);
}
.next-btn {
  flex: 1;
}

/* ===== 響應式：平板 768px+ ===== */
@media (min-width: 768px) {
  .section {
    padding-left: 28px;
    padding-right: 28px;
    max-width: 720px;
    margin-inline: auto;
    width: 100%;
  }
  .benefits-box {
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
  }
  .step-footer {
    padding: 20px 28px;
  }
}

/* ===== 響應式：桌機 1280px+ ===== */
@media (min-width: 1280px) {
  .section {
    padding-left: 0;
    padding-right: 0;
    max-width: 760px;
  }
  .benefits-box {
    max-width: 760px;
  }
  .step-footer {
    padding: 24px 48px;
  }
}
</style>
