<!--  -->
<template>
  <div class="header">
    <div class="header_top" v-show="show">
      <img src="../assets/287977.jpg" alt />
    </div>
    <div class="block">
      <el-carousel width="100%" height="4.5rem" trigger="click">
        <el-carousel-item width="100%" height="4.5rem" v-for="(v,i) in list" :key="i">
          <a :href="v.linkUrl" target="blank">
            <img :src="v.picUrl" alt />
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="nav">
      <ul>
        <router-link to="/sigin" tag="li">
          <i class="el-icon-potato-strips"></i>
          <p>签到</p>
        </router-link>
        <router-link to="/gift" tag="li">
          <i class="el-icon-ice-tea"></i>
          <p>礼券</p>
        </router-link>
        <router-link to="/bargain" tag="li">
          <i class="el-icon-milk-tea"></i>
          <p>砍价</p>
        </router-link>
        <router-link to="/special" tag="li">
          <i class="el-icon-grape"></i>
          <p>专栏</p>
        </router-link>
      </ul>
    </div>
    <div class="nothing"></div>
    <router-link to="/bargain" tag="p" class="kanjia">
      全民砍价
      <i class="el-icon-video-play"></i>
    </router-link>
    <div class="first_lists">
      <router-link
        :to="{path:'/goods',query:{id:v.id}}"
        v-for="(v,i) in bargain"
        :key="i"
        tag="div"
        class="first_list"
      >
        <div class="first_list_left">
          <img :src="v.pic" alt />
        </div>
        <div class="first_list_right">
          <p class="first_list_right_p1" v-html="v.name"></p>
          <p class="first_list_right_gray">{{v.characteristic}}</p>
          <div class="first_list_right_small">
            <div>
              <p class="first_list_right_red">￥{{v.minPrice}}.00</p>
              <p>低价</p>
            </div>
            <div>
              <p class="first_list_right_gray">￥{{v.originalPrice}}.00</p>
              <p class="first_list_right_gray">原价</p>
            </div>
            <div>
              <p class="first_list_right_gray">{{v.stores}}件</p>
              <p class="first_list_right_gray">限量</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="nothing"></div>
    <router-link to="/special" tag="p" class="kanjia">
      精选专题
      <i class="el-icon-video-play"></i>
    </router-link>
    <div class="special_lists">
      <router-link
        :to="{path:'/zhuan',query:{id:v.id}}"
        v-for="(v,i) in actical"
        :key="i"
        tag="div"
        class="special_list"
      >
        <img :src="v.pic" alt />
        <p class="special_list_title">{{v.title}}</p>
        <p class="special_list_descript">{{v.descript}}</p>
      </router-link>
    </div>
    <div class="nothing"></div>
    <router-link to="/" tag="p" class="kanjia">
      人气推荐
      <i class="el-icon-video-play"></i>
    </router-link>
    <div class="renqi_lists">
      <router-link
        :to="{path:'/detal',query:{id:v.id}}"
        v-for="(v,i) in renqi"
        :key="i"
        tag="div"
        class="renqi_list"
      >
        <img :src="v.pic" alt />
        <div>
          <p>{{v.name}}</p>
          <p class="renqi_list_characteristic">{{v.characteristic}}</p>
          <p class="renqi_list_minPrice">￥{{v.minPrice}}0</p>
        </div>
      </router-link>
    </div>
    <div style="height:1rem"></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services.js";
const _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      list: [],
      bargain: [],
      actical: [],
      renqi: [],
      show: false,
      scroll: 0,
      actical1: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    homeshowf() {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scroll >= 400) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    _product.list().then(res => {
      this.list = res.data.data;
    });
    _product.first().then(res => {
      // console.log(res.data.data);
      this.bargain = res.data.data.filter(v => {
        return v.stores == 100;
      });
      this.renqi = res.data.data.filter(v => {
        return v.recommendStatusStr == "推荐";
      });
      this.renqi = this.renqi.slice(0, 4);
      // console.log(this.bargain);
      // console.log(this.renqi);
    });
    _product.jingxuan().then(res => {
      this.actical1 = res.data.data;
      this.$store.commit("jingxuan", this.actical1);
      this.actical = this.actical1.slice(0, 3);
      // console.log(res.data.data)
    });
   
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    window.addEventListener("scroll", this.homeshowf);
  },
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
@import url("../assets/css/first.css");
</style>