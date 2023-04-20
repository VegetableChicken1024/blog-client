import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
export const useAdminStore = defineStore("admin", () => {
  const router = useRouter();
  const isCollapse = ref(false);
  const updateIsCollapse = (newVal: boolean) => {
    isCollapse.value = newVal;
  };
  // 是否有权限访问
  const hasPermission = ref(false);
  const password = ref("123456");
  const showPasswordPrompt = () => {
    ElMessageBox.prompt("请输入密码", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    })
      .then(({ value }) => {
        if (value !== password.value) {
          ElMessageBox.confirm("密码错误，是否重新输入？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => showPasswordPrompt())
            .catch(() => router.push("/"));
        }
      })
      .catch(() => {
        if (process.server) return;
        router.push("/");
      });
  };
  return {
    isCollapse,
    updateIsCollapse,
    hasPermission,
    showPasswordPrompt,
  };
});
