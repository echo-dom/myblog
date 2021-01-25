// const { reject, resolve } = require('core-js/fn/promise')
const express = require('express')
const { User, MonBlog} = require('./db')
const tokentools = require('./common/tokentools')
var router = express.Router()
var jwt = require('jsonwebtoken');
// const { fileter } = require('./common/file');
// 注册
router.post('/api/register',async (req,res)=>{
    const dataparams = {...req.body};
    // 验证用户是否输入正确
    if (dataparams.username.trim().length == 0 || dataparams.password.trim().length == 0 ) {
        // 请求格式出错一般以400返回
       return res.send({'status': 400,'msg':'用户名或密码不能为空'}) //终止程序向下运行
    }
    dataparams.password = tokentools.md5(dataparams.password);
    // 是否存在用户
    let user = await User.findOne({username:dataparams.username});
    if (user) {
        return res.send({'status': 400 , 'msg':'该用户已注册,请登录!'})
    }
    else {
        new User(dataparams).save(err=>{
            // 如果注册失败，则返回错误信息
            if(err) {
                console.log(err);
                return
            } 
            res.send({'status': 200 , 'msg':'注册成功'})
        })
    }
})

// 登录
router.post('/api/login', async (req,res)=>{
    const dataparams = {...req.body};
    console.log(dataparams);
    // 如果用户没有输入用户名
    if (dataparams.username.trim().length == 0 || dataparams.password.trim().length == 0 ) {
        // 请求格式出错一般以400返回
       return res.send({'status': 400,'msg':'用户名或密码不能为空'}) //终止程序向下运行
    }
    dataparams.password = tokentools.md5(dataparams.password);
    // 根据用户名查询信息
    let user = await User.findOne({username:dataparams.username})
    if (user) {
        // 将前端的信息与后台信息匹对
        if (user.password == dataparams.password && user.state !== false) {
            // 创建token 
            // let content = {username:username} //生成的主题信息
            // let secretKey = "KDJ" // 密钥
            // var token = jwt.sign(content,secretKey,{
            //     expiresIn : 60 * 60 * 1 // 1 小时过期
            // });
            var token = tokentools.signtoken(dataparams.username);
            // 将token 发送到前端
            res.send({'status': 200,'msg':'登录成功','token':token});
        } else if(user.state == false) {
            res.send({'status': 400,'msg':'登录失败,该用户已关闭,请联系管理员!!'});
        } else{
            res.send({'status': 400,'msg':'登录失败,用户名或密码错误'});
        }
    } else {
        res.send({'status': 401,'msg':'找不到该用户,请先注册'});
    }
})

// 获取所有用户信息
router.get('/api/getUsersList',(req,res)=>{
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
router.post('/api/getLoginInfo',async (req,res)=>{
    // console.log(req.headers);
    let untoken = await tokentools.verifytoken(req.headers.authorization)
    // console.log(untoken);
    User.findOne({username:untoken},(err,data)=>{
        if (err) {
            return res.send({'status':400,'msg':'找不到该用户'});
        } else  {
            return res.send(data);
        }
    })
})

// 获取要修改的用户
router.post('/api/getEditInfo',async (req,res)=>{
    User.findOne({_id:req.body._id},(err,data)=>{
        if (err) {
            return res.send({'status':400,'msg':'找不到该用户'});
        } else  {
            return res.send(data);
        }
    })
})


// 删除用户
router.post('/api/deleteUsers',async (req,res)=>{
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
router.post('/api/editUsers',async (req,res)=>{
    let user = await User.findOne({username:req.body.username})
    if (!user) {
        return res.send({'status':400,'msg':'找不到该用户'});
    } else if (user) {
      return user.update({...req.body},(err,data)=>{
           if (err) {
               return err;
           } else {
               res.send({'status':200,'msg':'修改用户信息成功'});
           }
       })
    }
})


// // 图片上传
// router.post('/api/uploadImg',async (req,res)=>{
//     // let untoken = await tokentools.verifytoken(req.headers.authorization)
//     // let untoken = 'avs'
//     var untoken = ''
//     tokentools.verifytoken(req.headers.authorization).then(res =>{
//         untoken = res; 
//         console.log(res);

//     }) ;
//     User.findOne({username:untoken}).then(res=>{
//         console.log(res);
//     })
//     // console.log(user);
//     // if (!user) {
//     //     return res.send({'status':400,'msg':'找不到该用户'});
//     // } else if (user) {
//     //     let ImageStr = req.body 
//     //     res.send(ImageStr)
//     //     console.log(ImageStr);
//     //     return res.send({'status':200,'msg':'上传成功'});
//         // fileter()
//     //     return user.update({},(err,data)=>{
//     //         if (err) {
//     //            return err;
//     //         } else {
//     //            res.send({'status':200,'msg':'修改用户信息成功'});
//     //         }
//     //    })
//     // }
// })


// 获取所有文章
router.get('/api/essayList',(req,res)=>{
    MonBlog.find({},(err,data) =>{
        if (err) {
            console.log(err);
            return
        }
        res.send(data)
        return
    })
})

// 根据_id查找文章
router.post('/api/getEssayById',async (req,res)=>{
    // MonBlog.find({_id:req.body._id},(err,data) =>{
    //     if (err) {
    //         return res.send({'status':400,'msg':'找不到该文章'});
    //     }
    //     res.send(data)
    //     return
    // })
    let blog = await MonBlog.findById({_id:req.body._id});
    let essayView = blog.essayView +1;
    if (!blog) {
        return res.send({'status':400,'msg':'找不到该文章'})
    } else if (blog) {
        return blog.updateOne({essayView:essayView},(err,data)=>{
            if(err) {
                // console.log(err);
                return res.send(err)
            } else if (!err) {
                // console.log(data);
                return res.send(blog)
            }
        })
        
    }
})

// 新增文章
router.post('/api/essayAdd', async function (req, res) {
    let data = req.body.articleInformation;
    data.creater = await tokentools.verifytoken(data.creater);
    new MonBlog(data).save(function (err) {
      if (err) {
        res.status(500).send()
        return
      }
      res.send('添加文章成功');
    })
  })

  // 删除文章
router.post('/api/deleteEssay',async (req,res)=>{
    let blog = await MonBlog.findOne({_id:req.body._id})
    if (!blog) {
        return res.send({'status':400,'msg':'找不到该文章'});
    } else if (blog) {
      return blog.deleteOne({...req.body},(err,data)=>{
           if (err) {
               return err;
           } else {
               res.send({'status':200,'msg':'删除文章成功'});
           }
       })
    }
})

router.get('/', (req, res) => {
    res.send('这是7000服务器')
})

module.exports = router

