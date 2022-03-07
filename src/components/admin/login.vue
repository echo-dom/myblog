<template>
    <div class="login" :style="'background-image:url(' + Background + ');'">
        <el-form :model="userFrom" class="login-box" :rules="loginRules" ref="loginRuleForm">
            <el-form-item class="title" style="text-align: center">
                <h2>欢迎登陆 Kong的博客系统</h2>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input v-model="userFrom.phone" placeholder="请输入手机号" prefix-icon="el-icon-user">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="userFrom.password" placeholder="请输入密码" prefix-icon="el-icon-lock">
                </el-input>
            </el-form-item>
            <el-form-item prop="captcha">
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-input v-model="userFrom.captcha" placeholder="请输入验证码" prefix-icon="el-icon-key">
                        </el-input>
                    </el-col>
                    <el-col :span="8">
                        <div @click="refreshCaptCha" v-html="captCha" style="height: 40px;display: flex; align-items: center;"></div>
                    </el-col>
                </el-row>

            </el-form-item>
            <!-- <el-checkbox v-model="userFrom.rememberMe" style="margin: 0 0 25px 0">
                记住我
            </el-checkbox> -->
            <!-- <el-button type="danger" @click="Register">注册</el-button> -->
            <!-- <el-button type="danger" @click="toRegister">去注册...</el-button> -->
            <el-form-item style="width: 100%">
                <el-button :loading="loading" type="primary" style="width: 100%" @click="Login">
                    <span v-if="!loading">登 录</span>
                    <span v-else> <i class="el-icon-loading"></i>登 录 中...</span>
                </el-button>
            </el-form-item>
            <el-form-item style="width: 100%">
                <div class="register-div">
                    <span @click="toRegister">还没有账号？</span>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import '../../assets/css/login.less'
    import Background from "@/assets/images/background.jpg";
    export default {
        name: "Login",
        data() {
            return {
                Background: Background,
                captCha: "",
                loading: false,
                userFrom: {
                    password: "kongdj10086",
                    phone: "13612507131",
                    rememberMe: false,
                },
                loginRules: {
                    password: [
                        { required: true, message: "请输入密码", trigger: "blur" },
                        {
                            min: 3,
                            max: 20,
                            message: "长度在 3 到 15 个字符",
                            trigger: "blur",
                        },
                    ],
                    phone: [
                        { required: true, message: "请输入手机号", trigger: "blur" },
                        {
                            min: 11,
                            max: 11,
                            message: '请输入正确的手机号！ ',
                            trigger: "blur",
                        },
                    ],
                    captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }, ]
                },
            };
        },
        created() {
            this.getCaptcha();
            console.log(JSON.parse(sessionStorage.getItem("userFrom")))
            sessionStorage.getItem("userFrom") && (this.userFrom = JSON.parse(sessionStorage.getItem("userFrom")))
        },
        methods: {
            // 获取验证码信息
            getCaptcha() {
                this.$axios.get("api/captcha").then(res => {
                    console.log(res)
                    this.captCha = res.data.data;
                    window.sessionStorage.setItem("captCha", res.data.text);
                })
            },
            // 点击图片刷新验证码
            refreshCaptCha() {
                this.getCaptcha();
            },
            toRegister() {
                this.$router.push("/register");
            },
            Login() {
                this.$refs["loginRuleForm"].validate((valid) => {
                    if (!window.sessionStorage.getItem('captCha')) {
                        this.$notify.error({
                            title: '错误',
                            message: '验证码已失效，请重新获取验证码！'
                        });
                        return;
                    }
                    if ((this.userFrom.captcha).toLowerCase() !== window.sessionStorage.getItem('captCha').toLowerCase()) {
                        this.$notify.error({
                            title: '错误',
                            message: '验证码错误！'
                        });
                        return;
                    }
                    if (valid) {
                        this.userFrom.rememberMe && sessionStorage.setItem("userFrom", JSON.stringify(this.userFrom))
                        this.$axios.post("api/login", { ...this.userFrom }).then((res) => {
                            console.log(res);
                            if (res.data.status !== 200) {
                                this.$message.error(res.data.msg);
                                return;
                            } else if (res.data.status == 200) {
                                this.$message.success("登录成功");
                                // 登录成功后将token 保存到sessionStorage中，token只应该在当前窗口打开时生效,所有不应该设置为localStorage中
                                window.sessionStorage.setItem("token", res.data.token);
                                window.sessionStorage.setItem("lastTime", new Date().getTime());
                                this.checkMouseDown()
                                this.checkTime();
                                this.$router.push("/admin");
                                return;
                            }
                        });
                    }
                });
            },
            // 超时未操作自动退出登录
            checkTime() {
                var currentTime = new Date().getTime(); //更新当前时间
                var lastTime = window.sessionStorage.getItem("lastTime");
                var timeOut = 30 * 60 * 1000 //设置超时时间: 30分钟
                var nowtimeOut = 30 * 60 * 1000
                var that = this;
                var timer = setInterval(
                    function() {
                        currentTime = new Date().getTime() //更新当前时间
                        lastTime = window.sessionStorage.getItem("lastTime");
                        // 主动退出登录
                        if (lastTime === null) {
                            clearInterval(timer); // 先清楚计数器
                            return
                        }
                        nowtimeOut = (nowtimeOut - 3000);
                        console.log((nowtimeOut - 3000) / 60000)
                        if (currentTime - lastTime > timeOut) { //判断是否超时
                            clearInterval(timer); // 先清楚计数器
                            window.sessionStorage.clear();
                            that.$alert('登录状态已失效，请重新登陆！', '通知', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    that.$router.push('/login');
                                }
                            });
                        }
                    }, 3000)
            },
            checkMouseDown() {
                window.document.onmousedown = function() {
                    window.sessionStorage.setItem("lastTime", new Date().getTime());
                }
            }

        },
    };
</script>

<style lang="less" scoped>

</style>