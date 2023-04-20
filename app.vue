<template>
  <NuxtLayout :name="layoutName">
    <NuxtPage :keepalive="{}" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const route = useRoute();
const layoutName = computed(() => {
  if (route.path.includes("admin")) return "admin";
  return "client";
});
</script>
