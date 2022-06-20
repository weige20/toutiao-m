// 封装3个方法->专门用于操作token
const key = 'wei'
// 设置
export const setToken = (token) => {
  localStorage.setItem(key, token)
}
// 获取
export const getToken = () => localStorage.getItem(key)
// 删除
export const removeToken = () => {
  localStorage.removeItem(key)
}
