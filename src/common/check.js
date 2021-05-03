const checkEmail = (rule, value, callback) => {
  const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (regEmail.test(value)) {
    return callback()
  }
  callback(new Error('请输入合法的邮箱'))
}

const checkMobile = (rule, value, callback) => {
  const regEmail = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (regEmail.test(value)) {
    return callback()
  }
  callback(new Error('请输入合法的手机号'))
}

export { checkEmail, checkMobile }
