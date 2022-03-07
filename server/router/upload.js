const express = require('express');
const multer = require('multer'); // 引入multer 文件上传插件
var fs = require('fs');
const path = require('path');
const { User} = require('../db')
// 创建博客的用户路由
const upload = express.Router()
var callBack = false;

// 上传文件
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../public/upload/')
    },
    filename: function(req, file, cb) {
        var getFileExt = function(fileName) { // 返回原文件类型 例如： png txt xml
            var fileExt = fileName.split(".");
            if (fileExt.length === 1 || (fileExt[0] === "" && fileExt.length === 2)) {
                return "";
            }
            return fileExt.pop(); // 方法用于删除数组的最后一个元素并返回删除的元素
        }
        cb(null, Date.now() + '.' + getFileExt(file.originalname))
    }
})
// 上传头像
var avatar = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../public/upload/')
    },
    filename: function(req, file, cb) {
        console.log(file)
        console.log("===")
        var getFileExt = function(fileName) { // 返回原文件类型 例如： png txt xml
            var fileExt = fileName.split(".");
            if (fileExt.length === 1 || (fileExt[0] === "" && fileExt.length === 2)) {
                return "";
            }
            return fileExt.pop(); // 方法用于删除数组的最后一个元素并返回删除的元素
        }
        // if(callBack) {
        //     cb(null, Date.now() + '.' + getFileExt(file.originalname))
        // }
        cb(null, file.originalname)
    }
})
var uploads = multer({
    dest: '../public/upload/'
});
const uploader = multer({
    storage: storage
})
const uploaderavatar = multer({
    storage: avatar
})

//  上传文件
upload.post('/api/upload', uploader.array('file', 1), async (req, res) => {

    if (!req.files) {
        return res.json({
            code: 202,
            message: '上传失败'
        })
    }

    res.json({
        code: 200,
        file: req.file
    })

})
// 上传用户头像
upload.post('/api/uploadavatar', uploaderavatar.array('lbf-file-upload', 1), async (req, res) => {
    if (!req.files) {
        return res.json({
            code: 202,
            message: '上传失败'
        })
    }else {
        console.log(req)
        console.log("=====")
        let user = await User.findOne({email:req.body.email})
        if (!user) {
            return res.send({'status':400,'msg':'找不到该用户'});
        } else if (user) {
            return user.updateOne({"Image":req.files[0].originalname},(err,data)=>{
                if (err) {
                    return err;
                } else {
                    res.send({'status':200,'msg':'修改用户信息成功'});
                }
            })
        }
    }
    res.json({
        code: 200,
        file: req.files
    })
})


module.exports = upload;