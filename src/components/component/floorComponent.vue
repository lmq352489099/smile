<template>
  <div>
    <!-- floor -->
    <div class="floor">
      <div class="floor-title">{{floorTitle}}</div>
      <div class="floor_anomaly">
        <div class="floor-one">
          <img :src="floorData0.image" width="100%" alt="">
        </div>
        <div>
          <div class="floor-two"> <img :src="floorData1.image" width="100%" alt=""></div>
          <div><img :src="floorData2.image" width="100%" alt=""></div>
        </div>
      </div>

      <div class="floor-rule">
        <div v-for="(item,index) in floorData.slice(3)" :key="index">
          <img :src="item.image" width="100%" alt="">
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ["floorData","floorTitle"],
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {}
    };
  },
  created() {},
  watch: {
    floorData: function(val) {
      console.log(val);
      
      // console.log(this.floorData);
      this.floorData0 = this.floorData[0];
      this.floorData1 = this.floorData[1];
      this.floorData2 = this.floorData[2];
    }
  }
};
</script>

<style scoped>
.floor-title{
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;

}
.floor_anomaly {
  display: flex;
  /* flex-direction: row; */
  background: #fff;
  border-bottom: 1px solid #cccccc;
}

.floor_anomaly div {
  width: 10rem;
  box-sizing: border-box;
}

.floor-one {
  border-right: 1px solid #cccccc;
}

.floor-two {
  border-bottom: 1px solid #cccccc;
}

.floor-rule {
  display: flex;
  flex-wrap: wrap;

  background: #fff;
  border-bottom: 1px solid #cccccc;
}

.floor-rule div {
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
  width: 10rem;
}

.floor-rule div:nth-child(odd) {
  border-right: 1px solid #ccc;
}
</style>
