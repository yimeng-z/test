<!--  -->
<template>
  <div class="user_address">
    <p @click="back" class="purchase_back">
      <i class="el-icon-arrow-left"></i>
      <span>我的地址</span>
    </p>
    <div class="addresslist">
      <ul>
        <li v-for="(v,i) in this.$store.state.addresslist" :key="i">
          <el-checkbox v-model="v.isDefault" @change="changetrue(i)"></el-checkbox>
          <!-- <input type="checkbox" name id /> -->
          <div>
            <p>{{v.linkMan}}{{v.mobile}}</p>
            <p>{{v.provinceStr}}{{v.cityStr}}{{v.address}}</p>
          </div>
          <div>
            <i class="el-icon-edit-outline"></i>
            <i class="el-icon-delete" @click="deladdress(i)"></i>
          </div>
        </li>
      </ul>
    </div>
    <router-link to="/addaddress" tag="div" class="user_address_bottom">添加地址</router-link>
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
      getaddress: []
    };
  },
  //监听属性 类似于data概念
  computed: {
    tureaddress() {
      return this.$store.getters.defaultaddress;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back() {
      this.$router.go(-1);
    },
    changetrue(i) {
      this.$store.commit("changetrue", i);
      this.$store.state.defaultress = this.tureaddress;
      window.localStorage.setItem(
        "tureaddresslist",
        JSON.stringify(this.$store.state.defaultress)
      );
    },
    deladdress(i){
      let a = this.$store.state.addresslist[i].id
       let token = JSON.parse(localStorage.getItem("tokens"));
      console.log(token)
      let tokenes = token.token
      let b = {
        tokens:tokenes,
        ids:a
      }
      _product.deladdress(b).then(res=>{
        if(res.data.code==0){
          this.$store.state.addresslist=res.data.data
        }
        // console.log(res.data)
      })
      // console.log(this.$store.state.addresslist[i].id)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // let a = JSON.parse(window.localStorage.getItem("myaddress"));
    // this.getaddress = a;
    let a = JSON.parse(window.localStorage.getItem("tokens"));
    _product.addresslist(a.token).then(res => {
      if (res.data.code == 0) {
        this.$store.state.addresslist = res.data.data;
        console.log(this.$store.state.addresslist)
      } else {
        console.log(res.data.msg);
      }
    });

    // console.log(this.$store.state.defaultress)
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
  background-color: #fff;
  i {
    margin-left: 0.2rem;
    font-size: 0.3rem;
  }
  span {
    margin-left: 2.4rem;
  }
}
.addresslist {
  width: 100%;
  margin-top: 0.8rem;
  ul {
    width: 100%;
    li {
      width: 90%;
      margin: 0 auto;
      height: 1rem;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        line-height: 0.4rem;
      }
      i {
        font-size: 0.3rem;
        color: gray;
      }
    }
  }
}
.user_address_bottom {
  width: 100%;
  height: 0.8rem;
  background-color: rebeccapurple;
  position: fixed;
  bottom: 0;
  text-align: center;
  line-height: 0.8rem;
  color: white;
}
</style>