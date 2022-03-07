// 引入mongoose
const mongoose = require ('mongoose')
const User = mongoose.model('User', { 
    username:{
        type:String,
        required:true,
    }, 
    password:{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true,
        unique:true,  // 保证手机号唯一
    },
    email:{
        type:String,
        required: false,
    },
    // 角色 admin 为管理员
    role:{
        type:String,
        required: true,
        default:'normal'
    },
    // 状态, 默认启动
    state:{
        type:Boolean,
        required:true,
        default:true
    },
    token:{
        type:String,
        required: false
    },
    Image:{
        type:String,
        required: false,
        default:"default.jpg"

    } 
})
    module.exports = {
        User
    }
