// 引入mongoose
const mongoose = require ('mongoose')
mongoose.set('useCreateIndex', true) 
mongoose.connect('mongodb://localhost/blogdb',{ useUnifiedTopology: true,useNewUrlParser: true })
mongoose.connection.on("connected",(error)=>{
    console.log("mongodb连接成功")
})
const {MonBlog} = require('./dbmodel/blog');
const {User} = require('./dbmodel/user');

// const MonBlog = mongoose.model('monblog', {
//     title: {
//         type: String,
//         required: true
//     },
//     creater:{
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: String,
//         required: true
//     },
//     comments:[],
//     essayView:{
//         type:Number,
//         default:0,
//         required:false,
//     }
// })

// const User = mongoose.model('User', { 
//     username:{
//         type:String,
//         required:true,
//     } , 
//     password:{
//         type:String,
//         required: true
//     },
//     phone:{
//         type:Number,
//         required: false
//     },
//     email:{
//         type:String,
//         required: false,
//         unique:true,  // 保证邮箱唯一
//     },
//     // 角色 admin 为管理员
//     role:{
//         type:String,
//         required: true,
//         default:'normal'
//     },
//     // 状态, 默认启动
//     state:{
//         type:Boolean,
//         required:true,
//         default:true
//     },
//     token:{
//         type:String,
//         required: false
//     },
//     Image:{
//         type:String,
//         required: false,
//         default:"default.jpg"

//     } 
// })

module.exports = {
    MonBlog,
    User
}