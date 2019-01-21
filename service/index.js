const Koa = require("koa")
const app = new Koa()
const {
  connect,
  initSchemas
} = require("./database/init.js")
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require("koa2-cors")

app.use(bodyParser())
app.use(cors())

let user = require('./appAPI/user.js')
let home = require('./appAPI/home.js')
let goods = require('./appApi/goods.js')

//装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())

//加载路由中间件

app.use(router.routes())
app.use(router.allowedMethods())

;
(async () => {
  await connect()
  initSchemas()
  // const User = mongoose.model("User")
  // let oneUser = new User({userName:"lmq5088",password:"1234556"})
  // oneUser.save().then(()=>{
  //     console.log("插入成功");

  // })
  // let user = await User.findOne({}).exec()
  // console.log("----------------");
  // console.log(user);
  // console.log("-------------------");

})()

app.use(async (ctx) => { //ctx 是上下文
  ctx.body = `<h1>你好 世界</h1>`
})

app.listen(3000, () => {
  console.log("服务器在端口3000打开了");

})
