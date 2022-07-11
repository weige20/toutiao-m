<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
   offset="50"
  @load="onLoad"
:immediate-check="false"
>
   <!-- 文章列表 -->
 <ArticleItem v-for="item in articleList" :key="item.art_id" :obj="item" @dislike="dislikeFn" @reports="reportsFn"   @click.native="$router.push(`/article_detail?aid=${item.art_id}`)"></ArticleItem>
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { articlesListAPI, articleDislikeAPI, articleReportsAPI } from '@/api'
import { timeAgo } from '@/utils/date'
export default {
  props: {
    channelId: {
      type: Number,
      require: true,
      default: 0
    }
  },
  data () {
    return {
      isLoading: false, // 顶部刷新状态
      articleList: [],
      loading: false, // 底部加载状态
      finished: false, // 数据是否全部加载完成
      nextTime: null, // 用于加载更多(分页)
      timeAgo: timeAgo
    }
  },
  components: {
    ArticleItem
  },
  created () {
    this.articlesList()
  },
  methods: {
    async articlesList () {
      const res = await articlesListAPI({
        channelId: this.channelId, // 默认推荐频道(id为0)
        timestamp: this.nextTime
      })
      // 如果无数据
      if (res.data.data.pre_timestamp === null) {
        this.finished = true // 告诉list组件直接底部显示没有更多数据
      } else {
        this.nextTime = res.data.data.pre_timestamp // 保存下一页数据的时间(做分页用)
        this.articleList = [...this.articleList, ...res.data.data.results]
        // 等待网络请求结果后
        this.loading = false // 底部加载更多状态
      }
      this.isLoading = false // 顶部加载状态关闭
    },
    // 底部加载
    onLoad () {
      // 有第一页数据以后, onLoad再发请求
      if (this.articleList.length > 0) {
        // console.log('2')
        this.articlesList()
      }
    },
    // 顶部刷新事件方法
    onRefresh () {
      this.nextTime = null
      this.articleList = []
      this.articlesList()
    },
    // 反馈(不感兴趣)
    async dislikeFn (obj) {
      try {
        await articleDislikeAPI({
          target: obj.art_id
        })
        this.$notify({ type: 'success', message: '反馈成功' })
      } catch (err) {
        this.$notify({ type: 'warning', message: err.response.data.message, duration: 1000 })
      }
    },
    // 反馈(举报)
    async reportsFn (obj, type) {
      try {
        await articleReportsAPI({
          target: obj.art_id,
          type: type,
          remark: '就是其他问题'
        })
        this.$notify({ type: 'success', message: '举报成功' })
      } catch (err) {
        this.$notify({ type: 'warning', message: err.response.data.message, duration: 1000 })
      }
    }
  }
}
</script>
<style></style>
