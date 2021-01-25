const fs = require('fs');
const path = require('path')
console.log(path.join(__dirname, '/swamp-pix/bayou.jpeg'));
// 文件写入
// console.log(process.chdir('/Users/jerry'));
console.log('准备写入文件');
var fileter = function (fileName,fileContent) {
    fs.writeFile(__dirname + '\\' + fileName,fileContent,(err)=>{
        if(err) {
            return console.error(err);
        }
        console.log('文件写入成功!');
        fs.readFile(__dirname + fileName,(err,data)=>{
            if(err) {
                return console.error(err);
            }
            console.log('文件内容:' + data.toString() );
            console.log(__dirname + '\\' + fileName);
        })
    })

}
// fileter('input.txt','我是通过writeFile 写入的文件内容')

module.exports = {
    fileter
}
