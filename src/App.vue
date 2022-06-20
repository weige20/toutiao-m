<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getAllChannelAPI } from '@/api/index'
export default {
  name: 'App',
  data () {
    return {
      ChannelList: []
    }
  },
  created () {
    this.getAllChannel()
  },
  methods: {
    async getAllChannel () {
      const { data: { data: res } } = await getAllChannelAPI()
      this.ChannelList = res.channels
    }
  }
}
</script>

<style scoped lang="less">

</style>
