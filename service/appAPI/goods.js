const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require("fs")

// router.get("/insertAllGoods", async (ctx) => {
//   fs.readFile("./newGoods.json", "utf8", (err, data) => {
//     data = JSON.parse(data)
//     let saveCount = 0
//     const Goods = mongoose.model("Goods")
//     data.map((value, index) => {
//       // console.log(value)
//       let newGoods = new Goods(value)
//       newGoods.save().then(() => {
//         saveCount++
//         console.log("成功" + saveCount);

//       }).catch(error => {
//         console.log(error);
//       });
//     })
//   })
//   ctx.body = "开始导入数据"
// })
router.get("/insertAlllGoodsCategory", async (ctx) => {
  fs.readFile("./data_json/category.json", "utf8", (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model("Category")
    data.RECORDS.map((value, index) => {
      // console.log(value)
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log("成功" + saveCount);

      }).catch(error => {
        console.log(error);
      });
    })
  })
  ctx.body = "开始导入数据"
})
router.get("/insertAllGoodsCategorySub", async (ctx) => {
  fs.readFile("./data_json/categorySub.json", "utf8", (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model("categorySub")
    data.RECORDS.map((value, index) => {
      // console.log(value)
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        saveCount++
        console.log("成功" + saveCount);

      }).catch(error => {
        console.log(error);
      });
    })
  })
  ctx.body = "开始导入数据"
})

// 获取商品详情信息的借口
router.post("/getDetailGoodsInfo", async (ctx) => {
  let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model("Goods")
  await Goods.findOne({
      ID: goodsId
    }).exec()
    .then(async (result) => {
      ctx.body = {
        code: 200,
        message: result
      }
    })
    .catch(error => {
      console.log(error);
      ctx.body = {
        code: 500,
        message: error
      }

    })
})

//读取大类数据的接口

router.get("/getCategoryList",async(ctx)=>{
  
  try{
    // console.log(ctx);
    const Category = mongoose.model("Category")
    let result = await Category.find().exec()
    ctx.body = {code:200,message:result}
  }catch(error){
    ctx.body={code:500,message:error}
  }
})

// 读取小类的数据
router.post("/getCategorySub",async(ctx)=>{
  try{
    let cateoryId = ctx.request.body.categoryId
    // let cateoryId = 1
    const categorySub = mongoose.model("categorySub")
    let result = await categorySub.find({MALL_CATEGORY_ID:cateoryId}).exec()
    ctx.body = {code:200,message:result}
  }catch(error){
    ctx.body={code:500,message:error}
  }
})
//根据类型获取商品列表
router.post("/getGoodsListCategorySubID",async(ctx)=>{
  try{
    let categorySubId = ctx.request.body.categorySubId //子类别的ID
    let page = ctx.request.body.page //当前页数
    let num = 10 // 每页显示数量
    let start = (page - 1) * num // 开始位置

    // let categorySubId = "2c9f6c946016f86f01601709335d0000"
    const Goods = mongoose.model("Goods")
    let result = await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec()
    ctx.body = {code:200,message:result}
  }catch(error){
    ctx.body={code:500,message:error}
  }
})



module.exports = router
