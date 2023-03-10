<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const a = ref(1)
onMounted(() => {
  console.log(a.value, '123')
})
</script>
