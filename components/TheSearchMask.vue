<template>
  <div
    :class="{ search_mask: true, showMask: visible }"
    @click="emits('toggle')"
  >
    <div class="search_title">
      <h1>你想搜索什么...</h1>
    </div>
    <div class="search_input">
      <input
        v-model="keyword"
        type="search"
        class="search_wrapper"
        placeholder="Search..."
        @click.stop=""
        @keydown.enter="handleSearch"
      >
      <SvgIcon name="search" class="svg_icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ visible: boolean }>()
const emits = defineEmits<{(event: 'toggle'): void }>()

// 监听键盘esc按键
const handleEsc = (event: KeyboardEvent) => {
  if (event.key === 'Escape') { emits('toggle') }
}
watch(() => props.visible, (val) => {
  val ? window.addEventListener('keydown', handleEsc) : window.removeEventListener('keydown', handleEsc)
})
const router = useRouter()
const keyword = ref('')
const handleSearch = () => {
  if (!keyword.value) { return }
  router.push({ path: '/search', query: { keyword: keyword.value } })
  emits('toggle')
  keyword.value = ''
}
</script>

<style lang="less" scoped>
@import '~/assets/styles/components/TheSearchMask.less';
</style>
