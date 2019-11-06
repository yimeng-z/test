<!--  -->
<template>
  <div class="login">
    <p class="login_zhanghao">账号登陆</p>
    <p class="login_name">krean - welcome</p>
    <input class="login_input" type="text" v-model="loginphone" placeholder="手机号码" name id />
    <br />
    <input class="login_input" type="password" v-model="loginpass" placeholder="密码" name id />
    <p class="login_button" @click="login">登陆</p>
    <router-link to="/" tag="p">忘记密码</router-link>
    <router-link to="register" tag="p" style="color:blue">还没有注册?立即注册</router-link>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from "axios";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loginphone: "",
      loginpass: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    login() {
      axios
        .post(
          `https://api.it120.cc/small4/user/m/login?deviceId=007&deviceName=monkey&mobile=${this.loginphone}&pwd=${this.loginpass}`
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            localStorage.setItem("tokens", JSON.stringify(res.data.data));
            this.$store.state.tokens = res.data.data.token;
            this.$router.push({
              path: "/user"
            });
          } else {
            alert("请输入有效信息");
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
.login {
  width: 100%;
  text-align: center;
  line-height: 1rem;
  .login_zhanghao {
    font-size: 0.3rem;
    font-weight: bold;
    text-align: start;
    margin-left: 1rem;
  }
  .login_name {
    text-align: start;
    margin-left: 1rem;
  }
  .login_input {
    width: 60%;
    height: 0.5rem;
    text-indent: 0.2rem;
    border-radius: 0.1rem;
    border: none;
    border: 1px solid #ddd;
  }
  .login_button {
    width: 20%;
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 0.1rem;
    margin-left: 2.6rem;
    text-align: center;
    color: white;
    background: linear-gradient(to right, #fff 0%, #000 100%);
  }
}
</style>