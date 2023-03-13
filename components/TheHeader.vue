<template>
  <header ref="headerRef" :class="{open: visibleAside, active: !navActive}">
    <div class="container">
      <div class="logo">
        <img :src="useAssets('logo.png')" alt="logo">
        <div
          :class="{bar_wrapper: true, open: visibleAside}"
          @click="toggleAside"
        >
          <span />
          <span />
          <span />
        </div>
      </div>
      <div class="menu">
        <img :src="useAssets('logo.png')" alt="logo">
        <ul class="menu_item_wrapper">
          <li @click="router.push('/')">
            <a>首页</a>
          </li>
          <li><a>归档</a></li>
          <li><a>分类</a></li>
          <li><a>标签</a></li>
          <li><a>关于</a></li>
          <li @click="toggleSearch">
            <SvgIcon name="search" />
          </li>
          <li>
            <SvgIcon name="account" />
          </li>
        </ul>
      </div>
    </div>
    <LazyTheSearchMask :visible="visibleSearch" @toggle="toggleSearch" />
  </header>
</template>

<script lang="ts" setup>
import { useVisibleStore } from '~~/stores/visible.store'
const router = useRouter()
const visibleStore = useVisibleStore()
const visibleAside = computed(() => visibleStore.visibleAside)
const toggleAside = () => visibleStore.toggleAside()

const navActive = ref(false)
const scrollTop = ref(0)
const handleScroll = () => {
  scrollTop.value = document.documentElement.scrollTop ||
    window.pageXOffset ||
    document.body.scrollTop
  navActive.value = scrollTop.value > 50
}
onMounted(() => {
  nextTick(handleScroll)
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 用于控制搜索蒙层的显示与隐藏
const visibleSearch = ref(false)
const toggleSearch = () => {
  visibleSearch.value = !visibleSearch.value
}
</script>

<style scoped lang="less">
@import '~/assets/styles/components/TheHeader.less';
</style>
