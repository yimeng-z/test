<!--  -->
<template>
  <div class="purchase">
    <p @click="back" class="purchase_back">
      <i class="el-icon-arrow-left"></i>
      <span>确认订单</span>
    </p>
    <router-link v-show="defaultadd" to="/user_address" tag="div" class="purchase_top">
      <i class="el-icon-location-information"></i>
      <div >
        <p>{{defaultadd.linkMan}}{{defaultadd.mobile}}</p>
        <p>{{defaultadd.provinceStr}}{{defaultadd.cityStr}}{{defaultadd.areaStr}}</p>
      </div>
      <i class="el-icon-arrow-right"></i>
    </router-link>
    <!-- <router-link v-show="!trueaddress" to="/user_address" tag="div" class="purchase_top">
      <i class="el-icon-location-information"></i>
      <div>
        添加地址
      </div>
      <i class="el-icon-arrow-right"></i>
    </router-link> -->
    <div class="purchase_nothing"></div>
    <p class="purchase_goodslist">商品列表</p>
    <div class="purchase_goodslists">
      <ul>
        <li v-for="(v,i) in this.$store.getters.checkstr" :key="i">
          <img :src="v.pic" alt />
          <div>
            <p>{{v.name}}</p>
            <p style="color:gray">{{v.sizestr}} {{v.colorstr}}</p>
          </div>
          <div>
            <p>￥{{v.price}}</p>
            <p style="color:gray">x{{v.num}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="purchase_nothing"></div>
    <p class="dispatch">
      <span>配送方式</span>
      <span class="express">快递</span>
    </p>
    <p class="remarks">
      <span>备注</span>
      <input type="text" placeholder="如需备注请输入" name id />
    </p>
    <div class="purchase_nothing"></div>
    <p class="dolla">
      <span>商品金额</span>
      <span>￥{{this.$store.getters.checkprice}}</span>
    </p>
    <div class="purchase_bottom">
      <span>合计：￥{{this.$store.getters.checkprice}}</span>
      <span @click="submitt">提交订单</span>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services";
const _product = new Product();
import toLocal from "../utils/tolocal";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      gettoken: {},
      datas: {},
      orderlist: [],
      defaultadd:{}
    };
  },
  //监听属性 类似于data概念
  computed: {
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back() {
      this.$router.go(-1);
    },
    submitt() {
      console.log(this.$store.state.tokens);
      let obj = {
        goodsId: this.datas.goodsId,
        number: 2,
        propertyChildIds: this.datas.propertyChildIds,
        logisticsType: 0
      };
      this.orderlist.push(obj);
      let b = JSON.stringify(this.orderlist);
      let arr = {
        token: this.gettoken.token,
        a: b
      };
      _product.getorder(arr).then(res => {
        this.$store.state.orderNumber = res.data.data
        if(res.data.code==0){
          this.$router.push({
            path:"/payment",
            query:{
              id:res.data.data.id
            }
          })
        }
      });
      // this.$store.commit("checkdel");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.datas = JSON.parse(window.localStorage.getItem("goodsinfo"));
    let a = JSON.parse(localStorage.getItem("tokens"));
    this.gettoken = a;
    // console.log(this.gettoken);
    // console.log(this.datas);
    // console.log(this.trueaddress)
    _product.defaultadd(this.gettoken.token).then(res=>{
      this.defaultadd=res.data.data
      console.log(res.data.data)
      this.$store.state.defaultress=this.defaultadd
      
      // console.log(res.data.data)
    })
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
.purchase_top {
  width: 100%;
  height: 1.5rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: #ddd 1px solid;
  i {
    font-size: 0.3rem;
    color: gray;
  }
}
.purchase_nothing {
  width: 100%;
  height: 0.2rem;
  background-color: #f5f5f5;
}
.purchase_goodslist {
  width: 100%;
  height: 0.8rem;
  text-indent: 0.3rem;
  line-height: 0.8rem;
  border-bottom: 2px solid #f5f5f5;
}
.purchase_goodslists {
  width: 100%;
  ul {
    width: 95%;
    margin: 0 auto;
    li {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      line-height: 0.4rem;
      box-sizing: border-box;
      padding: 0.2rem;
      img {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
.dispatch {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  text-indent: 0.2rem;
  border-bottom: 1px solid #ddd;
  .express {
    margin-left: 3.8rem;
  }
}
.remarks {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  text-indent: 0.2rem;
  border-bottom: 1px solid #ddd;
  input {
    margin-left: 1rem;
    border: none;
    outline: none;
  }
}
.dolla {
  width: 90%;
  height: 0.8rem;
  line-height: 0.8rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 0.22rem;
  }
}
.purchase_bottom {
  width: 100%;
  height: 0.8rem;
  position: fixed;
  border-top: 1px solid #ddd;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span:nth-of-type(1) {
    margin-right: 0.4rem;
  }
  span:nth-of-type(2) {
    width: 2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    background-color: red;
    color: white;
  }
}
</style>