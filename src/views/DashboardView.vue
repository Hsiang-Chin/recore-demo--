<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import StatusCard from '@/components/dashboard/StatusCard.vue'
import SizeChangeModal from '@/components/dashboard/SizeChangeModal.vue'
import DeliveryAdjust from '@/components/dashboard/DeliveryAdjust.vue'
import BillingShipping from '@/components/dashboard/BillingShipping.vue'
import LoyaltyRewards from '@/components/dashboard/LoyaltyRewards.vue'

const userStore = useUserStore()
const showSizeModal = ref(false)
const showDeliverySection = ref(false)

function scrollToDelivery() {
  showDeliverySection.value = true
}
</script>

<template>
  <div class="dashboard-view">
    <!-- 頂部問候 -->
    <div class="dash-greeting">
      <div class="greeting-content">
        <h2 class="greeting-name">您好，{{ userStore.name }} 👋</h2>
        <p class="greeting-sub">感謝您選擇瑞可爾，共完成 {{ userStore.deliveryCount }} 次配送</p>
      </div>
      <div class="greeting-tree-badge">
        <span class="tree-badge-icon">🌳</span>
        <span class="tree-badge-level">Lv.{{ userStore.treeLevel }}</span>
      </div>
    </div>

    <!-- 訂閱狀態卡片 -->
    <div class="dash-section">
      <h3 class="dash-section-title">📦 目前訂閱狀態</h3>
      <StatusCard
        @change-size="showSizeModal = true"
        @adjust-delivery="scrollToDelivery"
      />
    </div>

    <!-- 配送調整 -->
    <div class="dash-section">
      <DeliveryAdjust />
    </div>

    <!-- 點數與環保 -->
    <div class="dash-section">
      <LoyaltyRewards />
    </div>

    <!-- 付款與收件 -->
    <div class="dash-section" style="margin-bottom: 32px">
      <BillingShipping />
    </div>

    <!-- 尺寸更換 Modal -->
    <SizeChangeModal v-model="showSizeModal" />
  </div>
</template>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  background: var(--color-background);
  min-height: 100%;
}

.dash-greeting {
  background: linear-gradient(135deg, var(--color-primary) 0%, #4a7c64 100%);
  padding: 24px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.greeting-name {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
}
.greeting-sub {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
}
.greeting-tree-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  gap: 4px;
}
.tree-badge-icon { font-size: 28px; }
.tree-badge-level {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-secondary);
}

.dash-section {
  margin-top: 20px;
}
.dash-section-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary);
  padding: 0 16px 10px;
}

/* ===== 響應式：平板 768px+ ===== */
@media (min-width: 768px) {
  .dash-greeting {
    padding: 32px 32px;
  }
  .greeting-name {
    font-size: 22px;
  }
  .dash-section {
    margin-top: 28px;
  }
  .dash-section-title {
    padding: 0 28px 12px;
    font-size: 16px;
  }
}

/* ===== 響應式：桌機 1280px+ ===== */
@media (min-width: 1280px) {
  .dash-greeting {
    padding: 40px 48px;
  }
  .greeting-name {
    font-size: 24px;
  }
  .dash-section {
    margin-top: 36px;
  }
  .dash-section-title {
    padding: 0 48px 14px;
  }
}
</style>
