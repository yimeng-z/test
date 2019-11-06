<!--  -->
<template>
  <div class="goods">
    <div class="goodss">
      <!-- <router-link to="/" tag="p"> -->
      <p class="goods_back" @click="back">
        <i class="el-icon-arrow-left"></i>
      </p>
      <!-- </router-link> -->
      <van-swipe :autoplay="3000" indicator-color="white" class="block">
        <van-swipe-item v-for="(v,i) in goodsimg" :key="i">
          <img :src="v.pic" alt />
        </van-swipe-item>
      </van-swipe>
      <div v-show="!showadd" class="detal_infos">
        <div class="detal_infos_top">
          <img :src="this.goodsinfo.pic" alt />
          <div>
            <p class="goodsinfo_name" v-html="this.goodsinfo.name"></p>
            <p ref="changeprice" class="goodsinfo_price">￥{{this.goodsinfo.minPrice}}</p>
          </div>
          <span @click="hideadd">X</span>
        </div>
        <div class="goods_type" v-for="(v,i) in type" :key="i">
          <p>{{v.name}}</p>
          <div v-show="v.childsCurGoods.length>1">
            <span
              :class="indexs==item.id+','+item.name?'typesizes':'typesize'"
              @click="sizes(item,index)"
              v-for="(item,index) in v.childsCurGoods"
              :key="index"
            >{{item.name}}</span>
          </div>
          <div v-show="v.childsCurGoods.length<=1">
            <span
              :class="indexs1==item.id+','+item.name?'typesizes':'typesize'"
              @click="sizee(item,index)"
              v-for="(item,index) in v.childsCurGoods"
              :key="index"
            >{{item.name}}</span>
          </div>
        </div>
        <div class="detal_infos_bottom">
          <span>购买数量</span>
          <p>
            <button @click="jiannum">-</button>
            <span>{{this.num}}</span>
            <button @click="addnum">+</button>
          </p>
        </div>
        <p class="detal_addcar" @click="add">加入购物车</p>
      </div>
      <div class="goods_infos" v-show="showadd">
        <p class="goods_infos_p1">{{this.goodsinfo.name}}</p>
        <p class="goods_infos_p2">{{this.goodsinfo.characteristic}}</p>
        <p class="goods_infos_p3">
          <span>
            低价
            <span>￥{{this.goodsinfo.minPrice}}</span>
          </span>
          <span>原价￥{{this.goodsinfo.originalPrice}}.00</span>
          <span>库存{{this.goodsinfo.minScore}}</span>
        </p>
      </div>
      <div class="nothing"></div>
      <div class="toggole">
        <p :class="this.cshow?'redd':'toggole_p'" @click="change">商品介绍</p>
        <p :class="!this.cshow?'redd':'toggole_p'" @click="change">商品评价</p>
      </div>
      <div v-show="cshow" class="contentlist" v-html="this.content.content"></div>
      <div v-show="!cshow" class="pingjia">
        <ul>
          <li v-for="(v,i) in judgment" :key="i">
            <img src="../assets/287977.jpg" alt />
            <div>
              <p>
                <span>评价：{{v.goods.goodReputationRemark}}</span>
                <span>{{v.goods.goodReputationStr}}</span>
              </p>
              <p>{{v.goods.dateReputation}}</p>
              <p style="color:gray,fontSize:0.14rem">选择规格:{{v.goods.property}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="detal_footer" v-show="showadd">
      <span>
        <i class="el-icon-headset"></i>
      </span>
      <router-link to="/cart" tag="span">
        <i class="el-icon-shopping-cart-2"></i>
        <mark v-show="this.$store.state.addcar.length">{{this.$store.state.addcar.length}}</mark>
      </router-link>
      <span>
        <i class="el-icon-star-off"></i>
      </span>
      <span>立即购买</span>
      <span class="add" @click="showadds">加入购物车</span>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Dialog } from "vant";
import Product from "../services/views-services.js";
const _product = new Product();
import toLocal from "../utils/tolocal";
import axios from "axios";
function sp(v) {
  let str = v;
  let arr = str.split(",");
  let id = arr[0];
  let type = arr[1];
  return {
    id,
    type
  };
}

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      goodsinfo: {},
      goodsimg: [],
      content: [],
      cshow: true,
      showadd: true,
      type: [],
      num: 1,
      indexs: "",
      indexs1: "",
      biggoodsid: "",
      datas: {},
      // shoplist:[],
      judgment: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    "$store.state.addcar": {
      handler: function() {
        toLocal.save("newaddcar", this.$store.state.addcar);
      },
      deep: true
    }
  },
  //方法集合
  methods: {
    sizes(item, index) {
      this.indexs = item.id + "," + item.name;
      console.log(item.id, item.propertyId);
      console.log(this.goodsinfo.id);
      let arr = {
        goodid: this.goodsinfo.id,
        proprty: item.id,
        childs: item.propertyId
      };
      _product.detailprice(arr).then(res => {
        this.datas = res.data.data;
        window.localStorage.setItem("goodsinfo", JSON.stringify(this.datas));
        console.log(this.datas);
        this.$refs.changeprice.innerHTML = "￥" + res.data.data.price;
      });
    },
    sizee(item, index) {
      this.indexs1 = item.id + "," + item.name;
      // if(this.type.length>1){
      //     let arr = {
      //     goodid:this.goodsinfo.id,
      //     proprty:item.id,
      //     childs:item.propertyId
      //   }
      //   _product.detailprice(arr).then(res=>{
      //     this.datas = res.data.data
      //     console.log(res.data.data)
      //     this.$refs.changeprice.innerHTML="￥" + res.data.data.price
      //   })
      // }
    },
    jiannum() {
      this.num--;
      if (this.num < 1) {
        this.num = 1;
      }
    },
    change() {
      this.cshow = !this.cshow;
    },
    back() {
      this.$router.go(-1);
    },
    showadds() {
      this.showadd = false;
    },
    hideadd() {
      this.showadd = true;
    },
    add() {
      if (this.type.length > 1) {
        if (!this.indexs) {
          // alert("请选择商品尺码");
          Dialog.alert({
            // title: "",
            message: "请选择商品尺码"
          }).then(() => {
            // on close
          });
          return;
        }
        if (!this.indexs1) {
          // alert("请选择商品颜色");
          Dialog.alert({
            // title: "",
            message: "请选择商品颜色"
          }).then(() => {
            // on close
          });
          return;
        }
      } else if ((this.type.length = 1)) {
        if (!this.indexs && !this.indexs1) {
          // alert("请选择商品规格");
          Dialog.alert({
            // title: "",
            message: "请选择商品规格"
          }).then(() => {
            // on close
          });
          return;
        }
      }
      let huang = sp(this.indexs);
      let chuan = sp(this.indexs1);
      let obj = {
        pic: this.goodsinfo.pic,
        name: this.goodsinfo.name,
        price: this.goodsinfo.minPrice,
        num: this.num,
        check: true,
        sizeid: huang.id,
        sizestr: huang.type,
        colorid: chuan.id,
        colorstr: chuan.type,
        id: this.goodsinfo.id,
        time: new Date().getTime(),
        bigid: this.biggoodsid
      };
      this.indexs = "";
      this.indexs1 = "";
      Dialog.alert({
        // title: "",
        message: "加入购物车成功"
      }).then(() => {
        // on close
      });
      // alert("加入购物车成功");
      this.showadd = true;
      this.$store.commit("carlist", obj);
    },
    addnum() {
      this.num++;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let { id } = this.$route.query;
    this.biggoodsid = id;
    _product.detail(id).then(res => {
      this.goodsinfo = res.data.data.basicInfo;
      this.goodsimg = res.data.data.pics;
      this.content = res.data.data;
      this.type = res.data.data.properties;
    });

    _product.goodsjudgment(id).then(res => {
      this.judgment = res.data.data;
      this.judgment.forEach(v => {
        console.log(v);
      });
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
@import url("../assets/css/goods.css");
.detal_footer {
  width: 100%;
  height: 0.6rem;
  position: fixed;
  bottom: 0rem;
  z-index: 25;
  text-align: center;
  display: flex;
  justify-content: space-around;
  line-height: 0.6rem;
  color: black;
  background-color: #fff;
  font-size: 0.25rem;
  span {
    border-right: 1px solid #eee;
    width: 20%;
    i {
      font-size: 0.3rem;
      color: gray;
    }
  }
  .add {
    background-color: darkred;
    color: #fff;
  }
}
.detal_infos {
  position: fixed;
  background-color: white;
  width: 100%;
  bottom: 0;
  margin: 0 auto;
  .detal_infos_top {
    width: 95%;
    margin: 0 auto;
    height: 1.8rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-top: 0.15rem;
    }
    div {
      margin-left: 0.5rem;
      height: 1.8rem;
      line-height: 0.5rem;
      .goodsinfo_name {
        margin-top: 0.5rem;
      }
      .goodsinfo_price {
        color: red;
        font-weight: bolder;
      }
    }
    span {
      margin-left: 1.2rem;
      margin-top: 0.2rem;
      width: 0.3rem;
      height: 0.3rem;
      border: 1px solid #eee;
      text-align: center;
      border-radius: 50%;
      color: gray;
    }
  }
  .goods_type {
    p {
      margin: 0.2rem;
    }
    div {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.1rem;
      .typesize {
        width: 35%;
        border: 1px solid #ddd;
        text-align: center;
        margin: 0.2rem;
        padding: 0.2rem;
        border-radius: 0.1rem;
      }
      .typesizes {
        width: 35%;
        border: 1px solid red;
        text-align: center;
        margin: 0.2rem;
        padding: 0.2rem;
        border-radius: 0.1rem;
      }
    }
  }
}
.detal_infos_bottom {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    button {
      width: 0.5rem;
      height: 0.5rem;
      background-color: #eee;
      border: none;
      border-radius: 0.05rem;
    }
    span {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
.detal_addcar {
  width: 100%;
  height: 0.6rem;
  text-align: center;
  line-height: 0.6rem;
  color: white;
  background-color: red;
}
mark {
  background-color: red;
  border-radius: 50%;
  color: white;
}
.pingjia {
  width: 100%;
  ul {
    li {
      width: 100%;
      height: 1.6rem;
      border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 0.6rem;
        height: 0.6rem;
      }
      div {
        width: 60%;
        margin-left: 0.6rem;
        line-height: 0.4rem;
      }
    }
  }
}
</style>