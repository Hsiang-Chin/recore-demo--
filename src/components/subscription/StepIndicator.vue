<script setup lang="ts">
defineProps<{
  currentStep: 1 | 2 | 3
}>()

const labels = ['選擇方案', '配送頻率', '確認訂購']
</script>

<template>
  <div class="step-indicator">
    <template v-for="n in 3" :key="n">
      <div class="step-item">
        <div
          class="step-circle"
          :class="{
            completed: currentStep > n,
            active: currentStep === n,
          }"
        >
          <svg v-if="currentStep > n" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7l3.5 3.5L11.5 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-else>{{ n }}</span>
        </div>
        <span class="step-label">{{ labels[n - 1] }}</span>
      </div>
      <div v-if="n < 3" class="step-line" :class="{ completed: currentStep > n }"></div>
    </template>
  </div>
</template>

<style scoped>
.step-indicator {
  display: flex;
  align-items: center;
  padding: 20px 20px 16px;
  background: var(--color-white);
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  border: 2px solid var(--color-border);
  color: var(--color-text-muted);
  background: var(--color-white);
  transition: all 0.3s ease;
}
.step-circle.active {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: rgba(57, 99, 82, 0.08);
}
.step-circle.completed {
  border-color: var(--color-secondary);
  background: var(--color-secondary);
  color: white;
}

.step-label {
  font-size: 11px;
  color: var(--color-text-muted);
  white-space: nowrap;
  font-weight: 500;
  transition: color 0.3s ease;
}
.step-item:has(.active) .step-label {
  color: var(--color-primary);
  font-weight: 600;
}

.step-line {
  flex: 1;
  height: 2px;
  background: var(--color-border);
  margin: 0 6px;
  margin-bottom: 18px;
  transition: background 0.3s ease;
}
.step-line.completed {
  background: var(--color-secondary);
}
</style>
