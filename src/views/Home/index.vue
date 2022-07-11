<template>
<div>
    <!-- 头部 -->
  <div>
  <van-nav-bar fixed>
   <template #left>
    <!-- <img class="logo" src="../../assets/toutiao_logo.png" alt="" /> -->
    <h1>头条</h1>
  </template>
  <template #right>
    <van-icon name="search" size="0.48rem" color="#fff"   @click="$router.push('/search')"/>
  </template>
</van-nav-bar>
</div>
<!-- Tab栏 -->
<!-- 频道部分 -->
<div>
  <van-tabs v-model="channelId" :name="channelId" animated swipeable title-active-color="#000" sticky offset-top="1.226667rem">
  <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
  <ArticleList :channelId="item.id"></ArticleList>
  </van-tab>
</van-tabs>
</div>
<!-- 编辑频道图标 -->
<van-icon name="wap-nav" size="0.37333334rem" class="moreChannels" @click="show = true"/>
 <!-- 弹出层组件 -->
    <van-popup v-model="show" position="left"  closeable  close-icon="close"   class="edit_wrap" @closed="onPopupClosed">
      <!-- 弹出层的主体区域 -->
      <channel-edit :userChannelList="channelList" @close="show = false"  @addChannel="addChannelFn" @removeChannel="removeChannel" @changeChannel="channgeChannelFn" ref="channelEdit"></channel-edit>
    </van-popup>
</div>
</template>
<script>
// import logoPng from '../../assets/toutiao_logo.png'
import { getUserChannelAPI, updateChannelAPI } from '@/api'
import ArticleList from '@/components/ArticleList.vue'
import ChannelEdit from '@/views/Home/ChannelEdit.vue'
export default {
  name: 'Home-',
  data () {
    return {
      show: false, // 编辑频道弹出层显示
      channelId: 0, // 频道ID(默认0是推荐)
      // imgObj: logoPng,
      channelList: [] // 频道数据
    }
  },
  created () {
    this.getChannelList()
  },
  methods: {
    async getChannelList () {
      try {
        const res = await getUserChannelAPI()
        const { channels } = res.data.data
        this.channelList = channels
      } catch (error) {
        console.log(error)
      }
    },
    addChannelFn (obj) {
      this.channelList.push(obj)
      this.updateChannel()
    },
    // 统一更新频道
    async updateChannel () {
      // 先拷贝一份数组(前端页面用channelList, 后端用拷贝出的数组)
      // 数组第一层, 对象里key+value是第二层
      const newArr = this.channelList.map(obj => {
        const newObj = { ...obj }
        return newObj
      })
      // console.log(newArr)
      // 先剔除推荐
      const index = newArr.findIndex(obj => obj.name === '推荐')
      newArr.splice(index, 1)
      // 转换字段
      newArr.forEach((obj, index) => {
        delete obj.name
        obj.seq = index + 1
      })
      // 调用接口
      await updateChannelAPI({
        channels: newArr
      })
    },
    // 删除频道
    async removeChannel (obj) {
      // 找到这个频道在数组下标删除
      const ind = this.channelList.findIndex(item => item.id === obj.id)
      this.channelList.splice(ind, 1)
      this.updateChannel()
    },
    onPopupClosed () {
      this.$refs.channelEdit.plain = true
      this.$refs.channelEdit.text = '编辑'
    },
    // 切换频道
    channgeChannelFn (index) {
      this.channelId = index // 传过来的频道ID, 影响tabs默认v-model的选择
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  }
}
</script>
<style lang="less" scoped>
.logo {
    width: 100px;
    height: 30px;
}
/* tab内容距离tab导航的距离 */
/deep/ .van-tabs__content{
    padding-top: 44px;
}
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
/* 频道编辑弹出层铺满屏幕 */
.edit_wrap{
  width: 100%;
  height: 100%;
}
</style>
