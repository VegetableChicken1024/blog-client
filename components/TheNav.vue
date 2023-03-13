<template>
  <nav>
    <!-- 用于形成三角形的空div -->
    <div class="slant_left" />
    <div class="slant_right" />
    <div class="mask">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="useAssets('avatar.png')" alt="">
      </div>
      <!-- 一言 -->
      <div class="text">
        <span>{{ bannerText }}</span>
      </div>
      <!-- 社交账号 -->
      <div class="message">
        <div v-for="item in 5" :key="item">
          <img :src="useAssets(`${item}.png`)" alt="">
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useVisibleStore } from '~/stores/visible.store'
const visibleStore = useVisibleStore()
const bannerText = ref('')
const fetchBannerText = async () => {
  bannerText.value = ''
  const res = await fetch('https://v1.hitokoto.cn/?c=i')
  const data = await res.json()
  for (let i = 0; i < data.hitokoto.length; i++) {
    setTimeout(() => {
      bannerText.value += data.hitokoto[i]
    }, i * 100)
  }
}
watch(() => visibleStore.visibleLoading, (val) => {
  !val && fetchBannerText()
})
</script>

<style lang="less" scoped>
@import '~/assets/styles/components/TheNav.less';
</style>
