<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.push('/search')"
        fixed
      />
    </div>
    <!-- 搜索结果 -->
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
:immediate-check="false"
>
 <ArticleItem v-for="item in articleList" :key="item.
art_id" :obj="item" :isShow="false" @click.native="$router.push(`/article_detail?aid=${item.art_id}`)"></ArticleItem>
</van-list>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { searchResultListAPI } from '@/api'
import { timeAgo } from '@/utils/date'
export default {
  name: 'SearchResult',
  components: {
    ArticleItem
  },
  data () {
    return {
      page: 1,
      articleList: [], // 文章数据
      loading: false,
      finished: false
    }
  },
  created () {
    this.getSearchResultList()
  },
  methods: {
    async getSearchResultList () {
      const res = await searchResultListAPI({
        page: this.page,
        q: this.$route.params.keywords // 拿到关键词, keywords来源于router/index.js你定义的动态路由参数名
      })
      // 数据预处理
      res.data.data.results.forEach((obj) => {
        obj.pubdate = timeAgo(obj.pubdate)
      })
      // 数据全部加载完成
      if (res.data.data.results.length === 0) {
        this.finished = true
        return
      }
      this.articleList = [...this.articleList, ...res.data.data.results]
      // 加载状态结束
      this.loading = false
    },
    // 下拉加载更多
    onLoad () {
      if (this.articleList.length > 0) {
        this.page++
        this.getSearchResultList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
