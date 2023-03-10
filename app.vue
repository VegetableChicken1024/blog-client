<template>
  <div>
    <SvgIcon name="notice" />
  </div>
</template>

<script setup lang="ts">
import { usePublicStore } from './stores/public.store'
import SvgIcon from './components/SvgIcon.vue'
const publicStore = usePublicStore()
publicStore.fetchIcons()
</script>
