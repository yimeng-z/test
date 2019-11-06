<!--  -->
<template>
  <div class="classifydetail">
    <p class="classifydetail_top" @click="back">
      <i class="el-icon-arrow-left"></i>
      <span>分类商品</span>
    </p>
    <div class="none_classify" v-show="!classifydetail.length">
        暂无数据哦
    </div>
    <div class="cars_lists" v-show="classifydetail.length">
      <ul>
        <router-link
          :to="{path:'/detal',query:{id:v.id}}"
          v-for="(v,i) in classifydetail"
          :key="i"
          tag="li"
        >
          <img :src="v.pic" alt />
          <div>
            <p class="name" v-html="v.name"></p>
            <p class="miaoshu">{{v.characteristic}}</p>
            <p class="num">￥{{v.minPrice}}0</p>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services";
const _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      classifydetail: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      back(){
          this.$router.go(-1)
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let id = this.$route.query.id;
    console.log(id);
    _product.first().then(res => {
      this.classifydetail = res.data.data.filter(v => {
        return v.categoryId == id;
      });
      console.log(this.classifydetail);
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
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 0.16rem;
}
.none_classify{
    width: 100%;
    height: 5rem;
    text-align: center;
    line-height: 5rem;
}
.classifydetail_top {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  top: 0;
  background-color: #fff;
  i {
    margin-left: 0.2rem;
  }
  span {
    margin-left: 2.6rem;
  }
}
.cars_lists {
  width: 98%;
  margin: 0 auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 48%;
      height: 3.5rem;
      position: relative;
      margin-right: 0.12rem;
      img {
        width: 3rem;
        height: 3rem;
      }
      div {
        position: absolute;
        top: 2.1rem;
        p {
          margin-top: 0.1rem;
          width: 3rem;
          overflow: hidden;
        }
        .name {
          height: 0.4rem;
          line-height: 0.4rem;
          background-color: goldenrod;
        }
        .miaoshu {
          width: 3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .num {
          color: red;
          font-weight: bolder;
        }
      }
    }
  }
}
</style>