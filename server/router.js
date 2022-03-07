// const { reject, resolve } = require('core-js/fn/promise')
const express = require('express')
const { User, MonBlog } = require('./db')
const tokentools = require('./common/tokentools')
var router = express.Router()
var jwt = require('jsonwebtoken');
var svgCaptcha = require('svg-captcha'); //引入验证码依赖
var fs = require('fs'); // 载入fs模块
// 验证码对象
var codeConfig = {
    size: 5, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 3, // 干扰线条的数量
    height: 30,
    color: '#ff0ff0',
    background: '#F1F3F4',
    fontSize: 35,
    width: 105,
    url: '../src/assets/images/logo.png'
}
// const { fileter } = require('./common/file');

// 注册
router.post('/api/register', async (req, res) => {
    const dataparams = { ...req.body };
    // 验证用户是否输入正确
    if (dataparams.username.trim().length == 0 || dataparams.password.trim().length == 0) {
        // 请求格式出错一般以400返回
        return res.send({ 'status': 400, 'msg': '用户名或密码不能为空' }) //终止程序向下运行
    }
    dataparams.password = tokentools.md5(dataparams.password);
    // 是否存在用户
    let user = await User.findOne({ username: dataparams.phone });
    if (user) {
        return res.send({ 'status': 400, 'msg': '该用户已注册,请登录!' })
    } else {
        new User(dataparams).save(err => {
            // 如果注册失败，则返回错误信息
            if (err) {
                console.log(err);
                return
            }
            res.send({ 'status': 200, 'msg': '注册成功' })
        })
    }
})

// 登录
router.post('/api/login', async (req, res) => {
    const dataparams = { ...req.body };
    console.log(dataparams);
    // 如果用户没有输入用户名
    if (dataparams.phone.trim().length == 0 || dataparams.password.trim().length == 0) {
        // 请求格式出错一般以400返回
        return res.send({ 'status': 400, 'msg': '用户名或密码不能为空' }) //终止程序向下运行
    }
    dataparams.password = tokentools.md5(dataparams.password);
    // 根据用户手机号查询信息
    let user = await User.findOne({ phone: dataparams.phone })
    if (user) {
        // 将前端的信息与后台信息匹对
        if (user.password == dataparams.password && user.state !== false) {
            // 创建token 
            // let content = {username:username} //生成的主题信息
            // let secretKey = "KDJ" // 密钥
            // var token = jwt.sign(content,secretKey,{
            //     expiresIn : 60 * 60 * 1 // 1 小时过期
            // });
            var token = tokentools.signtoken(dataparams.phone);
            // 将token 发送到前端
            res.send({ 'status': 200, 'msg': '登录成功', 'token': token });
        } else if (user.state == false) {
            res.send({ 'status': 400, 'msg': '登录失败,该用户已关闭,请联系管理员!!' });
        } else {
            res.send({ 'status': 400, 'msg': '登录失败,用户名或密码错误' });
        }
    } else {
        res.send({ 'status': 401, 'msg': '找不到该用户,请先注册' });
    }
})


// 获取验证码
router.get('/api/captcha', (req, res) => {
    var captcha = svgCaptcha.create(codeConfig);
    console.log(captcha)
    // req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send({ "data": captcha.data, "text": captcha.text });
})


router.get('/', (req, res) => {
    res.send('这是7000服务器')
})

module.exports = router