<template>
<div>
<van-nav-bar fixed>
   <template #left>
    <!-- <img class="logo" src="../../assets/toutiao_logo.png" alt="" /> -->
    <img class="logo" :src="imgObj"/>
  </template>
  <template #right>
    <van-icon name="search" size="18" />
  </template>
</van-nav-bar>
</div>
</template>
<script>
export default {
  name: 'Home-'
}
</script>
<style lang="less" scoped>

</style>
