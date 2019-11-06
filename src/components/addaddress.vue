<!--  -->
<template>
  <div class="addaddress">
    <p @click="back" class="purchase_back">
      <i class="el-icon-arrow-left"></i>
      <span>新增地址</span>
    </p>
    <div class="addaddress_bottom">
      <p>
        <span>联系人</span>
        <input type="text" v-model="user" placeholder="姓名" name id />
      </p>
      <p>
        <span>手机号码</span>
        <input type="text" v-model="phone" placeholder="11位手机号码" maxlength="11" name id />
      </p>
      <div @click="show=true" class="chose_address">
        <p>选择地区</p>
        <div class="cityinfo">
          <p v-for="(v,i) in address" :key="i">{{v.name}}</p>
        </div>
      </div>
      <div class="address">
        <van-popup v-model="show" position="bottom" :style="{height:'40%',width:'100%'}">
          <van-area @cancel="quxiao" @confirm="getaddress" :area-list="san" />
        </van-popup>
      </div>
      <p>
        <span>详细地址</span>
        <input type="text" v-model="door" placeholder="街道门牌信息" name id />
      </p>
      <p>
        <span>邮政编码</span>
        <input type="text" v-model="express" placeholder="邮政编码" name id />
      </p>
      <button style="background:darkgreen" @click="keeps">保存</button>
      <button style="background:darkred">从微信读取</button>
      <button style="background:gray" @click="cancle">取消</button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/views-services";
import sanji from "../utils/sanji";
const _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      user: "",
      phone: "",
      door: "",
      express: "",
      show: false,
      san: sanji,
      address: [],
      token: "",
      myaddresses: [],
      defaults:true
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
    quxiao() {
      this.show = false;
    },
    getaddress(val) {
      this.address = val;
      console.log(this.address);
      console.log(this.address[0].name);
      console.log(this.address[1].name);
      // console.log(this.address)
    },
    keeps() {
      let obj = {
        user: this.user,
        phone: this.phone,
        cityIds: this.address[1].code,
        door: this.door,
        express: this.express,
        provinceIds: this.address[0].code,
        tokens: this.token,
        default: this.defaults
      };
      console.log(obj);
      _product.addaddress(obj).then(res => {
        let a = res.data.data;
        this.myaddresses.push(a);
        this.$store.state.address = this.myaddresses;
        window.localStorage.setItem(
          "myaddress",
          JSON.stringify(this.$store.state.address)
        );
        console.log(this.$store.state.address);
        if (res.data.code == 0) {
          this.$router.push({
            path: "/user_address"
          });
        }
      });
    },
    cancle() {
      (this.user = ""),
        (this.phone = ""),
        (this.door = ""),
        (this.express = "");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let a = JSON.parse(localStorage.getItem("tokens"));
    this.token = a.token;
    console.log(this.token);
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
.addaddress_bottom {
  width: 95%;
  margin: 0 auto;
  margin-top: 0.9rem;
  line-height: 1rem;
  span {
    margin-left: 0.2rem;
  }
  input {
    border: none;
    outline: nonoe;
  }
  button {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    color: white;
    border: none;
    border-radius: 0.1rem;
    margin-bottom: 0.3rem;
  }
}
.chose_address {
  display: flex;
  margin-left: 0.2rem;
}
.cityinfo {
  display: flex;
  margin-left: 0.2rem;
}
</style>