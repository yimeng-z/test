<!--  -->
<template>
  <div class>
    <router-link to="/" tag="p" class="special_top">
      <i class="el-icon-arrow-left"></i>
      <span>严选专栏</span>
    </router-link>
    <div style="height:0.6rem"></div>
    <div class="special_lists">
      <div class="special_list" v-for="(v,i) in jingxuan" :key="i">
        <img :src="v.pic" alt />
        <div>
          <p v-html="v.title"></p>
          <p class="special_descript" v-html="v.descript"></p>
          <router-link
            :to="{path:'/zhuan',query:{id:v.id}}"
            :key="i"
            tag="p"
            class="check"
          >查看详情</router-link>
        </div>
      </div>
    </div>
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
      jingxuan: []
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
    _product.jingxuan().then(res => {
      this.jingxuan = res.data.data;
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
  font-size: 0.16rem;
  list-style: none;
}
.special_top {
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
.special_list {
  width: 95%;
  margin: 0 auto;
  position: relative;
  img {
    background: rgba($color: #000000, $alpha: 0.8);
    width: 100%;
    height: 4.5rem;
  }
  div {
    position: absolute;
    color: white;
    top: 1.5rem;
    text-align: center;
    p {
      font-size: 0.3rem;
    }
    .special_descript {
      width: 6rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 0.2rem;
    }
    .check {
      width: 1.6rem;
      margin-top: 0.2rem;
      height: 0.5rem;
      margin-left: 2.2rem;
      border-radius: 0.1rem;
      line-height: 0.5rem;
      border: 1px solid #fff;
      color: #fff;
    }
  }
}
</style>