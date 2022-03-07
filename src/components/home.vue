<template>
    <div class="home">
        <!-- 头部导航器nav -->
        <el-header class="home-header">
            <el-row class="header ">
                <!-- 主页logo -->
                <el-col class="logo-col" :lg="3" :sm="3" :xs="0" :span="3">
                    <img class="logo" src="../assets/images/logo.png" alt="">
                </el-col>
                <!-- 导航区 -->
                <el-col :lg="21" :sm="21" :xs="21" :span="21" class="app-container">
                    <ul class="head-nav">
                        <li><i class="el-icon-house"> 首页</i> </li>
                        <li @click="addEssay"> 添加文章 </li>
                        <!-- <li><i class="el-icon-collection-tag"> 标签</i> </li>
                        <li><i class="el-icon-money"> 分类</i> </li>
                        <li><i class="el-icon-link"> 友链</i> </li>
                        <li><i class="el-icon-bank-card"> 留言板</i> </li>
                        <li><i class="el-icon-user"> 关于</i> </li> -->
                        <li v-if="isLogin">
                            <el-dropdown trigger="click" placement="bottom">
                                <span class="el-dropdown-link">
                                    <el-avatar>
                                        <el-image v-if="userinfo.Image" class="user-avatar" style="width: 100%;height:100%" :src="require(`../../public/upload/${userinfo.Image}`)"></el-image>
                                        <span v-else>{{userinfo.username}} </span>
                                    </el-avatar>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                                    <el-dropdown-item divided>我的信息</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>

                        </li>
                        <li v-else @click="toPath('/login')">登录</li>
                        <!-- <li @click="toPath('/register')">注册</li> -->
                    </ul>
                </el-col>
            </el-row>
        </el-header>
        <el-row class="app-container">
            <el-col :lg="16" :sm="24" :xs="24" :span="16">
                <!-- main区 -->
                <!-- 无限列表区 -->
                <div class="infinite-list-wrapper" style="overflow:auto">
                    <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                        <li v-for="(item,i) in essaylist" :key="i" class="list-item">
                            <!-- title -->
                            <h2 class="card-title"><a @click="toEssayDetail(item._id)">{{item.title}}</a></h2>
                            <!-- 用户信息区 -->
                            <ul class="card-info">
                                <li><i class="el-icon-user"> 作者 {{item.creater}}</i> </li>
                                <li><i class="el-icon-time"> 发表于 {{formatDate(item.date)}}</i> </li>
                                <li><i class="el-icon-money"> 分类 Python</i> </li>
                                <li><i class="el-icon-view"> 阅读量 {{item.essayView}}</i> </li>
                                <li><i class="el-icon-chat-dot-round"> 评论数 23</i> </li>
                            </ul>
                            <!-- 卡片内容区 -->
                            <div class="card-contain">
                                <div v-html="item.content"></div>
                            </div>
                            <!-- 标签区 -->
                            <div class="card-tag">
                                <el-tag type="success">Django</el-tag>
                                <el-tag type="success">Memcache</el-tag>
                                <el-tag type="success">Python</el-tag>
                                <el-tag type="success">缓存</el-tag>
                            </div>
                        </li>
                    </ul>
                    <!-- <p v-if="loading">加载中...</p> -->
                    <!-- <p v-if="noMore">没有更多了</p> -->
                </div>
            </el-col>

            <!-- 右侧边栏区 -->

            <el-col :lg="7" :sm="24" :xs="24" :span="7" class="aside-bar">
                <!-- 个人信息 -->
                <el-row>
                    <el-col :span="24" class="my-info">
                        <div class="my-info-title"> <i class="el-icon-postcard"></i> 我的名片</div>
                        <!-- 详细 -->
                        <el-form class="my-info-body">
                            <el-form-item label="网名:">
                                <span>快乐的牛牛</span>
                            </el-form-item>
                            <el-form-item label="职业:">
                                <span>前端开发工程师</span>
                            </el-form-item>
                            <el-form-item label="现居:">
                                <span>广东省-广州市</span>
                            </el-form-item>
                            <el-form-item label="Email:">
                                <span>1637488364@qq.com</span>
                            </el-form-item>
                            <el-form-item label="QQ:">
                                <span>1637488364</span>
                            </el-form-item>
                            <!-- 社交 -->
                            <ul class="app-info">
                                <!-- QQ -->
                                <li class="app-QQ">
                                    <img src="../assets/svg/QQ.svg">
                                </li>
                                <!-- wechat -->
                                <li class="app-weChat">
                                    <img src="../assets/svg/weChat.svg">
                                </li>
                                <!-- github -->
                                <li class="app-Github">
                                    <el-popover placement="top-start" trigger="hover">
                                        <a style="color: #66b1ff;" target="_blank" href="https://github.com/echo-dom">去我的GitHub</a>
                                        <img slot="reference" src="../assets/svg/Github.svg">
                                    </el-popover>
                                </li>
                                <!-- email -->
                                <li class="app-Email">
                                    <el-popover placement="top-start" trigger="hover">
                                        <a style="color: #66b1ff;" target="_blank" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=FicgJSEiLi4lICJWZ2c4dXl7">给我发邮件</a>
                                        <img slot="reference" src="../assets/svg/Email.svg">
                                    </el-popover>
                                </li>
                            </ul>
                        </el-form>
                    </el-col>
                    <!-- 标签云 -->
                    <el-col :span="24" class="cloud-tag">
                        <div class="cloud-tag-title"> <i style="color: #66b1ff;" class="el-icon-collection-tag"></i> 云标签</div>
                        <div class="cloud-tag-body">
                            <!-- 详细 -->
                            <div class="cloud-tags-tag">
                                <el-tag type="success">Django</el-tag>
                                <el-tag type="success">Memcache</el-tag>
                                <el-tag type="success">Python</el-tag>
                                <el-tag type="success">缓存</el-tag>
                            </div>
                        </div>

                    </el-col>
                    <!-- 最热文章 -->
                    <el-col :span="24" class="hot-essay">
                        <div class="hot-essay-title"> <i style="color: #e13455;" class="el-icon-document"></i> 最热文章</div>
                        <div class="hot-essay-body">
                            <!-- 详细 -->
                            <ol class="hot-essay-list" :key="i" v-for="(i) in essayNum">
                                <li>
                                    <i class="hot-essay-list-num">{{i}}</i><span> Django启用memcache缓存</span>
                                </li>
                            </ol>
                        </div>

                    </el-col>
                    <!-- 最新文章 -->
                    <el-col :span="24" class="hot-essay">
                        <div class="hot-essay-title"> <i style="color: #e13455;" class="el-icon-document"></i> 最新文章</div>
                        <div class="hot-essay-body">
                            <!-- 详细 -->
                            <ol class="hot-essay-list" :key="i" v-for="(i) in essayNum">
                                <li>
                                    <i class="hot-essay-list-num">{{i}}</i><span> Django启用memcache缓存</span>
                                </li>
                            </ol>
                        </div>
                    </el-col>
                    <!-- 文章归类 -->
                    <el-col :span="24" class="hot-essay">
                        <div class="hot-essay-title"> <i style="color: #e13455;" class="el-icon-document"></i> 文章归类</div>
                        <div class="hot-essay-body">
                            <!-- 详细 -->
                            <ol class="hot-essay-list" :key="i" v-for="(i) in essayNum">
                                <li>
                                    <i class="hot-essay-list-num">{{i}}</i><span> Django启用memcache缓存</span>
                                </li>
                            </ol>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-dialog title="添加" :visible.sync="EssayDialogVisible" width="30%">
            <el-form ref="form" :model="form">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="评论">
                    <el-input v-model="form.commonts"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="EssayDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
            </span>
        </el-dialog>
        <el-backtop></el-backtop>
    </div>
</template>
<script>
    import '../assets/css/common.less'
    import { formatTime } from '../components/tools/formatdate.js'

    export default {
        data() {
            return {
                essaylist: [],
                count: 10,
                loading: false,
                essayNum: 10,
                scrollEl: '',
                EssayDialogVisible: false,
                form: {},
                userinfo: {
                    Image: 'default.jpg'
                },
                isLogin: false
            }
        },
        computed: {
            noMore() {
                return this.count >= 15
            },
            disabled() {
                return this.loading || this.noMore
            }
        },
        methods: {
            // 获取文章列表
            async getData() {
                let essaylist = await this.$axios.get('api/essayList');
                this.essaylist = essaylist.data;
                // 将数组进行排序，按照日期从最新排序
                this.essaylist = this.essaylist.sort((a, b) => {
                    return b.date - a.date;
                })

            },
            // 添加文章
            addEssay() {
                this.$router.push('/editEssay')
                //   this.EssayDialogVisible = true
            },
            // 跳转到文章详情页
            toEssayDetail(_id) {
                window.sessionStorage.setItem("essayId", _id);
                this.$router.push({ name: 'ShowEssay' });
            },
            // 格式化时间格式
            formatDate(date) {
                return formatTime(date)
            },
            confirmAdd() {
                const date = new Date().getTime()
                const data = { ...this.form }
                data.date = date
                //   console.log(data)
                this.$axios.post('api/essayAdd', { articleInformation: { ...data } }).then((res) => {
                    console.log(res)
                })
                this.$axios.get('api/articleList').then(res => {
                    console.log(res)
                })
            },
            // 跳转
            toPath(path) {
                this.$router.push({ path: path })
            },
            load() {
                this.loading = true
                setTimeout(() => {
                    this.count += 2
                    this.loading = false
                }, 2000)
            },
            getLoginInfo() {
                let token = window.sessionStorage.getItem('token');
                if (token) {
                    this.isLogin = true;
                    this.$axios.post('api/getLoginInfo', {}).then((res) => {
                        this.userinfo = res.data;
                        // window.sessionStorage.setItem('role', this.currentUser.role)
                        // console.log(this.currentUser.role);
                    })

                } else {
                    this.isLogin = false;
                }
            },
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login')
            }
        },
        created() {
            this.getLoginInfo()
            this.getData();
        }
    }
</script>

<style>
    .home {
        background-color: #f4f5f5;
    }

    .list {
        background-color: #fff;
    }
</style>