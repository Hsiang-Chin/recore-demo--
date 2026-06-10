<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const emit = defineEmits<{
  changeSize: []
  adjustDelivery: []
}>()

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
}
</script>

<template>
  <div class="status-card card">
    <div class="status-header">
      <div class="status-badge">
        <span class="status-dot"></span>
        訂閱進行中
      </div>
      <span class="status-count">第 {{ userStore.deliveryCount }} 次配送</span>
    </div>

    <div class="status-body">
      <div class="status-row">
        <span class="status-icon">📅</span>
        <div>
          <div class="status-label">下一期配送日</div>
          <div class="status-value">{{ formatDate(userStore.nextDeliveryDate) }}</div>
        </div>
      </div>
      <div class="status-row">
        <span class="status-icon">📦</span>
        <div>
          <div class="status-label">本期配送內容</div>
          <div class="status-value">{{ userStore.currentOrder }}</div>
        </div>
      </div>
      <div class="status-row">
        <span class="status-icon">📍</span>
        <div>
          <div class="status-label">配送地址</div>
          <div class="status-value">{{ userStore.address }}</div>
        </div>
      </div>
      <div class="status-divider"></div>
      <div class="status-charge-row">
        <div>
          <div class="status-label">下一期扣款金額</div>
          <div class="status-charge">
            NT$ {{ userStore.nextChargeNTD.toLocaleString() }}
            <span class="badge">85折</span>
          </div>
        </div>
      </div>
    </div>

    <div class="status-actions">
      <button class="btn-outline status-btn" @click="emit('changeSize')">
        ✏️ 更換尺寸
      </button>
      <button class="btn-secondary status-btn" @click="emit('adjustDelivery')">
        📅 調整配送
      </button>
    </div>
  </div>
</template>

<style scoped>
.status-card {
  margin: 0 16px;
  border: 1.5px solid rgba(57, 99, 82, 0.15);
}

.status-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-primary);
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-secondary);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.85); }
}

.status-count {
  font-size: 12px;
  color: var(--color-text-muted);
}

.status-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.status-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.status-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}
.status-label {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 2px;
}
.status-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.status-divider {
  height: 1px;
  background: var(--color-border);
}

.status-charge-row { padding: 4px 0; }
.status-charge {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.status-actions {
  display: flex;
  gap: 10px;
}
.status-btn {
  flex: 1;
  font-size: 13px;
  padding: 10px 12px;
}
</style>
