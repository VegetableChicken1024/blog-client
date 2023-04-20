<template>
  <el-menu class="full-width" mode="horizontal" :ellipsis="false">
    <div class="row justify-start items-center pa-md hover">
      <el-icon size="22px" @click="handleClick">
        <expand v-show="isCollapse" /><fold v-show="!isCollapse" />
      </el-icon>
    </div>
  </el-menu>
</template>

<script setup lang="ts">
import { useAdminStore } from "~/stores/admin.store";
import { storeToRefs } from "pinia";
import { Expand, Fold } from "@element-plus/icons-vue";
const adminStore = useAdminStore();
const { isCollapse } = storeToRefs(adminStore);
const handleClick = () => {
  adminStore.updateIsCollapse(!isCollapse.value);
};
</script>

<style lang="less">
.full-width {
  width: 100%;
}
.row {
  display: flex;
  flex-direction: row;
}
.justify-start {
  justify-content: start;
}
.items-center {
  align-items: center;
}
.pa-md {
  padding: 14px;
}
.hover {
  cursor: pointer;
}
.flex-grow {
  flex-grow: 1;
}
</style>
