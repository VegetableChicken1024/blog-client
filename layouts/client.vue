<template>
  <div style="height: 1000vh">
    <LazyTheLoading />
    <LazyTheAside />
    <LazyTheHeader />
    <div :class="{ wrapper: true, open: visibleAside }">
      <slot />
    </div>
    <LazyTheMask
      :visible="visibleAside"
      :transform="{
        direction: 'row',
        instance: 250,
        delay: 500,
      }"
      @close="toggleAside"
    />
  </div>
</template>

<script setup lang="ts">
import { usePublicStore } from "../stores/public.store";
import { useVisibleStore } from "../stores/visible.store";
// 用于获取svg图标
const publicStore = usePublicStore();
publicStore.fetchIcons();
// 用于控制侧边栏的显示与隐藏
const visibleStore = useVisibleStore();
const visibleAside = computed(() => visibleStore.visibleAside);
const visibleSearch = computed(() => visibleStore.visibleSearch);
const toggleAside = () => visibleStore.toggleAside();
// 判断资源是否加载完毕
visibleStore.visibleLoading = true;
onMounted(() => {
  if (document.readyState === "complete") {
    visibleStore.visibleLoading = false;
  } else {
    // TODO: 有待优化
    window.addEventListener("load", () => {
      visibleStore.visibleLoading = false;
    });
  }
});
watch([visibleAside, visibleSearch], ([aside, search]) => {
  if (aside || search) {
    disableScroll(true);
  } else {
    disableScroll(false);
  }
});
const theme = computed(() => publicStore.theme);
// 设置主题
useHead({
  htmlAttrs: {
    "data-theme": theme.value,
  },
});
</script>

<style lang="less" scoped>
.wrapper {
  transition: transform 0.5s;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  &.open {
    transform: translateX(250px);
  }
}
</style>
