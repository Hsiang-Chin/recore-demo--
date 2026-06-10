<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
  step?: number
  label?: string
}>(), {
  min: 1,
  max: 99,
  step: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function decrement() {
  if (props.modelValue - props.step >= props.min) {
    emit('update:modelValue', props.modelValue - props.step)
  }
}

function increment() {
  if (props.modelValue + props.step <= props.max) {
    emit('update:modelValue', props.modelValue + props.step)
  }
}
</script>

<template>
  <div class="qty-selector">
    <span v-if="label" class="qty-label">{{ label }}</span>
    <div class="qty-controls">
      <button
        class="qty-btn"
        :class="{ disabled: modelValue <= min }"
        @click="decrement"
        :disabled="modelValue <= min"
        aria-label="減少數量"
      >
        −
      </button>
      <span class="qty-value">{{ modelValue }}</span>
      <button
        class="qty-btn"
        :class="{ disabled: modelValue >= max }"
        @click="increment"
        :disabled="modelValue >= max"
        aria-label="增加數量"
      >
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
.qty-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qty-label {
  font-size: 14px;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.qty-controls {
  display: inline-flex;
  align-items: center;
  border: 1.5px solid var(--color-primary);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.qty-btn {
  background: transparent;
  border: none;
  color: var(--color-primary);
  font-size: 20px;
  font-weight: 400;
  line-height: 1;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast);
  font-family: inherit;
}
.qty-btn:active {
  background: rgba(57, 99, 82, 0.1);
}
.qty-btn.disabled {
  color: var(--color-border);
  cursor: not-allowed;
}

.qty-value {
  min-width: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}
</style>
