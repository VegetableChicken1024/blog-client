<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span v-if="icon" class="icon" v-html="icon" />
</template>

<script lang="ts" setup>
import { usePublicStore } from '~~/stores/public.store'
const publicStore = usePublicStore()
const props = defineProps<{name: string}>()
const arr = Object.entries(publicStore.icons).filter((i) => {
  return i[0] === props.name
})
const icon = await arr[0][1]?.().then((res: any) => {
  return res
})

</script>

<style>
.icon {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}
</style>
