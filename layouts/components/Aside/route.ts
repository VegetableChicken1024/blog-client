import * as eIcon from "@element-plus/icons-vue";

export const routes = [
  {
    title: "首页",
    icon: eIcon.HomeFilled,
    path: "/admin",
    children: [],
  },
  {
    title: "文章管理",
    icon: eIcon.Document,
    path: "/admin/article",
    children: [],
  },
  {
    title: "分类管理",
    icon: eIcon.Folder,
    path: "/admin/category",
    children: [],
  },
  {
    title: "标签管理",
    icon: eIcon.PriceTag,
    path: "/admin/tag",
    children: [],
  },
  {
    title: "评论管理",
    icon: eIcon.Comment,
    path: "/admin/comment",
    children: [],
  },
  {
    title: "用户管理",
    icon: eIcon.User,
    path: "/admin/user",
    children: [],
  },
  {
    title: "系统设置",
    icon: eIcon.Setting,
    path: "/admin/setting",
    children: [{ title: "系统参数", path: "/admin/setting/params", icon: "" }],
  },
];
