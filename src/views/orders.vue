<!--  -->
<template>
  <div class>
    <p @click="back" class="purchase_back">
      <i class="el-icon-arrow-left"></i>
      <span>我的订单</span>
    </p>
    <div class="orederlist">
      <ul>
        <li v-for="(v,i) in shuxing" :key="i">
          <div class>
            <div v-for="(item,index) in shuxing[i]" :key="index" class="list_img">
              <img :src="item.pic" alt />
              <div>
                <p class="property">{{item.goodsName}}</p>
                <p class="property">{{item.property}}</p>
              </div>
            </div>
          </div>
          <div
            class="list_status"
            v-if="item2.id==i"
            v-for="(item2,index2)  in orderlist"
            :key="index2"
          >
            <!-- <router-link to="/estimate"></router-link> -->
            <p>{{item2.statusStr}}</p>
            <mark v-text="item2.statusStr=='待评价'?'去评价':''" @click="gotoestimate(item2.id)"></mark>
            <p>{{item2.orderNumber}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services";
const _product = new Product();
import axios from "axios";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      shuxing: "",
      orderlist: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    gotoestimate(ids) {
      this.$router.push({
        path:"/estimate",
        query:{
          id:ids
        }
      })
      console.log(ids);
    },
    back() {
      this.$router.go(-1);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let a = JSON.parse(window.localStorage.getItem("tokens"));
    let b = a.token;
    axios
      .post(`https://api.it120.cc/small4/order/list?token=${b}`)
      .then(res => {
        console.log(res.data.data);
        console.log(res.data.data.orderList);
        this.shuxing = res.data.data.goodsMap;
        let order = Object.keys(this.shuxing);
        console.log(order);
        this.orderlist = res.data.data.orderList.filter(v => {
          return order.map(j => {
            return v.orderId == j;
          });
        });
        // this.$store.state.orderDetail=this.orderlist.filter(v=>{
        //   return v.statusStr == "待评价"
        // })
        // console.log(this.$store.state.orderDetail)
      });
    // console.log(this.$store.state.orderNumber.orderNumber)
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
.orederlist {
  margin-top: 0.8rem;
  ul {
    width: 100%;
    li {
      width: 95%;
      margin: 0 auto;
      display: flex;
      margin-top: 0.1rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.1rem;
      align-items: center;
      .list_img {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-block-start: 0.1rem;
        img {
          width: 1rem;
          height: 1rem;
        }
        div {
          line-height: 0.4rem;
          margin-left: 0.2rem;
          .property {
            width: 2.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .list_status {
        width: 20%;
        margin-left: 0.2rem;
      }
    }
  }
}
</style>