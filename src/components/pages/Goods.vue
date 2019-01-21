<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>

    <!-- .编写商品头图部分 -->
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格:¥{{goodsInfo.PRESENT_PRICE | filtersMoney}}</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">评论</van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "../../filter/moneyFilter.js";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {} //商品详细信息
    };
  },
  filters: {
    filtersMoney: function(value) {
      return toMoney(value);
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    console.log(this.goodsId);
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            this.goodsInfo = res.data.message;
          } else {
            Toast("服务器错误,数据获取失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    addGoodsToCart() {
      //取出本地购物车的商品
      // localStorage.removeItem('cartInfo')
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId);
      console.log(isHaveGoods);
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          Name: this.goodsInfo.NAME,
          paice: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        };
        cartInfo.push(newGoodsInfo);
        localStorage.cartInfo = JSON.stringify(cartInfo);
        Toast.success("添加成功");
      } else {
        Toast.success("已有此商品");
      }
      this.$router.push({ name: "Cart" });
    }
  }
};
</script>

<style scoped>
.goods-name,
.goods-price {
  background: #ffffff;
}

.detail {
  font-size: 0;
}

.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background: #ffffff;
  width: 100%;
  display: flex;
}

.goods-bottom div {
  flex: 1;
  padding: 5px;
}
.van-button {
  border-radius: 5px;
}
</style>
