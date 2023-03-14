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

// 控制页面滚动
export const disableScroll = (visible: boolean) => {
  if (visible) {
    window.document.documentElement.style.overflow = 'hidden';
    window.document.body.style.overflow = 'hidden';
  } else {
    window.document.documentElement.style.overflow = 'auto';
    window.document.body.style.overflow = 'auto';
  }
};