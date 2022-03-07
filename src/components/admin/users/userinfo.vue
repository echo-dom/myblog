<template>
    <div class="users-container">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="users-box">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :span="6">
                <el-card class="box-card">
                    <div>
                        <div class="user-infor">个人信息</div>
                    </div>
                    <div class="user-div-avatar">
                        <el-image class="user-avatar" style="width: 100px; height: 100px" @click="uploadAvatar" :src="require(`../../../../public/upload/${userinfo.Image}`)"></el-image>
                    </div>
                    <el-form class="userInfo-form" ref="userInfoForm" :model="userinfo" label-width="80px" align="right">
                        <el-form-item label="用户昵称:">
                            <span>{{userinfo.username}}</span>
                        </el-form-item>
                        <el-form-item label="用户邮箱:">
                            <span>{{userinfo.email}}</span>
                        </el-form-item>
                        <el-form-item label="联系方式:">
                            <span>{{userinfo.phone}}</span>
                        </el-form-item>
                        <el-form-item label="用户角色:">
                            <span>{{userinfo.role == 'normal' ? '普通用户' : '超级管理员'}}</span>
                        </el-form-item>
                        <el-form-item label="用户状态:">
                            <span>{{userinfo.state ? '启用' : '已关闭'}}</span>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="45%">
            <el-upload :before-upload="beforeUpload" class="upload-demo" drag action="http://localhost:7000/api/uploadavatar"  multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script>
    import '../../../assets/css/userslist.less'
    import '../../../assets/css/userinfo.less'
    export default {
        data() {
            return {
                userinfo: {
                    Image:"default.jpg"
                },
                dialogVisible: false,

            }
        },
        methods: {
            // 获取用户列表
            // 获取当前登录用户信息
            async getData() {
                let token = window.sessionStorage.getItem('token');
                if (token) {
                    let userinfo = await this.$axios.post('api/getLoginInfo', {});
                    this.userinfo = userinfo.data;
                }
            },
            // 上传前
            beforeUpload(file){
                const timeStamp = new Date() - 0;
                var that = this;
                const copyFile = new File([file], `${timeStamp}.${that.getFileExt(file.name)}`);
                this.uploadFile(copyFile);
                return false
            },
            getFileExt(fileName){ // 返回原文件类型 例如： png txt xml
                var fileExt = fileName.split(".");
                if( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
                    return "";
                }
                return fileExt.pop(); // 方法用于删除数组的最后一个元素并返回删除的元素
            },
            // 构建一个 FormData 对象，仅此而已！
            uploadFile(file) {
                const formdata = new FormData()
                formdata.append('lbf-file-upload', file)
                formdata.append('name', 'lbf-file-upload')
                formdata.append('email', this.userinfo.email)
                this.postForm(formdata)
            },
            postForm(formdata) {
            this.$axios.post('api/uploadavatar', formdata).then(res => {
                if (res.code == null || res.code === 0) {
                // do something
                this.$message.success('文件上传成功')
                this.getData();
                this.dialogVisible = false;
                } else {
                this.$message.error(res.msg || res.message || '文件上传失败')
                }
            }).catch((err) => {
                this.$message.error(err.message || '文件上传失败')
            })
            },
            uploadAvatar() {
                this.dialogVisible = true;
                console.log(111)
            },
        },
        created() {
            this.getData();
        }
    }
</script>
<style lang="less" scoped>
</style>