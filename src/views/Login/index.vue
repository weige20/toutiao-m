<template>
<div class="Login">
<van-nav-bar
  title="标题"
/>
<van-form @submit="onSubmit">
  <van-field
    v-model="formLogin.mobile"
    type="tel"
    label="手机号"
    placeholder="请输入手机号"
    required
    :rules="[{ required: true, message: '请填写手机号', trigger: 'onChange', pattern: /^1[3456789]\d{9}$/  }]"
  />
  <van-field
    v-model="formLogin.code"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :rules="[{ required: true, message: '请填写密码', trigger: 'onChange', pattern: /^\d{6}$/ }]"
      />
      <div style="margin: 16px;">
        <van-button  round  block type="info" native-type="submit"
            :loading="isLoding"
            :disabled="isLoding"
            loading-text="程序员拼命加载ing...">登录</van-button>
      </div>
</van-form>
</div>
</template>
<script>
import { setToken } from '@/utils/token'
import { loginAPI } from '@/api'
export default {
  neme: 'Login',
  data () {
    return {
      formLogin: {
        mobile: '13888888888',
        code: '246810' // 默认只能用246810后台规定了
      },
      // ...省略其他
      isLoding: false // 加载状态
    }
  },
  methods: {
    async  onSubmit () {
      this.isLoding = true
      try {
        const res = await loginAPI(this.formLogin)
        const { token } = res.data.data
        // console.log(token)
        // console.log(refresh_token)
        this.isLoding = false
        setToken(token)
        // 成功通知
        this.$notify({ type: 'success', message: '登录成功', duration: 1000 })
        this.$router.replace('/layout')
      } catch (err) {
        this.isLoding = false
        // setInterval(() => {
        //   this.isLoding = false
        // }, 5000)
        this.$notify({ type: 'danger', message: '登录失败', duration: 1000 })
        // this.$toast('登录失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
