<template>
  <div class="wrapper">
    <nav>
      <div class="mask">
        <span>{{ '测试标题' }}</span>
      </div>
    </nav>
    <main v-html="html" />
  </div>
</template>

<script setup lang="ts">
import { parse } from './markdownPreview'
const str =
    'hello world\n```javascript\nfunction(){\n\tconsole.log(123)\n}\n```'
const html = parse(str)
</script>

  <style scoped lang="less">
  .wrapper {
    nav {
      height: 300px;
      // TODO: 高度媒体查询
      width: 100%;
      background: url('~/assets/images/testTop.jpg') center center / cover
        no-repeat;
      position: relative;
      overflow: hidden;
      left: 0;
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 24px;
        font-weight: bold;
        color: #fff;
      }
    }
    main {
      width: 90%;
      margin: 0 auto;
      font-size: 16px;
    }
  }
  </style>
