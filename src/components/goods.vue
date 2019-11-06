<!--  -->
<template>
  <div class="goods">
    <div class="goodss">
      <router-link to="/" tag="p" class="goods_back">
        <i class="el-icon-arrow-left"></i>
      </router-link>
      <van-swipe :autoplay="3000" indicator-color="white" class="block">
        <van-swipe-item v-for="(v,i) in goodsimg" :key="i">
          <img :src="v.pic" alt />
        </van-swipe-item>
      </van-swipe>
      <div class="goods_infos">
        <p class="goods_infos_p1">{{this.goodsinfo.name}}</p>
        <p class="goods_infos_p2">{{this.goodsinfo.characteristic}}</p>
        <p class="goods_infos_p3">
          <span>
            低价
            <span>￥{{this.goodsinfo.minPrice}}0</span>
          </span>
          <span>原价￥{{this.goodsinfo.originalPrice}}.00</span>
          <span>库存{{this.goodsinfo.minScore}}</span>
        </p>
      </div>
      <div class="nothing"></div>
      <div class="toggole">
        <p :class="this.cshow?'redd':'toggole_p'" @click="change">商品介绍</p>
        <p :class="!this.cshow?'redd':'toggole_p'" @click="change">商品评价</p>
      </div>
      <div v-show="cshow" class="contentlist" v-html="this.content.content"></div>
      <div v-show="!cshow" class="pingjia">
        <ul>
          <li v-for="(v,i) in judgment" :key="i">
            <img src="../assets/287977.jpg" alt />
            <div>
              <p>
                <span>{{v.user.sourceStr}}</span>
                <span>{{v.goods.goodReputationStr}}</span>
              </p>
              <p>{{v.goods.dateReputation}}</p>
              <p style="color:gray,fontSize:0.14rem">选择规格:{{v.goods.property}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div @click="bargains" class="goods_footer">立即发起砍价，最低可砍到1元</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services.js";
let _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      goodsinfo: {},
      goodsimg: [],
      content: [],
      cshow: true,
      goodsid: "",
      judgment: [],
      kanjias: [],
      tokens: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    change() {
      this.cshow = !this.cshow;
    },
    bargains() {
      this.$router.push({
        path: "/bargainInfo",
        query: {
          id: this.goodsid,
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let { id } = this.$route.query;
    this.goodsid = id;
    _product.detail(id).then(res => {
      // console.log(res.data.data);
      this.goodsinfo = res.data.data.basicInfo;
      this.goodsimg = res.data.data.pics;
      this.content = res.data.data;
      // console.log(this.goodsinfo);
      // console.log(this.goodsimg);
    });
    _product.kanjialist().then(res => {
      let a = res.data.data.result.filter(v => {
        return v.goodsId == this.goodsid;
      });
      this.kanjias = a[0].id;
      console.log(this.kanjias)
    this.$store.state.kanjiainfo=this.kanjias
    });
    let b = JSON.parse(localStorage.getItem("tokens"));
    this.tokens = b.token;

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
@import url("../assets/css/goods.css");
</style>