<script setup lang="ts">
import { computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import { PRICING, type PackageId } from '@/constants/pricing'
import QuantitySelector from '@/components/ui/QuantitySelector.vue'

const emit = defineEmits<{ next: [] }>()
const store = useSubscriptionStore()

const currentSizes = computed(() =>
  store.userType === 'child' ? PRICING.sizes.child : PRICING.sizes.adult,
)

const selectedPkg = computed(() => store.selectedPackage)

function selectPackage(id: PackageId) {
  store.selectPackage(id)
}
</script>

<template>
  <div class="step1">
    <!-- 兒童 / 成人切換 -->
    <div class="section">
      <p class="field-label">使用對象</p>
      <div class="type-toggle">
        <button
          class="type-btn"
          :class="{ active: store.userType === 'child' }"
          @click="store.userType = 'child'; store.selectedSize = null"
        >
          👶 兒童
        </button>
        <button
          class="type-btn"
          :class="{ active: store.userType === 'adult' }"
          @click="store.userType = 'adult'; store.selectedSize = null"
        >
          🧑 成人
        </button>
      </div>
    </div>

    <!-- 方案選擇 -->
    <div class="section" style="padding-top: 0">
      <p class="field-label">選擇方案</p>
      <div class="pkg-list">
        <div
          v-for="pkg in PRICING.packages"
          :key="pkg.id"
          class="pkg-card"
          :class="{ selected: store.selectedPackageId === pkg.id }"
          @click="selectPackage(pkg.id as PackageId)"
        >
          <div class="pkg-top">
            <div class="pkg-info">
              <div class="pkg-name-row">
                <span class="pkg-name">{{ pkg.name }}</span>
                <span v-if="pkg.tag" class="badge">{{ pkg.tag }}</span>
              </div>
              <p class="pkg-desc">{{ pkg.description }}</p>
            </div>
            <div class="pkg-radio" :class="{ checked: store.selectedPackageId === pkg.id }"></div>
          </div>

          <!-- 瑞兒外褲數量選擇 -->
          <div
            v-if="pkg.id === 'shell-only' && store.selectedPackageId === 'shell-only'"
            class="pkg-qty"
            @click.stop
          >
            <QuantitySelector
              v-model="store.shellQty"
              :min="1"
              :max="PRICING.shell.maxQty"
              label="瑞兒外褲數量"
            />
            <span class="pkg-unit-price">每個 NT$ {{ PRICING.shell.unitPrice }}</span>
          </div>

          <!-- 替換芯數量選擇 -->
          <div
            v-if="pkg.id === 'liner-only' && store.selectedPackageId === 'liner-only'"
            class="pkg-qty"
            @click.stop
          >
            <QuantitySelector
              v-model="store.linerQty"
              :min="PRICING.liner.minQty"
              :max="PRICING.liner.maxQty"
              :step="PRICING.liner.stepQty"
              label="替換芯片數"
            />
            <span class="pkg-unit-price">每片 NT$ {{ PRICING.liner.unitPrice }}</span>
          </div>

          <!-- 標準組加購瑞兒外褲 -->
          <div
            v-if="pkg.id === 'standard' && store.selectedPackageId === 'standard' && pkg.addOnShellsAllowed"
            class="pkg-addon"
            @click.stop
          >
            <div class="addon-label">
              <span>加購瑞兒外褲（優惠價 NT$ {{ PRICING.shell.addonDiscountPrice }} / 個）</span>
            </div>
            <QuantitySelector
              v-model="store.addOnShells"
              :min="0"
              :max="PRICING.shell.maxQty"
            />
          </div>

          <!-- 定價顯示 -->
          <div v-if="pkg.price > 0" class="pkg-price-row">
            <span class="pkg-price-original" v-if="pkg.originalPrice > pkg.price">
              NT$ {{ pkg.originalPrice }}
            </span>
            <span class="pkg-price">NT$ {{ pkg.price }}</span>
            <span class="badge" v-if="pkg.originalPrice > pkg.price">85折</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 尺寸選擇 -->
    <Transition name="fade-up">
      <div v-if="store.selectedPackageId" class="section" style="padding-top: 0">
        <p class="field-label">選擇尺寸</p>
        <div class="size-grid">
          <button
            v-for="size in currentSizes"
            :key="size.code"
            class="size-btn"
            :class="{ active: store.selectedSize === size.code }"
            @click="store.selectedSize = size.code"
          >
            <span class="size-code">{{ size.code }}</span>
            <span class="size-weight">{{ size.weightRange }}</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- 價格預覽 + 下一步 -->
    <div class="step-footer">
      <div class="price-preview" v-if="store.selectedPackageId">
        <span class="price-label">本次費用</span>
        <span class="price-value">NT$ {{ store.basePrice }}</span>
        <span class="price-note">（訂閱可享 85 折）</span>
      </div>
      <button
        class="btn-primary next-btn"
        :disabled="!store.step1Valid"
        @click="emit('next')"
      >
        下一步：選擇配送頻率
      </button>
    </div>
  </div>
</template>

<style scoped>
.step1 {
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
  margin-bottom: 12px;
  letter-spacing: 0.02em;
}

/* 使用對象切換 */
.type-toggle {
  display: flex;
  background: var(--color-border);
  border-radius: var(--radius-pill);
  padding: 4px;
  gap: 4px;
}
.type-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  border-radius: var(--radius-pill);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
}
.type-btn.active {
  background: var(--color-white);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

/* 方案卡片 */
.pkg-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pkg-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: 16px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  box-shadow: var(--shadow-sm);
}
.pkg-card.selected {
  border-color: var(--color-primary);
  background: #f0f7f4;
}
.pkg-card:active {
  transform: scale(0.99);
}

.pkg-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}
.pkg-info { flex: 1; }
.pkg-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}
.pkg-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}
.pkg-desc {
  font-size: 13px;
  color: var(--color-text-muted);
}

.pkg-radio {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  flex-shrink: 0;
  transition: all var(--transition-fast);
  position: relative;
}
.pkg-radio.checked {
  border-color: var(--color-primary);
  background: var(--color-primary);
}
.pkg-radio.checked::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: white;
}

.pkg-qty {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.pkg-unit-price {
  font-size: 13px;
  color: var(--color-text-muted);
}

.pkg-addon {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed var(--color-secondary);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.addon-label {
  font-size: 13px;
  color: var(--color-primary);
  font-weight: 500;
}

.pkg-price-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}
.pkg-price-original {
  font-size: 13px;
  color: var(--color-text-muted);
  text-decoration: line-through;
}
.pkg-price {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-primary);
}

/* 尺寸選擇 */
.size-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.size-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  min-width: 64px;
  padding: 10px 12px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
}
.size-btn.active {
  border-color: var(--color-primary);
  background: rgba(57, 99, 82, 0.08);
}
.size-code {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
}
.size-btn.active .size-code {
  color: var(--color-primary);
}
.size-weight {
  font-size: 10px;
  color: var(--color-text-muted);
  text-align: center;
}

/* 底部 */
.step-footer {
  margin-top: auto;
  padding: 16px;
  background: var(--color-white);
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.price-preview {
  display: flex;
  align-items: center;
  gap: 8px;
}
.price-label {
  font-size: 14px;
  color: var(--color-text-muted);
}
.price-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-primary);
}
.price-note {
  font-size: 12px;
  color: var(--color-text-muted);
}
.next-btn {
  width: 100%;
}

/* 淡入動畫 */
.fade-up-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(12px);
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
