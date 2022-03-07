//  引入express框架
const express = require('express');
const { User, MonBlog} = require('../db')
const tokentools = require('../common/tokentools')

// 创建博客的文章
const essay = express.Router();


// 获取所有文章
essay.get('/api/essayList',(req,res)=>{
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
essay.post('/api/getEssayById',async (req,res)=>{
    // MonBlog.find({_id:req.body._id},(err,data) =>{
    //     if (err) {
    //         return res.send({'status':400,'msg':'找不到该文章'});
    //     }
    //     res.send(data)
    //     return
    // })
    let blog = await MonBlog.findById({_id:req.body._id});
    if (!blog) {
        return res.send({'status':400,'msg':'找不到该文章'})
    } else if (blog) {
        let essayView = blog.essayView +1;
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
essay.post('/api/essayAdd', async function (req, res) {
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
essay.post('/api/deleteEssay',async (req,res)=>{
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
// 将路由对象作为模块成员进行导出
module.exports= essay;
