<template>
  <aside ref="asideRef" :class="{open: visibleAside}">
    <!-- 侧边栏头像 -->
    <div class="avatar_wrapper">
      <div class="avatar">
        <img :src="useAssets('avatar.png')" alt="">
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="search_wrapper">
      <input
        ref="inputRef"
        v-model="keyword"
        placeholder="搜索..."
        type="search"
        @keydown.enter="handleSearch"
      >
    </div>
    <!-- 主内容区域 -->
    <div class="content_wrapper">
      <ul class="list_wrapper">
        <li @click="routerPush('/')">
          <span>首页</span>
        </li>
        <li>
          <span>分类</span>
          <ul class="more_wrapper">
            <li>
              <span />
            </li>
          </ul>
        </li>
        <li>
          <span>更多</span>
          <ul class="more_wrapper">
            <li><span>归档</span></li>
            <li><span>分类</span></li>
            <li><span>标签</span></li>
            <li><span>关于</span></li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useVisibleStore } from '~~/stores/visible.store'
const visibleStore = useVisibleStore()
const visibleAside = computed(() => visibleStore.visibleAside)

// 兼容移动端键盘弹出时，侧边栏不会被顶上去
const asideRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const innerHeight = ref(0)
const handleResize = () => {
  asideRef.value && (asideRef.value.style.height = `${innerHeight.value}px`)
}
onMounted(() => {
  innerHeight.value = window.innerHeight || (document.documentElement && document.documentElement.offsetHeight) ||
    document.body.offsetHeight
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const router = useRouter()
// 搜索
const keyword = ref('')
const handleSearch = () => {
  if (!keyword.value) { return }
  inputRef.value && inputRef.value.blur()
  router.push({ path: '/search', query: { keyword: keyword.value } })
  visibleStore.toggleAside()
  keyword.value = ''
}

// 路由跳转
const routerPush = (path: string) => {
  router.push(path)
  visibleStore.toggleAside()
}
</script>

<style scoped lang="less">
@import '~/assets/styles/components/TheAside.less';
</style>
