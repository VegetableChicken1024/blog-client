<template>
  <div :style="maskMoveStyle" :class="{mask_wrapper: true, open: visible}" @click="emits('close')" />
</template>

<script lang="ts" setup>
import { StyleValue } from 'vue'
const props = defineProps<{visible: boolean, transform?: {
  direction: 'column' | 'row'
  instance: number
  delay: number
}}>()
const emits = defineEmits<{(event: 'close'): void}>()
// mask出现时，阻止body滚动
watch(() => props.visible, (val) => {
  window.document.documentElement.style.overflow = val ? 'hidden' : 'auto'
  // body
  window.document.body.style.overflow = val ? 'hidden' : 'auto'
})
// 蒙层移动的样式
const maskMoveStyle = computed<StyleValue>(() => {
  if (props.transform) {
    if (props.visible) {
      return {
        transform:
        props.transform.direction === 'column'
          ? `translateY(${props.transform.instance}px)`
          : `translateX(${props.transform.instance}px)`,
        transition: `all ${props.transform.delay}ms`
      }
    } else {
      return {
        transition: `all ${props.transform.delay}ms`
      }
    }
  }
  return {}
})
</script>

<style lang="less" scoped>
.mask_wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  opacity: 0;
  visibility: hidden;
  top: 0;
  left: 0;
  transition: all 0.5s;
  &.open {
    opacity: 1;
    visibility: visible;
  }
}
</style>
