<template>
  <div>
    <LazyTheNav />
    <LazyTheContent title-text="近况" :content-text="welcomeText" />
  </div>
</template>

<script lang="ts" setup>
const welcomeText = '莫等闲、白了少年头，空悲切。'
</script>
