<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { PRICING } from '@/constants/pricing'
import BaseModal from '@/components/ui/BaseModal.vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const userStore = useUserStore()
const selectedSize = ref(userStore.currentSize)
const userType = ref<'child' | 'adult'>('child')

const currentSizes = computed(() =>
  userType.value === 'child' ? PRICING.sizes.child : PRICING.sizes.adult,
)

function confirm() {
  userStore.updateSize(selectedSize.value)
  emit('update:modelValue', false)
}
</script>

<template>
  <BaseModal :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" title="更換尺寸">
    <div class="type-toggle">
      <button
        class="type-btn"
        :class="{ active: userType === 'child' }"
        @click="userType = 'child'; selectedSize = ''"
      >
        👶 兒童
      </button>
      <button
        class="type-btn"
        :class="{ active: userType === 'adult' }"
        @click="userType = 'adult'; selectedSize = ''"
      >
        🧑 成人
      </button>
    </div>

    <p class="size-hint">目前尺寸：<strong>{{ userStore.currentSize }}</strong></p>

    <div class="size-grid">
      <button
        v-for="size in currentSizes"
        :key="size.code"
        class="size-btn"
        :class="{ active: selectedSize === size.code }"
        @click="selectedSize = size.code"
      >
        <span class="size-code">{{ size.code }}</span>
        <span class="size-weight">{{ size.weightRange }}</span>
      </button>
    </div>

    <template #footer>
      <button
        class="btn-primary"
        style="width: 100%"
        :disabled="!selectedSize"
        @click="confirm"
      >
        確認更換為 {{ selectedSize || '—' }} 號
      </button>
    </template>
  </BaseModal>
</template>

<style scoped>
.type-toggle {
  display: flex;
  background: var(--color-border);
  border-radius: var(--radius-pill);
  padding: 4px;
  gap: 4px;
  margin-bottom: 16px;
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

.size-hint {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: 14px;
}
.size-hint strong {
  color: var(--color-primary);
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.size-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 8px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  cursor: pointer;
  transition: all var(--transition-spring);
  font-family: inherit;
}
.size-btn.active {
  border-color: var(--color-primary);
  background: rgba(57, 99, 82, 0.08);
  transform: scale(1.04);
}
.size-code {
  font-size: 18px;
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
</style>
