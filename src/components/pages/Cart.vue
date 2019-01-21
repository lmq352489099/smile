<template>
    <div>
       <div class="navbar-div">
           <van-nav-bar
           title="购物车"/>
    </div>
    <div class="cart-title">
        <van-button size='small' type="danger" @click="clearCar" plain>
            清空购物车
        </van-button>
    </div>
    <!-- 显示购物车的商品 -->
    <div class="cart-list">
        <div class="qiang-row" v-for="(item,index) in cartInfo" :key="index">
            <div class="qiang-image">
                <img :src="item.image" width="100%" alt="">
            </div>
            <div class="qiang-text"> 
                <div class="qiang-goods-name">{{item.Name}}</div>
                <div class="qiang-control">
                    <van-stepper v-model="item.count" />
                </div>
            </div>
             <div class="qiang-price">
                 <div>¥{{item.paice | moneyFilter}}</div>
                 <div>x{{item.count}}</div>
                 <div class="allPrice">
                     ¥{{item.paice * item.count | moneyFilter}}
                 </div>
            </div>
        </div>
    </div>

    <!-- 显示总金额 -->

    <div class="totalMoeny">
        商品总价:¥{{totalMoney | moneyFilter }}
    </div>
    </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [], ////购物车内的商品
      isEmpty: false //购物车是否为空,来显示不一样的
    };
  },
  filters: {
    moneyFilter: function(value) {
      return toMoney(value);
    }
  },
  created() {
    this.getCartInfo();
  },
  computed: {
      totalMoney() {
          let allMoney = 0
          this.cartInfo.forEach((item,index)=>{
           allMoney += item.paice * item.count
          }) 
          localStorage.cartInfo = JSON.stringify(this.cartInfo)
          return allMoney
      }
  },
  methods: {
    //得到购物车数据的方法
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log("this.cartInfo:" + JSON.stringify(this.cartInfo));

      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    clearCar() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  }
};
</script>

<style scoped>
.cart-title {
  height: 2rem;
  line-height: 2rem;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background: #fff;
}
.qiang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.qiang-image {
  flex: 6;
}
.qiang-text {
  flex: 14;
  padding-left: 10px;
}
.qiang-control {
  padding-top: 10px;
}
.qiang-price {
  flex: 4;
  text-align: right;
}
.allPrice{
    color: red;
}
.totalMoeny{
 background: #fff;
  border-bottom: 1px solid #e4e7ed;
  text-align: right;
  padding: 5px;
}
</style>