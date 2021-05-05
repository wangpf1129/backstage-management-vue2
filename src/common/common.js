// 共用的函数方法
export const showMessageTips = function (res, status, message, fn) {
  if (res.meta.status !== status) { return message.error(`${res.meta.msg}`) }
  message.success(`${res.meta.msg}`)
  fn()
}
