// 定义自定义指令
export const imgError = {
  // 当被绑定的元素插入到dom中时
  inserted: function (el, { value }) {
    // 图片加载失败
    el.onerror = function () {
      el.src = value
    }
  }
}
export const fn = {
  inserted() {}
}
