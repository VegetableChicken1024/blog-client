<template>
  <el-scrollbar style="background: #191a20" :view-style="{ width: '160px' }">
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
        <el-sub-menu
          :index="String(index)"
          v-show="route.children && route.children.length"
        >
          <template #title>
            <el-icon size="1.2rem"><component :is="route.icon" /></el-icon>
            <span>{{ route.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(child, childIndex) in route.children"
              :key="index + '_' + childIndex"
              :index="index + '_' + childIndex"
              @click="
                (e) => {
                  handleClick(e, index);
                }
              "
              >{{ child.title }}</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAdminStore } from "~/stores/admin.store";
import { storeToRefs } from "pinia";
import { MenuItemRegistered } from "element-plus";
import { routes } from "./route";
const adminStore = useAdminStore();
const { isCollapse } = storeToRefs(adminStore);
const router = useRouter();
const menuList = routes;
const defaultActive = ref("0");
const handleClick = (e: MenuItemRegistered, index: number) => {
  let path = "";
  if (e.index.includes("_")) {
    // 子菜单
    const arr = e.index.split("_");
    path = menuList[Number(arr[0])].children[Number(arr[1])].path;
  } else {
    path = menuList[index].path;
  }
  router.push(path);
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
