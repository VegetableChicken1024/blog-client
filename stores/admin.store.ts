import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useAdminStore = defineStore('admin', () => {
  const isCollapse = ref(false);
  const updateIsCollapse = (newVal: boolean) => {
    isCollapse.value = newVal;
  };
  return {
    isCollapse,
    updateIsCollapse
  };
});
