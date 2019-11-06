<!--  -->
<template>
  <div class="zhuan">
    <router-link to="/" tag="p" class="zhuan_back">
      <i class="el-icon-arrow-left"></i>
      <span>专题详情</span>
    </router-link>
    <div class="zhuan_list">
      <img :src="this.arr.pic" alt />
      <div v-html="this.arr.content"></div>
    </div>
    <Guess></Guess>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services.js";
import Guess from '../components/guess'
const _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Guess,
  },
  data() {
    //这里存放数据
    return {
      arr: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let { id } = this.$route.query;
    _product.jingxuanlist(id).then(res => {
      this.arr = res.data.data;
      console.log(this.arr);
    });
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
  list-style: none;
  font-size: 0.16rem;
}
.zhuan_back {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  position: fixed;
  top: 0;
  background-color: #fff;
  i {
    margin-left: 0.2rem;
  }
  span {
    margin-left: 2.6rem;
  }
}
.zhuan_list{
    width: 95%;
    margin: 0 auto;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>