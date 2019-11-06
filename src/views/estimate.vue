<!--  -->
<template>
  <div class>
    <p @click="back" class="purchase_back">
      <i class="el-icon-arrow-left"></i>
      <span>发表评价</span>
    </p>
    <div>
      <ul class="estimatelist">
        <li v-for="(v,i) in orderlist" :key="i">
          <div class="estimate_img">
            <img :src="v.pic" alt />
            <div>
              <p>{{v.goodsName}}</p>
              <p class="property">{{v.property}}</p>
            </div>
          </div>
          <div class="estimate_estimate">
            <textarea
              class="submit"
              v-model="reputations[i].remark"
              name
              maxlength="200"
              placeholder="200字以内"
              id
              cols="35"
              rows="5"
            ></textarea>
            <span>还可输入{{200-reputations[i].remark.length}}</span>
            <br />
            <p>
              <span>评分：</span>
              <van-rate v-model="reputations[i].reputation" :count="3" />
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div @click="zz" class="sub">提交评价</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services";
const _product = new Product();
import axios from "axios";
import { Dialog } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      orderlist: [],
      id: "",
      orderinfo: {},
      reputations: [],
      token: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back() {
      this.$router.go(-1);
    },
    zz() {
      let obj = {
        token: this.token,
        orderId: this.id,
        reputations: this.reputations
      };
      let a = JSON.stringify(obj);
      console.log(a);
      let post = {
        token: this.token,
        postJsonString: a
      };
      _product.order(post).then(res => {
        if (res.data.code == 0) {
          Dialog.alert({
            // title: "",
            message: "评价成功"
          }).then(() => {
            // on close
          });
          this.$router.push({
            path: "/orders"
          });
        }
      });
      // axios.post(`https://api.it120.cc/small4/order/reputation?postJsonString=${a}`).then(res=>{
      //     console.log(res.data)
      // })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let { id } = this.$route.query;
    this.id = id;
    let a = JSON.parse(window.localStorage.getItem("tokens"));
    this.token = a.token;
    axios
      .post(
        `https://api.it120.cc/small4/order/detail?token=${this.token}&id=${this.id}`
      )
      .then(res => {
        this.orderinfo = res.data.data.orderInfo;
        this.orderlist = res.data.data.goods;
        for (let i in res.data.data.goods) {
          let kong = {};
          kong.id = this.orderlist[i].id;
          kong.reputation = 3;
          kong.remark = "";
          this.reputations.push(kong);
        }
        console.log(JSON.stringify(this.reputations));
        console.log(res.data.data);
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
.estimatelist {
  width: 98%;
  margin: 0 auto;
  margin-top: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 0.1rem;
  li {
    width: 98%;
    margin: 0 auto;
    margin-bottom: 0.1rem;
    .estimate_img {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 0.2rem;
      img {
        width: 1rem;
        height: 1rem;
        margin: 0.1rem;
      }
      div {
        margin-left: 0.5rem;
        width: 60%;
      }
    }
    .estimate_estimate {
      width: 98%;
      //   height: 1rem;
      border: 1px solid #ddd;
      margin: 0 auto;
      border-radius: 0.1rem;
      margin-bottom: 0.2rem;
      text-align: center;
      .submit {
        border-radius: 0.1rem;
        margin: 0.2rem 0;
        text-indent: 0.1rem;
      }
      p {
        width: 80%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
      }
    }
  }
}
.sub {
  width: 80%;
  height: 0.8rem;
  background-color: darkslategray;
  border-radius: 0.1rem;
  text-align: center;
  line-height: 0.8rem;
  color: white;
  margin: 0 auto;
  margin-top: 0.2rem;
}
</style>