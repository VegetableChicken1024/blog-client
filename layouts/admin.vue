<template>
  <div class="full-width full-height">
    <el-container>
      <el-aside class="aside" :width="isCollapse ? '10px' : '150px'">
        <AsideVue />
      </el-aside>
      <el-container>
        <el-header height="65px">
          <HeaderVue />
        </el-header>
        <el-main class="main">
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import HeaderVue from "./components/Header/index.vue";
import AsideVue from "./components/Aside/index.vue";
import { useAdminStore } from "~/stores/admin.store";
import { storeToRefs } from "pinia";
const adminStore = useAdminStore();
const { isCollapse } = storeToRefs(adminStore);
</script>
<style scoped lang="less">
.aside {
  transition: width 0.28s;
  min-height: 100vh;
  z-index: 1001;
  overflow: hidden;
}
.main {
  padding-top: 0;
  padding-right: 10px;
}
.el-header {
  padding-right: 10px !important;
}
</style>
