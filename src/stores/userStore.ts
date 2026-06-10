import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { PRICING } from '@/constants/pricing'

export const useUserStore = defineStore('user', () => {
  const name = ref('陳小明')
  const nextDeliveryDate = ref('2026-07-01')
  const currentOrder = ref('瑞可爾棉柔尿布 L號 × 3箱')
  const currentSize = ref('L')
  const address = ref('新北市新莊區中正路 123 號 4 樓')
  const nextChargeNTD = ref(2400)
  const greenPoints = ref(1250)
  const treeLevel = ref(3)
  const deliveryCount = ref(5)
  const carbonSavedKg = ref(12.4)
  const renewableFiberPct = ref(95)
  const paymentCard = ref('Visa **** 8934')

  const treeGrowthPct = computed(() =>
    Math.round((treeLevel.value / PRICING.loyalty.treeLevelMax) * 100),
  )

  const pointsToNextLevel = computed(() =>
    PRICING.loyalty.pointsPerLevel - (greenPoints.value % PRICING.loyalty.pointsPerLevel),
  )

  const cashRedeemable = computed(() =>
    Math.floor(greenPoints.value * PRICING.loyalty.pointValue),
  )

  function advanceDelivery() {
    const d = new Date(nextDeliveryDate.value)
    d.setDate(d.getDate() - 7)
    nextDeliveryDate.value = d.toISOString().split('T')[0] ?? nextDeliveryDate.value
  }

  function delayDelivery() {
    const d = new Date(nextDeliveryDate.value)
    d.setDate(d.getDate() + 7)
    nextDeliveryDate.value = d.toISOString().split('T')[0] ?? nextDeliveryDate.value
  }

  function skipDelivery() {
    const d = new Date(nextDeliveryDate.value)
    d.setDate(d.getDate() + 28)
    nextDeliveryDate.value = d.toISOString().split('T')[0] ?? nextDeliveryDate.value
  }

  function updateSize(size: string) {
    currentSize.value = size
  }

  function redeemPoints(cost: number) {
    if (greenPoints.value >= cost) {
      greenPoints.value -= cost
    }
  }

  return {
    name, nextDeliveryDate, currentOrder, currentSize,
    address, nextChargeNTD, greenPoints, treeLevel,
    deliveryCount, carbonSavedKg, renewableFiberPct, paymentCard,
    treeGrowthPct, pointsToNextLevel, cashRedeemable,
    advanceDelivery, delayDelivery, skipDelivery, updateSize, redeemPoints,
  }
})
