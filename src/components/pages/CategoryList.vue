<template>
  <div>
    <div class="navbar-div">
      <!-- > //fixede 可以头部吸顶 -->
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li @click="clickCategory(index,item.ID)" :class="{categorySActive:categoryIndex==index}" v-for="(item,index) in category"
                :key="index">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
          {{active}}
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <!-- 最多的数据 -->
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodsList" :key="index">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%"
                    :onerror="errorImg" 
                    >
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>¥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>

          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { toMoney } from "@/filter/moneyFilter.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [], //小类类别
      active: 0, // 激活标签的值
      loading: false,
      finished: false, //上啦刷新
      page: 1, //商品列表的页数
      goodsList: [], //商品列表信息
      categorySubId: "", // 商品子类的ID
      isRefresh: false, //下拉刷新
      errorImg: 'this.src="' + require("@/assets/image/图片.png") + '"' //vue中默认图片实现
    };
  },

  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight; // mounted 才能搞原生
    document.getElementById("leftNav").style.height =
      winHeight - 46 - 50 + "px";
    document.getElementById("list-div").style.height =
      winHeight - 90 - 50 + "px";
  },
  filters: {
    moneyFilter(value) {
      return toMoney(value);
    }
  },
  methods: {
    // 获取左侧的数据并且传递数据给顶部的
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            this.category = res.data.message;

            this.getCategorySubByCategoryID(this.category[0].ID);
          } else {
            Toast("服务器错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodsList = [];
      this.getCategorySubByCategoryID(categoryId);
    },
    //   根据大类(左侧)ID读取 小类(顶部)类别列表
    getCategorySubByCategoryID(categoryId) {
      axios({
        url: url.getCategorySub,
        method: "post",
        data: {
          categoryId: categoryId
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            this.categorySub = res.data.message;
            this.active = 0;
            this.categorySubId = this.categorySub[0].ID; //获取子类的商品详细信息
            this.onLoad();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //上啦加载方法
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        // this.categorySubId = this.categorySub[0].ID;
        this.getGoodList();
      }, 1000);
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodsList = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },
    getGoodList() {
      axios({
        url: url.getGoodsListCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message.length) {
            this.page++;
            this.goodsList = this.goodsList.concat(res.data.message);
          } else {
            this.finished = true; // 上啦加载 没数据了 就不完成了
          }
          this.loading = false; //请求完事了
        })
        .catch(error => {
          console.log(error);
        });
    },
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      console.log("id" + this.categorySubId);
      this.goodsList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    //跳转到商品详细页
    goGoodsInfo(id) {
      this.$router.push({ name: "Goods", params: { goodsId: id } });
    }
  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}

#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}

.categorySActive {
  background: #fff;
}

/* .list-item {
    text-align: center;
    line-height: 80px;
    border-bottom: 1px solid #f0f0f0;
    background: #fff;
  } */

.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}

#list-div {
  overflow: scroll;
}

.list-item-img {
  flex: 8;
}

.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
