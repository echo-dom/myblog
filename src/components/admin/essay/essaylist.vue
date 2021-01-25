<template>
  <div class="users-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="users-box">
      <!-- 输入框+搜索框 -->
      <el-col :sm="24" :lg="24" class="users-seacher">
        <el-input placeholder="请输入搜索内容"></el-input>
        <el-button><i class="el-icon-search"></i></el-button>
      </el-col>

        <!-- 表格展示 -->
        <el-col :sm="24" :lg="24">
        <el-table
        :data="essaylist"
        border
        stripe
        style="width: 100%">
          <el-table-column
            prop="_id"
            label="文章id"
            width="0">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="180">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="content"
            label="文章内容"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="创作时间"
            width="180">
            <template slot-scope="{row}">
                {{formatDate(row.date)}}
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="phone"
            label="电话"
            width="180">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            width="180">
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
          </el-table-column>-->
          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="{row}">
              <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
              <el-button size="mini" type="danger" @click="deleteEssay(row)" icon="el-icon-delete"></el-button>
            </template> 
          </el-table-column>
      </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import '../../../assets/css/userslist.less'
import {formatTime} from '../../tools/formatdate.js'

export default {
  data(){
    return {
      essaylist:[],
      content: "",
      editorOption: {}
    }
  },
  methods:{

    
    // // 改变用户状态
    // async toggleState(row){
    //  let res =  await this.$axios.post('api/editUsers',{...row})
    //  if (res){
    //    return
    //  } else {
    //    console.log(res.data.msg);
    //  }

    // },
    // 删除文章
     deleteEssay(row){
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let res =  await this.$axios.post('api/deleteEssay',{...row})
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

    // 格式化时间格式
    formatDate(date){
       return formatTime(date)
    },
    
    

    // 获取文章列表
    async getData(){
      let essaylist = await this.$axios.get('api/essayList');
      this.essaylist = essaylist.data; 
    }
  },
  created(){
    this.getData();
  }
}
</script>

<style>

</style>