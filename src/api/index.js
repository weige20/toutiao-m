import request from '@/utils/request'
// 接口方法, 只负责调用一个接口, 返回一个Promise对象
export const getAllChannelAPI = () => request({
  url: '/v1_0/channels'
})
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})
