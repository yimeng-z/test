<!--  -->
<template>
  <div class="bargaininfo">
    <p @click="back" class="purchase_back">
      <i class="el-icon-arrow-left"></i>
    </p>
    <div class="bargaininfo_top">
      <img class="userimg" src="../assets/287977.jpg" alt />
      <p class="found_">我发现一件好货，来帮我砍到最低价把~</p>
      <div class="bargain_goods">
        <img :src="goodsinfo.pic" alt />
        <div>
          <p v-html="goodsinfo.name"></p>
          <p class="lowprice">
            <span>
              低价:
              <mark>￥{{goodsinfo.kanjiaPrice}}</mark>
            </span>
            <s>原价:￥{{judgment.curPrice}}</s>
          </p>
        </div>
      </div>
      <p class="rightnow">
        <span v-if="kamshow">当前价：￥{{judgment.curPrice}}</span>
        <span v-if="!kamshow">当前价：￥ {{num}}</span>
        <span v-if="!kamshow">,已砍：{{cutone.cutPrice}}</span>
      </p>
      <div class="doitbymyself">
        <p v-if="kamshow" @click="mine">自己先砍一刀</p>
        <p v-if="!kamshow">按当前价购买</p>
        <p>邀请好友砍价</p>
      </div>
      <div>倒计时</div>
    </div>
    <div class="bargain_bottom">
      <p class="friends">{{this.help.length}}名好友帮砍</p>
      <ul>
        <li v-for="(v,i) in help" :key="i" >
          <img src="../assets/287977.jpg" alt />
          <div>
            <p style="color:black">{{v.nick}}</p>
            <p style="color:black">{{v.dateAdd}}</p>
          </div>
          <p>砍掉{{v.cutPrice}}元</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services.js";
let _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      judgment: {},
      tokens: "",
      goodsinfo: {},
      cutone: {},
      kamshow: true,
      jion: {},
      help:[]
    };
  },
  //监听属性 类似于data概念
  computed: {
    num(){
      return parseInt(this.judgment.curPrice-this.cutone.cutPrice)
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back() {
      this.$router.go(-1);
    },
    mine() {
      this.kamshow = false;
      let detailobj = {
        kjid: this.$store.state.kanjiainfo,
        tokenid: this.tokens.uid
      };
      _product.kanjiainfo(detailobj).then(res => {
        this.jion = res.data.data;
        this.help=this.jion.helps
        console.log(this.jion.helps)
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let b = JSON.parse(localStorage.getItem("tokens"));
    this.tokens = b;
    let obj = {
      kjid: this.$store.state.kanjiainfo,
      token: this.tokens.token
    };

    _product.initiate(obj).then(res => {
      this.judgment = res.data.data;
    });

    let { id } = this.$route.query;
    _product.detail(id).then(res => {
      this.goodsinfo = res.data.data.basicInfo;
    });

    let cut = {
      token: this.tokens.token,
      kjid: this.$store.state.kanjiainfo,
      join: this.tokens.uid
    };
    _product.cutone(cut).then(res => {
      this.cutone = res.data.data;
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
.purchase_back {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  position: fixed;
  top: 0;
  i {
    margin-left: 0.2rem;
    font-size: 0.3rem;
  }
}
.bargaininfo_top {
  width: 100%;
  height: 6.5rem;
  background: linear-gradient(left, #e6d7bd 0%, #bba881 100%);
  text-align: center;
  .userimg {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-top: 0.5rem;
  }
  .found_ {
    text-align: center;
    margin-top: 0.1rem;
    color: white;
  }
  .bargain_goods {
    width: 90%;
    height: 1.4rem;
    border-radius: 0.1rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    border: 1px solid #ddd;
    background-color: #f6edde;
    display: flex;
    box-sizing: border-box;
    img {
      width: 1.2rem;
      height: 1.2rem;
      padding: 0.1rem;
    }
    div {
      line-height: 0.7rem;
      .lowprice {
        color: gray;
        mark {
          font-weight: bolder;
          background-color: #f6edde;
          margin-right: 0.2rem;
        }
      }
    }
  }
}
.rightnow {
  width: 100%;
  margin-top: 0.1rem;
  color: white;
}
.doitbymyself {
  width: 80%;
  margin: 0 auto;
  height: 0.8rem;
  display: flex;
  text-align: center;
  line-height: 0.8rem;
  justify-content: space-around;
  margin-top: 0.2rem;
  p {
    width: 40%;
    border-radius: 0.1rem;
    background-color: #b0a48c;
    color: white;
  }
  p:nth-child(2) {
    color: #b3a079;
    background-color: #d1c0a0;
    border: 1px solid #b0a48c;
  }
}
.bargain_bottom {
  text-align: center;
  .friends{
    margin-top: 0.1rem;
    color: #bba881;
  }
  img {
    width: 1rem;
    height: 1rem;
  }
  ul{
    width: 100%;
    margin-top: 0.1rem;
    li{
      width: 100%;
      height: 1.2rem;
      border-bottom: #b0a48c dotted 1px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      p{
        margin-top: 0.1rem;
        color: #b0a48c;
      }
    }
  }
}
</style>