// 判断微信环境
export const isWechat = () => {
  return /MicroMessenger/i.test(window.navigator.userAgent)
}

// 获取滚动对象
export const getScrollElement = () => {
  return document.documentElement.scrollTop && !isWechat()
    ? document.documentElement
    : document.body
}
