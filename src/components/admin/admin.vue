<template>
    <el-container class="admin-container">
        <!-- 后台管理头部 -->
        <el-header>
            <!-- left -->
            <div class="admin-header-left">
                <i class="el-icon-setting"></i>
                <span>博客后台管理系统</span>
            </div>
            <!-- right -->
            <div class="admin-header-right">
                <div class="user-avatar">
                    <el-avatar>
                        <el-image v-if="currentUser.Image" class="user-avatar" style="width: 100%;height:100%" :src="require(`../../../public/upload/${currentUser.Image}`)"></el-image>
                        <span v-else>{{currentUser.username}} </span>
                    </el-avatar>
                </div>
                <el-button @click="logout" type="info">退出</el-button>
            </div>
        </el-header>
        <!-- 主题 -->
        <el-container>
            <!-- 左侧菜单栏 -->
            <el-aside :width="isCollapse ? '64px': '200px' " >
                <div class="toggle-botton" @click="toggleCollapse">
                    <i style="height:35px;line-height:35px;font-size:15px" class="el-icon-s-unfold" v-if="!isCollapse"></i>
                    <i style="height:35px;line-height:35px;font-size:15px" class="el-icon-s-fold" v-if="isCollapse"></i>
                </div>
                <!-- 菜单 -->
                <el-menu default-active="2" background-color="#323744" text-color="#fff" active-text-color="#3a9aff" :collapse="isCollapse" :collapse-transition="false" unique-opened router>
                    <!-- 一级菜单 -->
                    <el-submenu index="1">
                        <template slot="title">
                            <!-- icon -->
                            <i class="el-icon-user"></i>
                            <!-- title -->
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="/userslist">
                            <template slot="title">
                                <!-- icon -->
                                <i class="el-icon-s-check"></i>
                                <!-- title -->
                                <span>用户列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/userInfo">
                            <template slot="title">
                                <!-- icon -->
                                <i class="el-icon-s-custom"></i>
                                <!-- title -->
                                <span>个人信息</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/test">
                            <template slot="title">
                                <!-- icon -->
                                <i class="el-icon-s-custom"></i>
                                <!-- title -->
                                <span>测试</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <!-- 二级菜单 -->
                    <el-submenu index="2">
                        <template slot="title">
                            <!-- icon -->
                            <i class="el-icon-s-management"></i>
                            <!-- title -->
                            <span>文章管理</span>
                        </template>
                        <el-menu-item index="/essayList">
                            <i class="el-icon-collection"></i>
                            <span>文章管理</span>
                        </el-menu-item>
                        <el-menu-item index="/editEssay">
                            <i class="el-icon-collection"></i>
                            <span>编辑文章</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主题区 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import '../../assets/css/admin.less'

    export default {
        name: 'Admin',
        data() {
            return {
                isCollapse: false,
                currentUser: {
                    Image:"default.jpg"
                },
            }
        },
        created() {
            this.getLoginInfo();
        },
        methods: {
            // 获取当前登录用户信息
            getLoginInfo() {
                let token = window.sessionStorage.getItem('token');
                if (token) {
                    this.$axios.post('api/getLoginInfo', {}).then((res) => {
                        this.currentUser = res.data;
                        window.sessionStorage.setItem('role', this.currentUser.role)
                        console.log(this.currentUser.role);
                    })

                }
            },
            // 退出登录
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login')
            },
            // 点击切换左侧菜单栏状态
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
            }
        }
    }
</script>

<style lang="less" scoped>
</style>