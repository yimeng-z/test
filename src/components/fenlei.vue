<!--  -->
<template>
  <div class="fenlei">
    <div class="fenlei_top">
      <input placeholder="请搜索商品" type="text" name id />
    </div>
    <div class="fenlei_lists">
      <div class="fenlei_lists_left">
        <ul>
          <li :class="star?'b':'a'" @click="showall">全部</li>
          <li :class="index==i?'b':'a'" v-for="(v,i) in type" :key="i" @click="fenl(v,i)">{{v}}</li>
        </ul>
      </div>
      <div class="fenlei_list">
        <div class="block">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in 4" :key="item"></el-carousel-item>
          </el-carousel>
        </div>
        <ul v-show="!others">
          <router-link
            :to="{path:'/classifydetail',query:{id:v.id}}"
            v-for="(v,i) in this.$store.state.otherlist"
            :key="i"
            tag="li"
          >
            <img :src="v.icon" alt />
            <p>{{v.name}}</p>
          </router-link>
        </ul>
        <ul v-show="others">
          <router-link
            :to="{path:'/classifydetail',query:{id:v.id}}"
            v-for="(v,i) in this.$store.state.other"
            :key="i"
            tag="li"
          >
            <img :src="v.icon" alt />
            <p>{{v.name}}</p>
          </router-link>
        </ul>
        <div style="height:1.5rem"></div>
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
      //全部数据
      list: [],
      //类型
      type: [],
      //其他数据
      other: [],
      //其他
      others: true,
      star:true,
      index:99
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    fenl(v,i) {
      this.index = i
      this.others = false;
        this.star=false
      this.$store.commit("otherlist", v);
    },
    showall() {
        this.star=!this.star
      this.$store.state.otherlist = this.$store.state.other;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    _product.fenlei().then(res => {
      this.list = res.data.data;
      this.$store.state.otherlist = this.$store.state.other;
      let pid = this.list.filter(v => {
        return v.pid == 0;
      });
      console.log(this.list);
      this.$store.commit("list", this.list);
      pid.forEach(v => {
        this.type.push(v.name);
      });
      this.other = this.list.filter(v => {
        return v.pid != 0;
      });
      this.$store.commit("other", this.other);
      console.log(this.other);
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
.a{
  border: none;
  transition: all 1s;

}
.b{
   border-left: 2px solid red;
  transition: all 1s;

}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.16rem;
  .fenlei_top {
    width: 100%;
    height: 0.6rem;
    background-color: white;
    position: fixed;
    top: 0;
    z-index: 100;
    box-sizing: border-box;
    padding: 0.15rem;
    border-bottom: 1px solid #ddd;
    text-indent: 0.5rem;
    input {
      border-radius: 0.05rem;
      border: none;
      outline: none;
      height: 0.3rem;
      border: 1px solid #ddd;
      text-indent: 0.1rem;
    }
  }
  .fenlei_lists {
    display: flex;
    .fenlei_lists_left {
      margin-top: 0.6rem;
      width: 20%;
      height: 15rem;
      position: fixed;
      text-indent: 0.2rem;
      border-right: 1px solid #ddd;
      li {
        margin-top: 0.2rem;
      }
    }
  }
 
  .fenlei_list {
    width: 90%;
    margin-top: 0.6rem;
    margin-left: 0.2rem;
    .block {
      margin-top: 0.1rem;
      margin-left: 1.25rem;
      width: 4.8rem;
    }
    ul {
      display: flex;
      margin-left: 20%;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        margin-top: 0.1rem;
        width: 33.3%;
        text-align: center;
        img {
          width: 0.8rem;
          height: 0.8rem;
        }
      }
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>