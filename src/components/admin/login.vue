<template>
   <div>
    <el-form :model="userFrom" class="login-box" :rules="loginRules" ref="loginRuleForm">
      <el-form-item label="用户名" prop="username">
          <el-input v-model="userFrom.username" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userFrom.password" ></el-input>
      </el-form-item>
      <!-- <el-button type="danger" @click="Register">注册</el-button> -->
      <el-button type="danger" @click="toRegister">去注册...</el-button>
      <el-button type="primary" @click="Login">登录</el-button>
    </el-form>
   </div>
</template>

<script>

export default {
  
  name: 'Login',
  data () {
    return {
      userFrom:{
        password: '',
        username: '',
      },
       loginRules: {
          password: [
            { required: true,message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 15 个字符', trigger: 'blur' }

          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }

          ],
        }
    }
  },
  methods: {
    // Register () {
    //   this.$axios.post('api/register', { password: this.password, username: this.username }).then(res => {
    //     console.log(res)
    //     if (res.data.status !== 200) {
    //        this.$message.error('注册失败,' + res.data.msg)
    //        return
    //     } else if (res.data.status == 200) {
    //       this.$message.success('注册成功')
    //        return
    //     }
    //   })
    // },
    toRegister(){
      this.$router.push('/register');
    },
    Login () {
      this.$refs['loginRuleForm'].validate(valid => {
        if(valid) {
            this.$axios.post('api/login', { ...this.userFrom }).then(res => {
              console.log(res)
              if (res.data.status !== 200) {
                this.$message.error(res.data.msg)
                return
              } else if (res.data.status == 200) {
                this.$message.success('登录成功');
                // 登录成功后将token 保存到sessionStorage中，token只应该在当前窗口打开时生效,所有不应该设置为localStorage中
                window.sessionStorage.setItem('token',res.data.token);
                this.$router.push('/admin')
                return
              }
            })
          }
        }
    )}
  }
}
</script>

<style lang="less" scoped>
.login-box{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 200px auto;
  width: 20%;
  padding: 20px;

}

</style>
