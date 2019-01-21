const BASEURL = "https://easy-mock.com/mock/5b8e8d99189f3722c8cb6e8e/SmileVue/"
const LOCALURL = "http://localhost:3000/"
const URL = {
  getShopingMallInfo: BASEURL + 'index', //商城首页所有信息
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', //用户注册接口
  login: LOCALURL + "user/login", //用户登录接口
  getDetailGoodsInfo: LOCALURL + "goods/getDetailGoodsInfo", //获取商品详情
  getCategoryList: LOCALURL + "goods/getCategoryList", //得到大类的数据
  getCategorySub: LOCALURL + "goods/getCategorySub", //得到小类的数据
  getGoodsListCategorySubID: LOCALURL + "goods/getGoodsListCategorySubID" //得到小类商品详情信息
}

module.exports = URL
