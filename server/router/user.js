//  引入express框架
const express = require('express');
const tokentools = require('.././common/tokentools')
const { User} = require('../db')

// 创建博客的用户路由
const user = express.Router();

// 获取所有用户信息
user.get('/api/getUsersList',(req,res)=>{
    User.find({},(err,data)=>{
        if(err) {
            console.log(err);
            return
        }
        res.send(data)
        return
    })
})

// 获取当前登录用户
user.post('/api/getLoginInfo',async (req,res)=>{
    let untoken = await tokentools.verifytoken(req.headers.authorization)
    User.findOne({email:untoken},(err,data)=>{
        if (err) {
            return res.send({'status':400,'msg':'找不到该用户'});
        } else  {
            return res.send(data);
        }
    })
})

// 获取要修改的用户
user.post('/api/getEditInfo',async (req,res)=>{
    User.findOne({_id:req.body._id},(err,data)=>{
        if (err) {
            return res.send({'status':400,'msg':'找不到该用户'});
        } else  {
            return res.send(data);
        }
    })
})

// 删除用户
user.post('/api/deleteUsers',async (req,res)=>{
    let user = await User.findOne({_id:req.body._id})
    if (!user) {
        return res.send({'status':400,'msg':'找不到该用户'});
    } else if (user) {
      return user.deleteOne({...req.body},(err,data)=>{
           if (err) {
               return err;
           } else {
               res.send({'status':200,'msg':'删除用户成功'});
           }
       })
    }
})

// 修改用户信息
user.post('/api/editUsers',async (req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if (!user) {
        return res.send({'status':400,'msg':'找不到该用户'});
    } else if (user) {
      return user.updateOne({...req.body},(err,data)=>{
           if (err) {
               return err;
           } else {
               res.send({'status':200,'msg':'修改用户信息成功'});
           }
       })
    }
})

// user.post('/login',require('./login'));
// 将路由对象作为模块成员进行导出
module.exports= user;