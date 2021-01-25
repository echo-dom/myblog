const expressJwt = require("express-jwt");
const secretOrPrivateKey = "kongdejin" 
const jwtAuth = expressJwt({
secret: secretOrPrivateKey
}).unless({
path: ['/data/blog',
    '/data/essay',
    '/data/article',
    '/data/message',
    /^\/data\/blog\/.*/,
    /^\/data\/essay\/.*/,
    /^\/data\/article\/.*/,
            '/data/password'
   ] 
   });

   module.exports = jwtAuth;