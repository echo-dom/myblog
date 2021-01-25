<template>
  <div class="users-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="users-box">
      <!-- 输入框+搜索框 -->
      <el-col :sm="24" :lg="24" class="users-seacher">
        <el-input placeholder="请输入搜索内容"></el-input>
        <el-button><i class="el-icon-search"></i></el-button>
        <!-- <el-upload
          class="avatar-uploader"
          :action="Url"
          :headers='headers'
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->

      <!-- 添加用户 -->
        <!-- <el-button type="primary" class="add-user" @click="addUser">添加用户</el-button> -->

      </el-col>

        <!-- 表格展示 -->
        <el-col :sm="24" :lg="24">
        <el-table
        :data="userslist"
        border
        stripe
        style="width: 100%">
          <el-table-column
            prop="_id"
            label="id"
            width="0">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            width="180">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            width="180">
            <template slot-scope="{row}">
              <span>{{row.role == 'normal' ? '普通用户' : '超级管理员'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="180">
            <template slot-scope="{row}">
              <el-switch
                @change="toggleState(row)"
                v-model="row.state"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="{row}">
              <el-button size="mini" type="primary" @click="getEditInfo(row)" icon="el-icon-edit"></el-button>
              <el-button size="mini" type="danger" @click="deleteUsers(row)" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
      </el-table>
      </el-col>
    </el-row>

    <!-- 修改用户信息 -->
    <el-dialog
    title="当前用户信息"
    :visible.sync="LoginInfoDialogVisible"
    width="30%"
    >
      <el-form width="30%" ref="userInfoFormRef" :model="userinfo" label-width="80px" :rules="userInfoFormRules"  >
          <el-form-item label="用户名:" prop="username">
              <el-input v-model="userinfo.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:" prop="email">
              <el-input v-model="userinfo.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
              <el-input v-model="userinfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="角色:">
            <el-select :disabled="userRole == 'normal' ? true:false" v-model="userInfoRoleValue" placeholder="请选择">
              <el-option
                v-for="item in userInfoRoleSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="状态:">
            <el-select v-model="userInfoStateValue" placeholder="请选择">
              <el-option
                v-for="item in userInfoStateSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="LoginInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upDataUserInfo(userinfo)">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import '../../../assets/css/userslist.less'
export default {
  data(){
    return {
      LoginInfoDialogVisible:false,
      // 用户列表
      userslist:[],
      // 修改的用户信息对象
      userinfo:{},
      // 登录用户角色
      userRole:'',
      // 
      userInfoRoleValue:'',
      // 角色
      userInfoRoleSelect:[{
        value:'normal',
        label:'普通用户',
      },{
        value:'admin',
        label:'超级管理员',
      }],
      // 修改用户信息验证规则对象
      userInfoFormRules: {
        phone: [
          { required: false,message: '请输入手机号码', trigger: 'blur' },
        ],
        email: [
          { required: true,message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }

        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }

        ],
      },
    }
  },
  methods:{
    // handleAvatarSuccess(res, file) {
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //     console.log(this.imageUrl);
    //   },
    //   beforeAvatarUpload(file) {
    //     const isJPG = file.type === 'image/jpeg';
    //     const isLt2M = file.size / 1024 / 1024 < 2;

    //     if (!isJPG) {
    //       this.$message.error('上传头像图片只能是 JPG 格式!');
    //     }
    //     if (!isLt2M) {
    //       this.$message.error('上传头像图片大小不能超过 2MB!');
    //     }
    //     return isJPG && isLt2M;
    // },
    // 添加用户
    // addUser(){
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

    // 改变用户状态
    async toggleState(row){
      let res =  await this.$axios.post('api/editUsers',{...row})
      if (res){
        return
      } else {
        console.log(res.data.msg);
      }
    },
    // 修改用户信息
    upDataUserInfo (row) {
      this.$refs['userInfoFormRef'].validate(valid => {
        if(valid) {
          row.phone = parseInt(row.phone);
          row.role = this.userInfoRoleValue;
          this.$axios.post('api/editUsers', { ...row}).then(res => {
            if (res.data.status !== 200) {
              this.$message.error('修改用户信息失败,' + res.data.msg)
              return
            } else if (res.data.status == 200) {
                this.$message.success('修改用户信息成功')
                this.getData()
                this.LoginInfoDialogVisible = false;
                return
              }
          })
        }
      })
    },
    // 删除用户状态
     deleteUsers(row){
       console.log();
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let res =  await this.$axios.post('api/deleteUsers',{...row})
          if (res){
            this.getData();
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          } else {
            console.log(res.data.msg);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 获取需要修改的用户信息
    async getEditInfo(row){
      let token = window.sessionStorage.getItem('token');
      if (token) {
        let userinfo = await this.$axios.post('api/getEditInfo',{_id:row._id});
        if (userinfo) {
          this.userinfo = userinfo.data;
          this.userInfoRoleValue = this.userinfo.role;
          this.LoginInfoDialogVisible = true;

        }
      }
    },
    // 获取用户列表
    async getData(){
      let userslist = await this.$axios.get('api/getUsersList');
      this.userslist = userslist.data; 
    }
  },
  created(){
    this.userRole = window.sessionStorage.getItem('role');
    this.getData();
  }
}
</script>

<style>

</style>