import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { PRICING, type PackageId, type SizeCode, type UserType, type DeliveryWeeks } from '@/constants/pricing'

export const useSubscriptionStore = defineStore('subscription', () => {
  // ── 步驟控制 ─────────────────────────────────────────────
  const currentStep = ref<1 | 2 | 3>(1)

  // ── 第一步：方案與尺寸 ────────────────────────────────────
  const selectedPackageId = ref<PackageId | null>(null)
  const userType = ref<UserType>('child')
  const selectedSize = ref<SizeCode | null>(null)
  const shellQty = ref(1)
  const linerQty = ref(30)
  const addOnShells = ref(0)

  // ── 第二步：配送頻率 ──────────────────────────────────────
  const deliveryWeeks = ref<DeliveryWeeks>(4)

  // ── 第三步：收件與付款 ────────────────────────────────────
  const deliveryChannel = ref<'home' | 'convenience' | 'locker'>('home')
  const recipientName = ref('')
  const phone = ref('')
  const address = ref('')
  const convenienceBrand = ref<'711' | 'familymart' | ''>('')
  const storeCode = ref('')
  const lockerBrand = ref<'hilocker' | 'ilocker' | ''>('')
  const lockerCode = ref('')
  const paymentLast4 = ref('')

  // ── 衍生狀態 ─────────────────────────────────────────────
  const selectedPackage = computed(() =>
    PRICING.packages.find(p => p.id === selectedPackageId.value) ?? null,
  )

  const basePrice = computed(() => {
    const pkg = selectedPackage.value
    if (!pkg) return 0
    if (pkg.id === 'shell-only') return shellQty.value * PRICING.shell.unitPrice
    if (pkg.id === 'liner-only') return linerQty.value * PRICING.liner.unitPrice
    let price = pkg.price
    if (pkg.id === 'standard') price += addOnShells.value * PRICING.shell.addonDiscountPrice
    return price
  })

  const totalPrice = computed(() =>
    deliveryWeeks.value === 0
      ? basePrice.value
      : Math.round(basePrice.value * PRICING.subscription.discountRate),
  )

  const savingsAmount = computed(() =>
    basePrice.value - totalPrice.value,
  )

  const step1Valid = computed(() =>
    selectedPackageId.value !== null && selectedSize.value !== null,
  )

  const step2Valid = computed(() => true)

  const step3Valid = computed(() => {
    const baseOk =
      recipientName.value.trim().length > 0 &&
      phone.value.trim().length >= 8 &&
      paymentLast4.value.length === 4
    if (deliveryChannel.value === 'home')
      return baseOk && address.value.trim().length > 0
    if (deliveryChannel.value === 'convenience')
      return baseOk && convenienceBrand.value !== '' && storeCode.value.trim().length > 0
    if (deliveryChannel.value === 'locker')
      return baseOk && lockerBrand.value !== '' && lockerCode.value.trim().length > 0
    return false
  })

  // ── 動作 ─────────────────────────────────────────────────
  function goToStep(step: 1 | 2 | 3) {
    currentStep.value = step
  }

  function selectPackage(id: PackageId) {
    selectedPackageId.value = id
    selectedSize.value = null
    addOnShells.value = 0
  }

  function reset() {
    currentStep.value = 1
    selectedPackageId.value = null
    selectedSize.value = null
    shellQty.value = 1
    linerQty.value = 30
    addOnShells.value = 0
    deliveryWeeks.value = 4
    deliveryChannel.value = 'home'
    recipientName.value = ''
    phone.value = ''
    address.value = ''
    convenienceBrand.value = ''
    storeCode.value = ''
    lockerBrand.value = ''
    lockerCode.value = ''
    paymentLast4.value = ''
  }

  return {
    currentStep,
    selectedPackageId, userType, selectedSize,
    shellQty, linerQty, addOnShells,
    deliveryWeeks,
    deliveryChannel, recipientName, phone, address,
    convenienceBrand, storeCode, lockerBrand, lockerCode,
    paymentLast4,
    selectedPackage, basePrice, totalPrice, savingsAmount,
    step1Valid, step2Valid, step3Valid,
    goToStep, selectPackage, reset,
  }
})
