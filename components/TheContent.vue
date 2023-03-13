<template>
  <article :class="{ mounted: isMounted }">
    <div class="notice">
      <SvgIcon name="leaf" style="float: left; margin-right: 5px" />
      <span>{{ contentText }}</span>
    </div>
    <main>
      <h1>{{ titleText }}</h1>
      <div
        class="article_list_wrapper"
        @click="router.push({ path: `/detail/1` })"
      >
        <div class="article_list">
          <div class="article_left">
            <img src="@/assets/images/test.jpg" alt="">
          </div>
          <div class="article_right">
            <h1 class="title">
              <span class="top">[置顶]</span>
              {{ '测试标题' }}
            </h1>
            <div class="time">
              <SvgIcon name="time" color="#989898" />
              <span>{{ '2023-03-08' }}</span>
            </div>
            <div class="describe">
              <p>
                {{ '测试描述' }}
              </p>
            </div>
          </div>
        </div>
        <hr>
      </div>
      <div class="more_button">
        <span>加载更多</span>
      </div>
    </main>
  </article>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ titleText?: string; contentText: string }>(), {
  titleText: '',
  contentText: ''
})
const router = useRouter()
const isMounted = ref(false)
onMounted(() => {
  setTimeout(() => {
    isMounted.value = true
  }, 1000)
})
</script>

<style lang="less" scoped>
@import '~/assets/styles/components/TheContent.less';
</style>
