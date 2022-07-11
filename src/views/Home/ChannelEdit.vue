<template>
<div>
  <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <!-- <template #right>
        <van-icon name="cross" size="0.37333334rem" color="white"/>
      </template> -->
    </van-nav-bar>
      <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title ">
        <span>我的频道:
           <span class="small-title">
            {{ !plain ? '点击删除频道' : '点击进入频道' }}
        </span>
        </span>
        <van-button round :plain="plain"  size="mini" type="info" @click="edit" :text="text"></van-button>
      </div>
    </div>
    <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="(obj,index) in userChannelList" :key="obj.id" @click="removeFn({obj,index})">
          <div class="channel-item" >
            {{ obj.name }}
 <!-- 删除的徽标 -->
            <van-badge color="transparent" class="cross-badge" v-if="!plain  && obj.name !== '推荐'">
              <template #content>
                <van-icon
                  name="clear"
                  class="badge-icon"
                  color="#cfcfcf"
                  size="0.32rem"
                />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
      <!-- 更多频道 -->
<div class="more-channel-box">
    <div class="channel-title">
        <span>点击添加更多频道：</span>
    </div>
    <!-- 更多频道列表 -->
    <van-row type="flex">
        <van-col span="6" v-for="obj in unChannelList" :key="obj.id" @click="addFn(obj)">
            <div class="channel-item">{{ obj.name }}</div>
        </van-col>
    </van-row>
</div>
</div>
</template>
<script>
import { getAllChannelAPI } from '@/api'
export default {
  name: 'ChanelEdit',
  props: {
    userChannelList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      allChannelList: [], // 所有频道
      plain: true,
      text: '编辑',
      isActive: true
    }
  },
  computed: {
    unChannelList () {
      const newArr = this.allChannelList.filter(bigObj => {
        const index = this.userChannelList.findIndex(smallObj => {
          return smallObj.id === bigObj.id
        })
        return !(index > -1)
      })
      return newArr
    }
  },
  created () {
    this.getAllChannel()
  },
  methods: {
    edit () {
      this.plain = !this.plain
      this.text = this.plain ? '编辑' : '完成'
    },
    async getAllChannel () {
      const res = await getAllChannelAPI()
      this.allChannelList = res.data.data.channels
    },
    // 新增频道
    addFn (obj) {
      if (this.plain === false) {
        this.$emit('addChannel', obj)
      }
    },
    // 删除频道
    removeFn (obj) {
      if (this.plain === false && obj.obj.name !== '推荐') {
        this.$emit('removeChannel', obj.obj)
      } else { // 进入逻辑
        this.isActive = false
        const { index } = obj
        this.$emit('changeChannel', index)
        this.$emit('close') // 关闭弹窗
      }
    }
  }
}
</script>
<style lang="less" scoped>
.more-channel-box,.my-channel-box{
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
    /*提示文字 */
  }
}
.active {
  color: #007bff !important;;
}
.small-title {
  font-size: 10px;
  color: gray;
}
.channel-btn {
  border: 1px solid #000;
}
.van-button  {
  margin-top: 2px;
  padding: 0 14px;
  line-height: 1;
  height: 22px
}
.channel-item {
  position: relative;
  padding: 5px 8px;
  margin-right: 6px;
  font-size: 14px;
  color: #3a3948;
 background: #f7f8fa;
border-radius: 18px;
text-align: center;
}
/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

</style>
