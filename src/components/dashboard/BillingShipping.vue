<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const editingAddress = ref(false)
const editingCard = ref(false)
const toastMsg = ref('')

function showToast(msg: string) {
  toastMsg.value = msg
  setTimeout(() => { toastMsg.value = '' }, 2000)
}

function saveAddress() {
  editingAddress.value = false
  showToast('✅ 地址已更新')
}

function saveCard() {
  editingCard.value = false
  showToast('✅ 付款方式已更新')
}
</script>

<template>
  <div class="billing-section">
    <h3 class="section-sub-title">💳 付款與收件管理</h3>

    <!-- Toast 提示 -->
    <Transition name="toast-fade">
      <div v-if="toastMsg" class="toast">{{ toastMsg }}</div>
    </Transition>

    <!-- 付款方式 -->
    <div class="billing-card card">
      <div class="billing-row">
        <div class="billing-icon">💳</div>
        <div class="billing-content">
          <div class="billing-label">付款方式</div>
          <div v-if="!editingCard" class="billing-value">{{ userStore.paymentCard }}</div>
          <input v-else v-model="userStore.paymentCard" type="text" class="billing-input" placeholder="Visa **** 1234" />
        </div>
        <button v-if="!editingCard" class="billing-edit-btn" @click="editingCard = true">編輯</button>
        <button v-else class="billing-save-btn" @click="saveCard">儲存</button>
      </div>
    </div>

    <!-- 收件地址 -->
    <div class="billing-card card">
      <div class="billing-row">
        <div class="billing-icon">📍</div>
        <div class="billing-content">
          <div class="billing-label">收件地址</div>
          <div v-if="!editingAddress" class="billing-value">{{ userStore.address }}</div>
          <input v-else v-model="userStore.address" type="text" class="billing-input" placeholder="縣市區街道門號" />
        </div>
        <button v-if="!editingAddress" class="billing-edit-btn" @click="editingAddress = true">編輯</button>
        <button v-else class="billing-save-btn" @click="saveAddress">儲存</button>
      </div>
    </div>

    <!-- 宅配 / 超商切換 -->
    <div class="delivery-options">
      <button class="delivery-opt active">🏠 宅配到府</button>
      <button class="delivery-opt">🏪 超商取貨</button>
      <button class="delivery-opt">📦 智能櫃</button>
    </div>
  </div>
</template>

<style scoped>
.billing-section {
  padding: 20px 16px 0;
  position: relative;
}

.section-sub-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
}

.billing-card {
  margin-bottom: 10px;
  border: 1px solid var(--color-border);
}

.billing-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.billing-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}
.billing-content { flex: 1; min-width: 0; }
.billing-label {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-bottom: 3px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.billing-value {
  font-size: 14px;
  color: var(--color-text);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.billing-input {
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 6px;
  width: 100%;
}

.billing-edit-btn {
  flex-shrink: 0;
  background: transparent;
  border: 1.5px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: var(--radius-pill);
  padding: 4px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.billing-save-btn {
  flex-shrink: 0;
  background: var(--color-primary);
  border: none;
  color: white;
  border-radius: var(--radius-pill);
  padding: 4px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}

.delivery-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.delivery-opt {
  flex: 1;
  min-width: 80px;
  padding: 10px 8px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  cursor: pointer;
  font-family: inherit;
  text-align: center;
  transition: all var(--transition-fast);
}
.delivery-opt.active {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: rgba(57, 99, 82, 0.06);
  font-weight: 700;
}

/* Toast */
.toast {
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
.toast-fade-enter-active { transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-fade-leave-active { transition: all 0.2s ease; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateX(-50%) translateY(-8px); }
</style>
