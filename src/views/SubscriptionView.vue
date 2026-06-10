<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import StepIndicator from '@/components/subscription/StepIndicator.vue'
import Step1Package from '@/components/subscription/Step1Package.vue'
import Step2Schedule from '@/components/subscription/Step2Schedule.vue'
import Step3Checkout from '@/components/subscription/Step3Checkout.vue'

const store = useSubscriptionStore()
const direction = ref<'forward' | 'backward'>('forward')

const transitionName = computed(() => `slide-${direction.value}`)

function nextStep() {
  direction.value = 'forward'
  const next = (store.currentStep + 1) as 1 | 2 | 3
  if (next <= 3) store.goToStep(next)
}

function prevStep() {
  direction.value = 'backward'
  const prev = (store.currentStep - 1) as 1 | 2 | 3
  if (prev >= 1) store.goToStep(prev)
}
</script>

<template>
  <div class="sub-view">
    <div class="sub-header">
      <h2 class="sub-title">定期配訂閱</h2>
      <StepIndicator :current-step="store.currentStep" />
    </div>

    <div class="sub-content">
      <Transition :name="transitionName" mode="out-in">
        <Step1Package
          v-if="store.currentStep === 1"
          key="step1"
          @next="nextStep"
        />
        <Step2Schedule
          v-else-if="store.currentStep === 2"
          key="step2"
          @next="nextStep"
          @prev="prevStep"
        />
        <Step3Checkout
          v-else
          key="step3"
          @prev="prevStep"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.sub-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-background);
}

.sub-header {
  background: var(--color-white);
  flex-shrink: 0;
}

.sub-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--color-primary);
  padding: 16px 20px 0;
}

.sub-content {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

/* 前進方向：從右滑入 */
.slide-forward-enter-active,
.slide-forward-leave-active {
  transition: transform 0.32s cubic-bezier(0.25, 1, 0.5, 1),
              opacity 0.25s ease;
}
.slide-forward-enter-from {
  transform: translateX(40px);
  opacity: 0;
}
.slide-forward-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}

/* 後退方向：從左滑入 */
.slide-backward-enter-active,
.slide-backward-leave-active {
  transition: transform 0.32s cubic-bezier(0.25, 1, 0.5, 1),
              opacity 0.25s ease;
}
.slide-backward-enter-from {
  transform: translateX(-40px);
  opacity: 0;
}
.slide-backward-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
