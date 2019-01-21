<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img class="location-icon" :src="locationIcon" width="80%" alt="">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size='mini'>查找</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy='banner.image' width="100%" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width='90%' />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- adbanner area -->
    <div>
      <img v-lazy="adBanner" width="100%" alt="">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recomment-item">
              <img :src="item.image" width="80%" alt="">
              <div>{{item.goodsName}}</div>
              <div>¥{{item.price | moneyFilter}}(¥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--  floor -->

    <!-- <floor-component :floorData="floor1"></floor-component> -->
    <floor-component :floorData="floor1" :floorTitle='floorName.floor1'></floor-component>
    <floor-component :floorData="floor2" :floorTitle='floorName.floor2'></floor-component>
    <floor-component :floorData="floor3" :floorTitle='floorName.floor3'></floor-component>

    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item ,index) in hotGoods" :key="index">
              <goodInfo :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodInfo>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import swiperDefault from "../swiper/swiperDefault.vue";
import swiperDefault2 from "../swiper/swiperDefault.2.vue";
import swiperDefault3 from "../swiper/swiperDefault3.vue";
import floorComponent from "../component/floorComponent.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import { toMoney } from "@/filter/moneyFilter.js";

import goodInfo from "../component/goodsInfoComponents.vue";

import url from "@/serviceAPI.config.js";

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      msg: "Shopping Mall",
      locationIcon: require("../../assets/image/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [] //热卖商品
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  components: {
    swiper,
    swiperSlide,
    swiperDefault,
    swiperDefault2,
    swiperDefault3,
    floorComponent,
    goodInfo
  },
  created() {
    axios({
      url: url.getShopingMallInfo,
      method: "get"
    })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          this.category = res.data.data.category;
          this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = res.data.data.slides;
          this.recommendGoods = res.data.data.recommend;
          this.floor1 = res.data.data.floor1;
          this.floor2 = res.data.data.floor2;
          this.floor3 = res.data.data.floor3;
          this.floorName = res.data.data.floorName;
          this.hotGoods = res.data.data.hotGoods;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}

.search-input {
  width: 100%;
  height: 1.3rem;
  border: 0;
  border-bottom: 1px solid #ffffff !important;
  background: #e5017d;
  color: #ffffff;
}

.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}

.swiper-area {
  clear: both;
  overflow: hidden;
  max-height: 10rem;
}

.type-bar {
  background: #ffffff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.type-bar > div:nth-child(1) img {
  width: 15vw;
}

.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}

.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}

.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}

.recommend-body {
  border-bottom: 1px solid #eee;
}

.recomment-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  height: 130rem;
  background: #fff;
  overflow: hidden;
}
</style>
