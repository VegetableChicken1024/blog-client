import { defineStore } from "pinia";
import { ref } from "vue";

export const usePublicStore = defineStore(
  "public",
  () => {
    const icons = ref<Record<string, any>>({});
    const fetchIcons = () => {
      const i = Object.fromEntries(
        Object.entries(
          import.meta.glob("../assets/icons/*.svg", { as: "raw" })
        ).map(([key, value]) => {
          const filename = key.split("/").pop()!.split(".").shift();
          return [filename, value];
        })
      );
      icons.value = i;
    };
    const theme = ref("light");
    const toggleTheme = () => {
      theme.value = theme.value === "light" ? "dark" : "light";
    };
    return {
      icons,
      fetchIcons,
      theme,
      toggleTheme,
    };
  },
  { persist: { paths: ["theme"] } }
);
