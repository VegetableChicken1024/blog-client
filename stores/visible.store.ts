import { defineStore } from 'pinia'

export const useVisibleStore = defineStore('visible', () => {
  const visibleAside = ref(false)
  const toggleAside = () => {
    visibleAside.value = !visibleAside.value
  }
  const visibleSearch = ref(false)
  const toggleSearch = () => {
    visibleSearch.value = !visibleSearch.value
  }
  const visibleLoading = ref(false)
  const toggleLoading = () => {
    visibleLoading.value = !visibleLoading.value
  }
  return {
    visibleAside,
    toggleAside,
    visibleSearch,
    toggleSearch,
    visibleLoading,
    toggleLoading
  }
})
