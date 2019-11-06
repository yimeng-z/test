<!--  -->
<template>
  <div class="footer">
    <ul>
      <router-link to="/" tag="li" active-class="active" exact>
        <i class="el-icon-house"></i>
        <p>首页</p>
      </router-link>
      <router-link to="/classify" tag="li" active-class="active">
        <i class="el-icon-box"></i>
        <p>分类</p>
      </router-link>
      <router-link to="/cart" tag="li" active-class="active">
        <i class="el-icon-shopping-cart-2"></i>
        <mark v-show="this.$store.state.addcar.length">{{this.$store.state.addcar.length}}</mark>
        <p>购物车</p>
      </router-link>
      <router-link to="/user" tag="li" active-class="active">
        <i class="el-icon-coordinate"></i>
        <p>个人</p>
      </router-link>
    </ul>
    <transition class="slide-fade">
        <router-view></router-view>
    </transition>
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
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
@import url("../assets/css/footer.css");
.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active  {
  transition: all 1.2s ease;
}
.slide-fade-leave-active  {
  transition: all .1s cubic-bezier(2,  0.5,  0.8,  1.0);
}
.slide-fade-enter,
 .slide-fade-leave-to {
  left: 0;
  right: 0;
  transform: translateX(50px);
  opacity: 0;
}
mark {
  background-color: red;
  border-radius: 50%;
  color: white;
}
</style>