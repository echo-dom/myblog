<template>
  <div class="users-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="users-box">
        <el-col :span="8">
            <el-card class="box-card">
                <el-form width="30%" ref="userInfoForm" :model="userinfo" label-width="80px">
                    <el-form-item label="用户名:">
                        <span>{{userinfo.username}}</span>
                    </el-form-item>
                    <el-form-item label="邮箱:">
                        <span>{{userinfo.email}}</span>
                    </el-form-item>
                    <el-form-item label="手机号:">
                        <span>{{userinfo.phone}}</span>
                    </el-form-item>
                    <el-form-item label="角色:">
                        <span>{{userinfo.role == 'normal' ? '普通用户' : '超级管理员'}}</span>
                    </el-form-item>
                    <el-form-item label="状态:">
                        <span>{{userinfo.state ? '启用' : '已关闭'}}</span>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import '../../../assets/css/userslist.less'
export default {
  data(){
    return {
      userinfo:{},

    }
  },
  methods:{
    // 获取用户列表
    // 获取当前登录用户信息
    async getData(){
      let token = window.sessionStorage.getItem('token');
      if (token) {
        let userinfo = await this.$axios.post('api/getLoginInfo',{});
        this.userinfo = userinfo.data; 
      }
    },
    // async getData(){
    //   let userinfo = await this.$axios.get('api/getUsersList');
    //   this.userinfo = userinfo.data; 
    // }
  },
  created(){
    this.getData();
  }
}
</script>

<style>

</style>