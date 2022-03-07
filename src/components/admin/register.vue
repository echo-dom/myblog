<template>
    <div class="regsiter" :style="'background-image:url('+ Background +');'">
        <el-form class="register-box" :model="userFrom" :rules="registerRules" ref="registerRuleForm">
            <el-form-item class="title" style="text-align: center">
                <h2>欢迎注册 Kong的博客系统</h2>
            </el-form-item>
            <el-form-item prop="username">
                <el-input v-model="userFrom.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input v-model="userFrom.phone" placeholder="请输入手机号" prefix-icon="el-icon-phone-outline"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="userFrom.password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item prop="crmpassword">
                <el-input type="password" v-model="userFrom.crmpassword" placeholder="请再次输入密码" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <!-- <el-form-item prop="email">
                <el-input v-model="userFrom.email" placeholder="请输入邮箱地址" prefix-icon="el-icon-message"></el-input>
            </el-form-item> -->
            <el-form-item style="width:100%;">
                <el-button :registering="registering" type="primary" style="width:100%;" @click="Register">
                    <span v-if="!registering">注 册</span>
                    <span v-else>注 册 中...</span>
                </el-button>
            </el-form-item>
            <el-form-item style="width:100%;">
                <div class="register-div">
                    <span @click="toLogin">已有账号？</span>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    var validPassword = (rule, value, callback) => {
            if (value.length == 0) {
                callback(new Error('请输入密码'))
                return false;

            } else {

                let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
                if (!reg.test(value)) {
                    callback(new Error('密码必须是由6-16位字母+数字组合'))
                    return false;

                } else {
                    callback()
                    return false;

                }
            }
        },
        validCrmPassword = function(rule, value, callback) {
            console.log(this);
            if (value.length == 0) {
                callback(new Error('请输入密码'))
                return false;

            } else {
                if (!value) {
                    callback(new Error('密码必须是由6-16位字母+数字组合'))
                    return false;

                } else {
                    callback()
                    return false;

                }
            }
        };
    import Background from '@/assets/images/background.jpg'

    export default {
        name: 'Register',
        data() {
            return {
                Background: Background,
                registering: false,
                userFrom: {
                    password: '',
                    crmpassword: '',
                    username: '',
                    email: '',
                    phone: '',
                },
                registerRules: {
                    password: [
                        { required: true, validator: validPassword, trigger: 'blur' },
                    ],
                    phone: [
                        { required: false, message: '请输入手机号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度在 11 ', trigger: 'blur' }

                    ],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }

                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }

                    ],
                    crmpassword: [
                        { required: true, validator: validCrmPassword, trigger: 'blur' },
                    ]
                }

            }
        },
        methods: {

            //   登录
            toLogin() {
                this.$router.push('/login')
            },
            //   注册
            Register() {
                // console.log(this.userFrom);
                this.$refs['registerRuleForm'].validate(valid => {
                    if (valid) {
                        this.userFrom.phone = parseInt(this.userFrom.phone);
                        if (this.userFrom.password !== this.userFrom.crmpassword) {
                            this.$message.error('两次密码不一致！');
                            return
                        }
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
        },
        watch: {

        }
    }
</script>

<style lang="less" scoped>
    .register-box {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        // width: 20%;
        padding: 20px;
        border-radius: 6px;
        background: #ffffff;
        width: 365px;

        // padding: 25px 25px 5px 25px;
        .el-input {
            height: 38px;

            input {
                height: 38px;
            }
        }

        .input-icon {
            height: 39px;
            width: 14px;
            margin-left: 2px;
        }
    }

    .regsiter {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-size: cover;
    }

    .register-div {
        display: flex;
        justify-content: flex-end;
        color: red;
        cursor: pointer;
    }
</style>