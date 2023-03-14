<template>
  <div>
    <LazyTheNav />
    <LazyTheContent title-text="近况" :content-text="welcomeText" />
  </div>
</template>

<script lang="ts" setup>
import { getScrollElement } from "~/utils";
const welcomeText = "莫等闲、白了少年头，空悲切。";
// 记录scroll位置
const scrollTop = ref(0);
// 是否第一次加载
const isMounted = ref(false);
const scrollElement = ref<HTMLElement | null>(null);
const handleScroll = () => {
  scrollTop.value =
    document.documentElement.scrollTop ||
    window.pageXOffset ||
    document.body.scrollTop;
  if (isMounted.value) {
    scrollElement.value = getScrollElement();
  }
};
onMounted(() => {
  scrollElement.value = getScrollElement();
  nextTick(() => {
    handleScroll();
    isMounted.value = true;
    scrollElement.value?.scrollTo({ top: 0 });
  });
});
onActivated(() => {
  window.addEventListener("scroll", handleScroll);
  setTimeout(() => {
    scrollElement.value?.scrollTo({ top: scrollTop.value });
  }, 0);
});
onDeactivated(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
