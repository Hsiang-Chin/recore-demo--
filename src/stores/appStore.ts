import { ref } from 'vue'
import { defineStore } from 'pinia'

export type PanelIndex = 0 | 1 | 2

export const useAppStore = defineStore('app', () => {
  const currentPanel = ref<PanelIndex>(0)
  const menuOpen = ref(false)
  const showAbout = ref(false)
  const showFaq = ref(false)

  function navigate(index: PanelIndex) {
    currentPanel.value = index
    menuOpen.value = false
  }

  function toggleMenu() {
    menuOpen.value = !menuOpen.value
  }

  function openAbout() {
    menuOpen.value = false
    showAbout.value = true
  }

  function closeAbout() {
    showAbout.value = false
  }

  function openFaq() {
    menuOpen.value = false
    showFaq.value = true
  }

  function closeFaq() {
    showFaq.value = false
  }

  return { currentPanel, menuOpen, showAbout, showFaq, navigate, toggleMenu, openAbout, closeAbout, openFaq, closeFaq }
})
