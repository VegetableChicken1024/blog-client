<template>
  <div v-show="visibleLoading" id="preload" ref="preLoadRef">
    <div class="preload_inner" />
  </div>
</template>

<script lang="ts" setup>
import { useVisibleStore } from "~/stores/visible.store";
const visibleStore = useVisibleStore();
const router = useRouter();
const visibleAside = computed(() => visibleStore.visibleAside);
const visibleSearch = computed(() => visibleStore.visibleSearch);
const visibleLoading = computed(() => visibleStore.visibleLoading);
const toggleAside = () => visibleStore.toggleAside();
const toggleSearch = () => visibleStore.toggleSearch();
// 路由拦截
router.beforeEach((_to, _from, next) => {
  visibleStore.visibleLoading = true;
  disableScroll(true);
  next();
  visibleAside.value && toggleAside();
  visibleSearch.value && toggleSearch();
});
router.afterEach(() => {
  setTimeout(() => {
    visibleStore.visibleLoading = false;
  }, 500);
  disableScroll(false);
});
</script>

<style lang="less" scoped>
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
#preload {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 99999999;
  .preload_inner {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 80px;
    height: 80px;
    margin: -40px 0 0 -40px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #3498db;
    animation: spin 2s linear infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #e74c3c;
      animation: spin 3s linear infinite;
    }
    &::after {
      content: "";
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #f9c922;
      animation: spin 1.5s linear infinite;
    }
  }
}
</style>
