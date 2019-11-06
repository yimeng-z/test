<!--  -->
<template>
  <div class="mine">
    <div class="mine_top">
      <p>
        <i class="el-icon-user"></i>
      </p>
      <div>
        <router-link v-show="!chack" to="/login" tag="p">点击登陆</router-link>
        <p v-show="chack">{{this.user.mobile}}</p>
        <p>积分：0</p>
      </div>
    </div>
    <div class="mine_banner">
      <i class="el-icon-orange"></i>
      <span>新线上更稳定的付费快递查询接口</span>
    </div>
    <div class="nothing"></div>
    <div class="mine_order">
      <router-link to="/orders" tag="div">
        <i class="el-icon-document"></i>
        <span>我的订单</span>
      </router-link>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="mine_nav">
      <ul>
        <li>
          <i class="el-icon-bank-card"></i>
          <p>待付款</p>
        </li>
        <li>
          <i class="el-icon-collection"></i>
          <p>代发货</p>
        </li>
        <li>
          <i class="el-icon-truck"></i>
          <p>待收货</p>
        </li>
        <li @click="waitestimate">
          <i class="el-icon-chat-line-square"></i>
          <p>待评价</p>
        </li>
      </ul>
    </div>
    <div class="nothing"></div>
    <div class="mine_banner1">
      <ul>
        <li>
          <i style="color:#F86636" class="el-icon-food"></i>
          <p>我的余额</p>
          <p style="color:gray">0元</p>
        </li>
        <li>
          <i style="color:#F86636" class="el-icon-chicken"></i>
          <p>我的砍价</p>
        </li>
        <li>
          <i style="color:#EDB449" class="el-icon-sugar"></i>
          <p>我的礼券</p>
        </li>
        <li>
          <i style="color:#EDB449" class="el-icon-ice-cream"></i>
          <p>我的收藏</p>
        </li>
        <router-link to="/user_address" tag="li">
          <i style="color:#5A9FEC" class="el-icon-hot-water"></i>
          <p>我的地址</p>
        </router-link>
        <li>
          <i style="color:#5A9FEC" class="el-icon-tableware"></i>
          <p>联系客服</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from "axios";
import toLocal from "../utils/tolocal";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      chack: false,
      tokens: "",
      user: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    waitestimate(){
      this.$router.push({
        path:"/waitestimate"
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let tok = JSON.parse(localStorage.getItem("tokens"));
    console.log(tok);
    this.$store.state.tokens = tok.token;
    this.tokens = this.$store.state.tokens;
    console.log(this.tokens);
    axios
      .post(`https://api.it120.cc/small4/user/detail?token=${this.tokens}`)
      .then(res => {
        if (res.data.code == 0) {
          this.chack = true;
          this.user = res.data.data.base;
        }
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
.mine {
  width: 100%;
  .mine_top {
    width: 100%;
    height: 3rem;
    background-color: #b9aa83;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
      width: 30%;
      text-align: end;
      i {
        font-size: 1rem;
        color: white;
      }
    }
    div {
      width: 87%;
      color: white;
    }
  }
  .mine_banner {
    width: 100%;
    height: 1rem;
    background-color: white;
    line-height: 1rem;
    color: red;
    text-indent: 0.2rem;
  }
  .nothing {
    width: 100%;
    height: 0.2rem;
    background-color: #f5f5f5;
  }
  .mine_order {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    text-indent: 0.2rem;
    border-bottom: 1px solid #ddd;
    div {
      width: 80%;
      display: flex;
      align-items: center;
      i {
        font-size: 0.4rem;
        color: gray;
      }
    }
  }
  .mine_nav {
    width: 100%;
    height: 1.2rem;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        text-align: center;
        margin-top: 0.1rem;
        width: 25%;
        i {
          font-size: 0.5rem;
          color: gray;
          margin-bottom: 0.1rem;
        }
      }
    }
  }
  .mine_banner1 {
    width: 100%;
    height: 5rem;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      li {
        width: 33.3%;
        margin-top: 0.5rem;
        text-align: center;
        i {
          font-size: 0.5rem;
        }
      }
    }
  }
}
</style>