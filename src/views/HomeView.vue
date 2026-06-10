<script setup lang="ts">
import HeroBanner from '@/components/home/HeroBanner.vue'
import BrandFeatures from '@/components/home/BrandFeatures.vue'
import NewsCarousel from '@/components/home/NewsCarousel.vue'
import SubscriptionEntry from '@/components/home/SubscriptionEntry.vue'
</script>

<template>
  <div class="home-view">
    <HeroBanner />
    <BrandFeatures />
    <NewsCarousel />
    <SubscriptionEntry />
    <footer class="home-footer">
      <img src="/images/trademark_name.png" alt="瑞可爾 RECORE" class="footer-logo" />
      <p class="footer-tagline">永續 · 安心 · 天然竹纖維</p>
      <p class="footer-copy">© 2026 RECORE 瑞可爾. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
}

.home-footer {
  padding: 32px 24px;
  text-align: center;
  background: var(--color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.footer-logo {
  height: 48px;
  filter: brightness(0) invert(1);
  opacity: 0.9;
}
.footer-tagline {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.08em;
}
.footer-copy {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
}
</style>
