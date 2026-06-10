<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import { useAppStore } from '@/stores/appStore'
import { PRICING } from '@/constants/pricing'

const emit = defineEmits<{ prev: [] }>()
const store = useSubscriptionStore()
const appStore = useAppStore()

const isSubmitting = ref(false)
const isSuccess = ref(false)

async function confirmOrder() {
  if (!store.step3Valid || isSubmitting.value) return
  isSubmitting.value = true
  await new Promise(r => setTimeout(r, 1200))
  isSuccess.value = true
  await new Promise(r => setTimeout(r, 2000))
  store.reset()
  appStore.navigate(2)
}

const freqLabel = PRICING.subscription.frequencyOptions.find(
  f => f.weeks === store.deliveryWeeks,
)?.label ?? ''

type Channel = 'home' | 'convenience' | 'locker'

const channels: { id: Channel; label: string; icon: string; hint: string }[] = [
  { id: 'home',         label: '宅配到府',  icon: '🏠', hint: '送達指定地址，無需外出取貨' },
  { id: 'convenience', label: '超商取貨',  icon: '🏪', hint: '7-11 / 全家，到店自取' },
  { id: 'locker',      label: '智能櫃',    icon: '📦', hint: '蝦皮智取 / 郵政i郵箱，全天候取件' },
]

const deliveryChannelLabel = computed(() =>
  channels.find(c => c.id === store.deliveryChannel)?.label ?? '',
)
</script>

<template>
  <div class="step3">
    <!-- 成功畫面 -->
    <Transition name="success-pop">
      <div v-if="isSuccess" class="success-overlay">
        <div class="success-card">
          <div class="success-icon">✅</div>
          <h3 class="success-title">訂閱成功！</h3>
          <p class="success-desc">感謝您選擇瑞可爾，正在為您建立訂單...</p>
        </div>
      </div>
    </Transition>

    <!-- 訂單摘要 -->
    <div class="section summary-section">
      <h3 class="field-label">訂單摘要</h3>
      <div class="summary-card card">
        <div class="summary-row">
          <span class="summary-key">方案</span>
          <span class="summary-val">{{ store.selectedPackage?.name }}</span>
        </div>
        <div class="summary-row">
          <span class="summary-key">尺寸</span>
          <span class="summary-val">{{ store.userType === 'child' ? '兒童' : '成人' }} {{ store.selectedSize }}</span>
        </div>
        <div class="summary-row">
          <span class="summary-key">配送頻率</span>
          <span class="summary-val">{{ freqLabel }}</span>
        </div>
        <div class="divider"></div>
        <div class="summary-row">
          <span class="summary-key">原價</span>
          <span class="summary-val text-muted">NT$ {{ store.basePrice }}</span>
        </div>
        <div v-if="store.deliveryWeeks !== 0" class="summary-row">
          <span class="summary-key">85折優惠</span>
          <span class="summary-val" style="color: #e53e3e">−NT$ {{ store.savingsAmount }}</span>
        </div>
        <div class="summary-row summary-total">
          <span class="summary-key font-bold">{{ store.deliveryWeeks === 0 ? '應付金額' : '每期費用' }}</span>
          <span class="summary-price">NT$ {{ store.totalPrice }}</span>
        </div>
      </div>
    </div>

    <!-- 取貨管道 -->
    <div class="section" style="padding-top: 0">
      <h3 class="field-label">取貨管道</h3>
      <div class="channel-tabs">
        <button
          v-for="ch in channels"
          :key="ch.id"
          class="channel-tab"
          :class="{ active: store.deliveryChannel === ch.id }"
          @click="store.deliveryChannel = ch.id"
        >
          <span class="ch-icon">{{ ch.icon }}</span>
          <span class="ch-label">{{ ch.label }}</span>
        </button>
      </div>
      <p class="channel-hint">{{ channels.find(c => c.id === store.deliveryChannel)?.hint }}</p>
    </div>

    <!-- 收件人資訊（共用） -->
    <div class="section" style="padding-top: 0">
      <h3 class="field-label">收件人資訊</h3>
      <div class="form-group">
        <label>收件人姓名</label>
        <input
          v-model="store.recipientName"
          type="text"
          placeholder="請輸入姓名"
          autocomplete="name"
        />
      </div>
      <div class="form-group">
        <label>手機號碼</label>
        <input
          v-model="store.phone"
          type="tel"
          placeholder="09XX-XXX-XXX"
          autocomplete="tel"
        />
      </div>

      <!-- 宅配到府 -->
      <Transition name="channel-slide">
        <div v-if="store.deliveryChannel === 'home'" class="channel-fields">
          <div class="form-group">
            <label>收件地址</label>
            <input
              v-model="store.address"
              type="text"
              placeholder="縣市區街道門號"
              autocomplete="street-address"
            />
          </div>
        </div>
      </Transition>

      <!-- 超商取貨 -->
      <Transition name="channel-slide">
        <div v-if="store.deliveryChannel === 'convenience'" class="channel-fields">
          <div class="form-group">
            <label>便利商店</label>
            <div class="brand-group">
              <button
                class="brand-btn"
                :class="{ active: store.convenienceBrand === '711' }"
                @click="store.convenienceBrand = '711'"
              >
                7-ELEVEN
              </button>
              <button
                class="brand-btn"
                :class="{ active: store.convenienceBrand === 'familymart' }"
                @click="store.convenienceBrand = 'familymart'"
              >
                全家 FamilyMart
              </button>
            </div>
          </div>
          <div class="form-group">
            <label>門市名稱 / 店號</label>
            <input
              v-model="store.storeCode"
              type="text"
              placeholder="例：台北信義門市 (123456)"
            />
          </div>
        </div>
      </Transition>

      <!-- 智能櫃 -->
      <Transition name="channel-slide">
        <div v-if="store.deliveryChannel === 'locker'" class="channel-fields">
          <div class="form-group">
            <label>智能櫃品牌</label>
            <div class="brand-group">
              <button
                class="brand-btn"
                :class="{ active: store.lockerBrand === 'hilocker' }"
                @click="store.lockerBrand = 'hilocker'"
              >
                蝦皮智取
              </button>
              <button
                class="brand-btn"
                :class="{ active: store.lockerBrand === 'ilocker' }"
                @click="store.lockerBrand = 'ilocker'"
              >
                郵政i郵箱
              </button>
            </div>
          </div>
          <div class="form-group">
            <label>取件櫃號 / 地點</label>
            <input
              v-model="store.lockerCode"
              type="text"
              placeholder="例：台北101B1-A03"
            />
          </div>
        </div>
      </Transition>
    </div>

    <!-- 付款資訊 -->
    <div class="section" style="padding-top: 0">
      <h3 class="field-label">付款資訊</h3>
      <div class="form-group">
        <label>信用卡末 4 碼</label>
        <input
          v-model="store.paymentLast4"
          type="number"
          placeholder="1234"
          maxlength="4"
          pattern="[0-9]{4}"
        />
      </div>
      <p class="payment-note">🔒 付款資訊採用 SSL 加密保護，安全無虞</p>
    </div>

    <div class="step-footer">
      <button class="btn-ghost prev-btn" @click="emit('prev')">
        ← 上一步
      </button>
      <button
        class="btn-primary confirm-btn"
        :disabled="!store.step3Valid || isSubmitting"
        @click="confirmOrder"
      >
        <span v-if="isSubmitting" class="loading-spinner"></span>
        <span v-else>確認訂閱</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.step3 {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: var(--color-background);
  position: relative;
}

.section {
  padding: 20px 16px;
}

.field-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
  letter-spacing: 0.02em;
}

/* 訂單摘要 */
.summary-card {
  border: 1px solid var(--color-border);
}
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.summary-key {
  font-size: 14px;
  color: var(--color-text-muted);
}
.summary-val {
  font-size: 14px;
  color: var(--color-text);
  font-weight: 500;
}
.summary-total {
  margin-top: 4px;
}
.summary-price {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-primary);
}

/* 取貨管道 Tabs */
.channel-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}
.channel-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 6px;
  border-radius: var(--radius-md);
  border: 2px solid var(--color-border);
  background: var(--color-white);
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
  font-family: inherit;
}
.channel-tab.active {
  border-color: var(--color-primary);
  background: #f0f7f4;
}
.ch-icon {
  font-size: 22px;
  line-height: 1;
}
.ch-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text);
}
.channel-tab.active .ch-label {
  color: var(--color-primary);
}
.channel-hint {
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 0;
  min-height: 16px;
}

/* 品牌選擇按鈕 */
.brand-group {
  display: flex;
  gap: 8px;
  margin-top: 6px;
}
.brand-btn {
  flex: 1;
  padding: 10px 8px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--color-border);
  background: var(--color-white);
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  color: var(--color-text);
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.brand-btn.active {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: white;
}

/* 管道切換動畫 */
.channel-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
}
.channel-slide-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}
.channel-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.channel-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* 付款備注 */
.payment-note {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: -4px;
}

/* 底部 */
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
.confirm-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Loading */
.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 成功遮罩 */
.success-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 246, 233, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.success-card {
  text-align: center;
  padding: 40px 24px;
}
.success-icon {
  font-size: 64px;
  margin-bottom: 16px;
}
.success-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}
.success-desc {
  font-size: 15px;
  color: var(--color-text-muted);
}

.success-pop-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.success-pop-enter-from {
  opacity: 0;
  transform: scale(0.85);
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
  .step-footer {
    padding: 24px 48px;
  }
}
</style>
