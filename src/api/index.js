import request from '@/utils/request'
// 接口方法, 只负责调用一个接口, 返回一个Promise对象
// 获取所有频道列表
export const getAllChannelAPI = () => request({
  url: '/v1_0/channels'
})
// 登录
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})
// 获取用户的频道
export const getUserChannelAPI = () => request({
  url: '/v1_0/user/channels'
})
// 文章 - 获取列表
export const articlesListAPI = ({ channelId, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp: timestamp || +new Date()
    }
  })
}
// 文章 - 不感兴趣
export const articleDislikeAPI = ({ target }) => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target
    }
  })
}
// 文章 - 举报
export const articleReportsAPI = ({ target, type, remark }) => {
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target,
      type,
      remark
    }
  })
}
// 频道 - 更新已选
export const updateChannelAPI = ({ channels }) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
// 搜索 - 联想菜单
export const suggestListAPI = ({ q }) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 搜索 - 结果列表
export const searchResultListAPI = ({ q, page = 1 }) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}

// 文章 - 详情
export const articleDetailAPI = ({ article_id }) => {
  return request({
    // :id是后台规定的参数名
    // 前端要在对应路径位置传值(不要写:)
    url: `/v1_0/articles/${article_id}`
  })
}
// 文章 - 关注作者
export const followedUserAPI = ({ target }) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: target
    }
  })
}
// 文章 - 取消关注作者
export const unFollowedUserAPI = ({ target }) => {
  return request({
    // 这uid只是个变量名, 把值拼接在url发给后台(无需指定参数名)
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
// 文章 - 点赞
export const articleLikeAPI = ({ target }) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: target
    }
  })
}

// 文章 - 取消点赞
export const articleDisLikeAPI = ({ artId }) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}
// 评论 - 获取列表
// offset第一页时, 不用在params携带(axios发现值为null会自动忽略此参数)
export const commentListAPI = ({ source, offset = null, limit = 10 }) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source,
      offset,
      limit
    }
  })
}
// 评论 - 喜欢
export const commentLikingAPI = ({ comId }) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}
// 评论-取消喜欢
export const commentDisLikingAPI = ({ comId }) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}
// 评论 - 发布
export const sendCommentAPI = ({ artId, content }) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: artId,
      content: content
    }
  })
}
// 用户 - 基本资料
export const userInfoAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}
// 用户- 个人资料(就为了获取生日)
export const userProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 用户- 更新头像
// 注意: formObj的值必须是一个表单对象
// '{"a": 10, "b": 20}' // 对象格式的JSON字符串
// new FormData() // 表单对象
export const updatePhotoAPI = (formObj) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: formObj
    // 如果你的请求体内容是表单对象, 浏览器会自动携带请求头Content-Type为multipart/form-data
  })
}
// 用户 - 更新资料
export const updateProfileAPI = ({ birthday, userName }) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      birthday: birthday,
      name: userName
    }
  })
}
