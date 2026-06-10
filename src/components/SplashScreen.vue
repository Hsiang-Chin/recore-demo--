<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(true)
const leaving = ref(false)

onMounted(() => {
  // 動畫完成後淡出畫面
  setTimeout(() => {
    leaving.value = true
    setTimeout(() => {
      visible.value = false
    }, 600)
  }, 3000)
})
</script>

<template>
  <Transition name="splash-leave">
    <div v-if="visible" class="splash" :class="{ leaving }">
      <div class="splash-inner">
        <img
          src="/images/trademark_only_img.png"
          alt="瑞可爾"
          class="splash-logo"
        />
        <img
          src="/images/trademark_name.png"
          alt="RECORE 瑞可爾"
          class="splash-name"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  background: #fff6ea;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.6s ease;
}
.splash.leaving {
  opacity: 0;
}

.splash-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

/* 商標圖示：從左彈跳進入 */
.splash-logo {
  width: 400px;
  height: 400px;
  object-fit: contain;
  animation: bounceInLeft 1.4s ease forwards;
}

/* 商標文字：延遲漸入 */
.splash-name {
  width: 240px;
  object-fit: contain;
  opacity: 0;
  animation: fadeIn 0.55s ease forwards;
  animation-delay: 1.0s;
}

@keyframes bounceInLeft {
  0% {
    transform: translateX(-120vw) rotate(-12deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  58% {
    transform: translateX(60px) rotate(6deg);
  }
  70% {
    transform: translateX(-44px) rotate(-4deg);
  }
  80% {
    transform: translateX(28px) rotate(3deg);
  }
  88% {
    transform: translateX(-16px) rotate(-2deg);
  }
  94% {
    transform: translateX(8px) rotate(1deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
