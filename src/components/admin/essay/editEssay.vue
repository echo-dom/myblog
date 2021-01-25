<template>
  <div class="editEssay-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="editEssay-box">
        <el-col  :span="24" style="margin-bottom:50px"> 
            <el-row :gutter="6">
                <el-col class="essay-title-box" :span="16">
                <h2 class="essay-title">文章标题:</h2>
                <el-input v-model="essayObj.title"></el-input>
                </el-col>
                <el-col :span="4" style="margin-top:31px">
                    <el-button @click="essayAdd">发布文章</el-button>
                </el-col>
            </el-row>
        </el-col>
        <el-col class="essay-content" :span="24">
            <h2 class="essay-title">文章内容:</h2>
            <quill-editor ref="myTextEditor" v-model="essayObj.content" :options="editorOption" style=" margin-bottom: 60px;"></quill-editor>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import '../../../assets/css/editEssay.less'

export default {
  data(){
    return {
      essaylist:[],
      content: "",
      editorOption: {},
      essayObj:{}
    }
  },
  methods:{
    // 添加文章
    essayAdd () {
        const date = new Date().getTime();
        const data = { ...this.essayObj };
        let creater = window.sessionStorage.getItem('token')
        data.date = date;
        data.creater = creater;
        this.$axios.post('api/essayAdd', { articleInformation: { ...data } }).then((res) => {
            this.$router.push('/')
        })
    },
  },
  created(){
    // this.getData();
  }
}
</script>

<style>

</style>