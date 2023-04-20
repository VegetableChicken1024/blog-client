<template>
  <el-scrollbar style="background: #191a20" :view-style="{ width: '150px' }">
    <el-menu
      class="menu-height"
      :default-active="defaultActive"
      :collapse="isCollapse"
      :unique-opened="true"
      background-color="#191a20"
      text-color="#bdbdc0"
      active-text-color="#ffffff"
    >
      <template v-for="(route, index) in menuList" :key="route.path">
        <el-menu-item
          v-show="!route.children || route.children.length === 0"
          :index="String(index)"
          @click="
            (e) => {
              handleClick(e, index);
            }
          "
        >
          <el-icon size="1.2rem"><component :is="route.icon" /></el-icon>
          <span>{{ route.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAdminStore } from "~/stores/admin.store";
import { storeToRefs } from "pinia";
import { MenuItemRegistered } from "element-plus";
import { Document, HomeFilled } from "@element-plus/icons-vue";
const adminStore = useAdminStore();
const { isCollapse } = storeToRefs(adminStore);
const router = useRouter();
const menuList = [
  {
    title: "首页",
    icon: HomeFilled,
    path: "/admin",
    children: [],
  },
  {
    title: "文章管理",
    icon: Document,
    path: "/admin/article",
    children: [],
  },
];
const defaultActive = ref("0");
const handleClick = (e: MenuItemRegistered, index: number) => {
  router.push(menuList[index].path);
};
watch(
  () => router.currentRoute.value.path,
  (path) => {
    const index = menuList.findIndex((item) => item.path === path);
    defaultActive.value = String(index);
  },
  { immediate: true }
);
</script>
<style scoped lang="less">
:deep(.el-menu-item-group__title) {
  display: none;
}
.text-animation {
  transition: all 0.28s linear;
}
.aside-title {
  height: 50px;
  background: #191a20;
  color: #bdbdc0;
  border-bottom: 1px solid #282a35;
}
</style>
