<template>
  <div class="home">
            <!-- 头部导航器nav -->
            <el-header class="essay-header" >
                <el-row class="header essay-container">
                    <!-- 主页logo -->
                    <el-col :lg="6" :sm="24" :xs="24"  :span="6">
                        <img src="../../../assets/images/logo.png" alt="">
                    </el-col>

                    <!-- 导航区 -->
                    <el-col  :lg="18" :sm="24" :xs="24"  :span="18">
                        <ul class="head-nav">
                            <li @click="toPath('/')"><i class="el-icon-house"> 首页</i> </li>
                            <li @click="addEssay"> 添加文章 </li>
                            <li><i class="el-icon-collection-tag"> 标签</i> </li>
                            <li><i class="el-icon-money"> 分类</i> </li>
                            <li><i class="el-icon-link"> 友链</i> </li>
                            <li><i class="el-icon-bank-card"> 留言板</i> </li>
                            <li><i class="el-icon-user"> 关于</i> </li>
                            <li @click="toPath('/login')">登录</li>
                            <li @click="toPath('/register')">注册</li>
                        </ul>
                    </el-col>

                    <!-- 登录注册区
                    <div>
                        <ul>
                        </ul>
                    </div> -->
                </el-row>
            </el-header>
            <el-row  class="essay-container">
                <el-col :lg="24" :sm="24" :xs="24" :span="24">
                <!-- main区 -->
                    <el-card>
                        <el-col class="essay-title" :span="24"> 
                                <h2>{{essayObj.title}}</h2>
                                <ul class="card-info">
                                    <li><i class="el-icon-user"> 作者 {{essayObj.creater}}</i> </li>
                                    <li><i class="el-icon-time"> 发表于 {{formatDate(essayObj.date)}}</i> </li>
                                    <li><i class="el-icon-money"> 分类 Python</i> </li>
                                    <li><i class="el-icon-view"> 阅读量 {{essayObj.essayView}}</i> </li>
                                    <li><i class="el-icon-chat-dot-round"> 评论数 23</i> </li>
                                </ul>
                        </el-col>
                        <el-col :span="24">
                            <div class="ql-container ql-snow">
                                <div class="ql-editor" v-html="essayObj.content">
                                </div>
                            </div>
                        </el-col>
                    </el-card>
                </el-col>
            </el-row>
            <!-- 返回顶部 -->
            <el-backtop ></el-backtop>
  </div>
</template>
<script>
    import '../../../assets/css/showEssay.less'
import {formatTime} from '../../../components/tools/formatdate.js'

export default {
    name: 'Login',
    props:[],
  data () {
    return {
        // 文章对象
        essayObj:{},
        scrollEl: "",
        form: {}
    }
  },
  computed: {
 
  },
  methods: {
      
    //   根据id查找文章
      async getData(){
        // 通过sessionStorage 传送文章id
        let essayObjId = window.sessionStorage.getItem("essayId")
        let essayObj = await this.$axios.post('api/getEssayById',{_id:essayObjId});
        this.essayObj = essayObj.data;
    },
    // 添加文章
    addEssay () {
        this.$router.push('/editEssay')
    //   this.EssayDialogVisible = true
    },
    // 格式化时间格式
    formatDate(date){
       return formatTime(date)
    },
    // 跳转
    toPath (path) {
      this.$router.push({ path: path })
    },
  },
  created () {
    this.getData();
  }
}
</script>

<style lang="less" scoped>
.essay-content{
    white-space: pre-line
}
</style>
