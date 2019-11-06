<!--  -->
<template>
  <div class="payment">
    <p @click="back" class="purchase_back">
      <i class="el-icon-arrow-left"></i>
      <span>确认订单</span>
    </p>
    <div class="payment_money">
      <span class="el-icon-wallet"></span>
      <div>
        <p>
          <span>商品总额：</span>
          <span>￥{{this.$store.getters.checkprice}}.00</span>
        </p>
        <p>订单编号:{{this.$store.state.orderNumber.orderNumber}}</p>
      </div>
    </div>
    <div class="payment_address">
      <i class="el-icon-location-information"></i>
      <div>
        <p>{{this.$store.state.defaultress.linkMan}}{{this.$store.state.defaultress.mobile}}</p>
        <p>{{this.$store.state.defaultress.provinceStr}}{{this.$store.state.defaultress.cityStr}}{{this.$store.state.defaultress.areaStr}}</p>
      </div>
    </div>
    <!-- <router-link to="/orders" class="payment_bottom" tag=""></router-link> -->
    <div class="payment_bottom" @click="jump">微信支付 ￥{{this.$store.getters.checkprice}}.00</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    tureaddress() {
      return this.$store.getters.defaultaddress;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back() {
      this.$router.go(-1);
    },
    jump() {
      this.$router.push({
        path: "/orders"
      });
      this.$store.commit("checkdel");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$store.state.orderNumber);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
* {
  margin: 0;
  padding: 0;
  font-size: 0.16rem;
  list-style: none;
}
.purchase_back {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  position: fixed;
  top: 0;
  background-color: #fff;
  i {
    margin-left: 0.2rem;
    font-size: 0.3rem;
  }
  span {
    margin-left: 2.4rem;
  }
}
.payment_money {
  margin-top: 0.9rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 0.2777777778rem;
  height: 1.5972222222rem;
  border-top: 1px solid #e9e9e9;
  border-bottom: 0.1041666667rem solid #fbfbfb;
  .el-icon-wallet {
    font-size: 0.6rem;
    color: red;
  }
  div {
    margin-left: 0.4rem;
    line-height: 0.4rem;
    span:nth-child(2) {
      color: red;
    }
  }
}
.payment_address {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 0.2777777778rem;
  height: 1.5972222222rem;
  border-top: 1px solid #e9e9e9;
  border-bottom: 0.1041666667rem solid #fbfbfb;
  .el-icon-location-information {
    font-size: 0.6rem;
    color: blue;
  }
  div {
    margin-left: 0.4rem;
    line-height: 0.4rem;
  }
}
.payment_bottom {
  width: 100%;
  height: 0.8rem;
  background-color: darkred;
  text-align: center;
  line-height: 0.8rem;
  color: white;
  position: fixed;
  bottom: 0;
}
</style>