// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@element-plus/nuxt'],
  css: [
    '~/assets/styles/common.less',
    '~/assets/styles/variables.less',
    '~/assets/styles/markdown.less'
  ],
  elementPlus: { /** Options */ }
})
