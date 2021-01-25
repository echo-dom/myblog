<template>
   <div>
    <el-form class="register-box" :model="userFrom" :rules="registerRules" ref="registerRuleForm">
      <el-form-item label="用户名" prop="username">
          <el-input v-model="userFrom.username" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userFrom.password" ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
          <el-input  v-model="userFrom.email" ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
          <el-input  v-model="userFrom.phone" ></el-input>
      </el-form-item>
      <el-button type="danger" @click="Register">注册</el-button>
      <el-button type="primary" @click="toLogin">去登录...</el-button>
    </el-form>
   </div>
</template>

<script>
var validPassword = (rule,value,callback)=>{
    if (value.length == 0) {
      callback(new Error('请输入密码'))
      return false;

    } else {

      let reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      if(!reg.test(value)){
        callback(new Error('密码必须是由6-16位字母+数字组合'))
        return false;

      }else{
          callback()
          return false;

      }
    }
  };
export default {
  name: 'Register',
  data () {
    return {
        userFrom:{
            password: '',
            username: '',
            email: '',
            phone: '',
        },
        registerRules: {
          password: [
            { required: true,validator:validPassword,  trigger: 'blur' },
          ],
          phone: [
            { required: false,message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在 11 ', trigger: 'blur' }

          ],
          email: [
            { required: true,message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }

          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }

          ],
        }
      
    }
  },
  methods: {
    //   登录
    toLogin(){
      this.$router.push('/login')
    },
    //   注册
    Register () {
      // console.log(this.userFrom);
      this.$refs['registerRuleForm'].validate(valid => {
        if(valid) {
          this.userFrom.phone = parseInt(this.userFrom.phone);
          this.$axios.post('api/register', { ...this.userFrom }).then(res => {
            console.log(res)
            if (res.data.status !== 200) {
              this.$message.error('注册失败,' + res.data.msg)
              return
            } else if (res.data.status == 200) {
                this.$message.success('注册成功')
                this.$router.push('/login');
                return
              }
          })
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.register-box{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 200px auto;
    width: 20%;
    padding: 20px;
}

</style>
