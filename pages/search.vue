<template>
  <div class="wrapper">
    <LazyTheContent :title-text="titleText" :content-text="contentText" />
  </div>
</template>

<script lang="ts" setup>
const titleText = '找到' + 0 + '篇'
const route = useRoute()
const contentText = computed(() => {
  const keyword = route.query.keyword
  if (keyword) { return `搜索结果:包含关键字 “${keyword}” 的文章` }
  return ''
})
</script>

<style lang="less" scoped>
.wrapper {
    padding-top: 62px;
}
</style>
