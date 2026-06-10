<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const confirmedAction = ref<string | null>(null)

function doAction(action: 'advance' | 'delay' | 'skip') {
  if (action === 'advance') userStore.advanceDelivery()
  else if (action === 'delay') userStore.delayDelivery()
  else userStore.skipDelivery()

  confirmedAction.value = action
  setTimeout(() => { confirmedAction.value = null }, 2000)
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}
</script>

<template>
  <div class="adjust-section">
    <h3 class="section-sub-title">📅 配送時間調整</h3>

    <div class="adjust-cards">
      <!-- 提前配送 -->
      <div class="adjust-card">
        <div class="adjust-info">
          <div class="adjust-name">提前配送</div>
          <div class="adjust-desc">家裡快用完了？立即安排 24-48 小時出貨</div>
        </div>
        <button
          class="adjust-btn"
          :class="{ confirmed: confirmedAction === 'advance' }"
          @click="doAction('advance')"
        >
          <template v-if="confirmedAction === 'advance'">
            ✓ 已更新
          </template>
          <template v-else>
            提前 7 天
          </template>
        </button>
      </div>

      <!-- 延後一週 -->
      <div class="adjust-card">
        <div class="adjust-info">
          <div class="adjust-name">延後一週</div>
          <div class="adjust-desc">家裡尿布還夠，自動順延下次配送日</div>
        </div>
        <button
          class="adjust-btn"
          :class="{ confirmed: confirmedAction === 'delay' }"
          @click="doAction('delay')"
        >
          <template v-if="confirmedAction === 'delay'">
            ✓ 已更新
          </template>
          <template v-else>
            延後 7 天
          </template>
        </button>
      </div>

      <!-- 跳過此期 -->
      <div class="adjust-card adjust-card-skip">
        <div class="adjust-info">
          <div class="adjust-name">跳過本次配送</div>
          <div class="adjust-desc">出國或收到贈品？直接跳過不扣款</div>
        </div>
        <button
          class="adjust-btn adjust-btn-skip"
          :class="{ confirmed: confirmedAction === 'skip' }"
          @click="doAction('skip')"
        >
          <template v-if="confirmedAction === 'skip'">
            ✓ 已跳過
          </template>
          <template v-else>
            跳過此期
          </template>
        </button>
      </div>
    </div>

    <p class="adjust-note">
      目前預定配送日：<strong>{{ formatDate(userStore.nextDeliveryDate) }}</strong>
    </p>
  </div>
</template>

<style scoped>
.adjust-section {
  padding: 20px 16px 0;
}

.section-sub-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
}

.adjust-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

.adjust-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: var(--shadow-sm);
}
.adjust-card-skip {
  border: 1px dashed var(--color-border);
}

.adjust-info { flex: 1; }
.adjust-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 3px;
}
.adjust-desc {
  font-size: 12px;
  color: var(--color-text-muted);
}

.adjust-btn {
  flex-shrink: 0;
  min-width: 80px;
  padding: 8px 14px;
  border: 1.5px solid var(--color-primary);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
  text-align: center;
}
.adjust-btn:active {
  background: var(--color-primary);
  color: white;
}
.adjust-btn.confirmed {
  background: var(--color-secondary);
  border-color: var(--color-secondary);
  color: var(--color-primary);
}
.adjust-btn-skip {
  border-color: var(--color-border);
  color: var(--color-text-muted);
}
.adjust-btn-skip.confirmed {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-primary);
}

.adjust-note {
  font-size: 12px;
  color: var(--color-text-muted);
  text-align: center;
}
.adjust-note strong {
  color: var(--color-primary);
}
</style>
