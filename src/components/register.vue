<!--  -->
<template>
  <div class="register">
    <p class="register_new">新用户注册</p>
    <p class="register_happey">很高兴您将成为商城的会员(注册只需一步)</p>
    <input
      class="login_input"
      :class="phones?'aa':'bb'"
      type="text"
      @blur="testphone"
      v-model="phone"
      placeholder="手机号"
      maxlength="11"
    />
    <br />
    <input
      class="login_input"
      maxlength="16"
      :class="passes?'aa':'bb'"
      @blur="testpass"
      type="password"
      v-model="pass"
      placeholder="密码(8-16位)"
    />
    <br />
    <input
      class="login_input"
      :class="checkp?'aa':'bb'"
      @blur="checkpass"
      type="password"
      v-model="sure"
      placeholder="确认密码"
    />
    <br />
    <input
      class="login_input"
      maxlength="6"
      type="text"
      :class="users?'aa':'bb'"
      @blur="useres"
      v-model="user"
      placeholder="请输入6位数字用户名"
    />
    <br />
    <input
      :class="pictrue?'aa':'bb'"
      @blur="pictrues"
      class="login_input"
      maxlength="6"
      type="text"
      v-model="pic"
      placeholder="图形验证码"
      name
      id
    />
    <br />
    <img :src="yanzheng" alt />
    <div @click="show=true" class="chose_address">
      <p>选择地区</p>
      <div>
        <p v-for="(v,i) in address" :key="i">{{v.name}}</p>
      </div>
    </div>
    <div class="address">
      <van-popup v-model="show" position="bottom" :style="{height:'40%',width:'100%'}">
        <van-area @cancel="quxiao" @confirm="getaddress" :area-list="san" />
      </van-popup>
    </div>
    <div class="yanzheng">
      <input type="text" v-model="trueCode" maxlength="4" name id />
      <p @click="get">获取验证码</p>
    </div>

    <p class="register_button" @click="siginnow">立即注册</p>
    <router-link to="/login" tag="p" style="color:blue">已有帐号?立即登录</router-link>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from "axios";
import sanji from "../utils/sanji";
import { Dialog } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      yanzheng: "",
      phone: "",
      pass: "",
      sure: "",
      user: "",
      pic: "",
      time: "",
      trueCode: "",
      show: false,
      san: sanji,
      address: [],
      //验证样式
      phones: true,
      passes: true,
      checkp: true,
      users: true,
      pictrue: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    testphone() {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
        this.phones = false;
        return false;
      } else {
        this.phones = true;
      }
    },
    testpass() {
      if (!/^\d{8,16}$/.test(this.pass)) {
        this.passes = false;
        return false;
      } else {
        this.passes = true;
      }
    },
    checkpass() {
      if (this.pass != this.sure) {
        this.checkp = false;
        return false;
      } else {
        this.checkp = true;
      }
    },
    useres() {
      if (!/^\d{6}$/.test(this.user)) {
        this.users = false;
        return false;
      } else {
        this.users = true;
      }
    },
    pictrues() {},
    getaddress(val) {
      this.address = val;
      console.log(this.address[0].name);
      console.log(this.address[1].name);
      // console.log(this.address)
    },
    quxiao() {
      this.show = false;
    },
    change() {
      this.time = new Date().getTime();
      axios
        .get(
          `https://api.it120.cc/small4/verification/pic/get?key=${this.time}`,
          {
            responseType: "arraybuffer"
          }
        )
        .then(response => {
          this.yanzheng =
            "data:image/png;base64," +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
        });
    },
    get() {
      axios
        .post(
          `https://api.it120.cc/small4/verification/sms/get?mobile=${this.phone}&key=${this.time}&picCode=${this.pic}`
        )
        .then(res => {
          console.log(res);
        });
    },
    siginnow() {
      if (
        this.yanzheng == "" ||
        this.phone == "" ||
        this.pass == "" ||
        this.sure == "" ||
        this.user == "" ||
        this.address == ""
      ) {
        Dialog.alert({
          // title: "",
          message: "请输入完整信息"
        }).then(() => {
          // on close
        });
        return false;
      }
      axios
        .post(
          `https://api.it120.cc/small4/verification/sms/check?mobile=${this.phone}&code=${this.trueCode}`
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            axios
              .post(
                `https://api.it120.cc/small4/user/m/register?mobile=${this.phone}&pwd=${this.pass}&code=${this.trueCode}&nick=${this.user}&province=${this.address[0].name}&city=${this.address[1].name}`
              )
              .then(res => {
                if (res.data.code == 0) {
                  Dialog.alert({
                    // title: "",
                    message: "注册成功"
                  }).then(() => {
                    // on close
                  });
                  this.$router.push({
                    path: "/login"
                  });
                  console.log(res.data);
                }
              });
          } else {
            axios
              .post(
                `https://api.it120.cc/small4/user/m/register?mobile=${this.phone}&pwd=${this.pass}&code=${this.trueCode}`
              )
              .then(res => {
                if (res.data.code == 0) {
                  Dialog.alert({
                    // title: "",
                    message: "注册成功"
                  }).then(() => {
                    // on close
                  });
                  this.$router.push({
                    path: "/login"
                  });
                  console.log(res.data);
                }
              });
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let a = new Date().getTime();
    this.time = a;
    axios
      .get(
        `https://api.it120.cc/small4/verification/pic/get?key=${this.time}`,
        {
          responseType: "arraybuffer"
        }
      )
      .then(response => {
        this.yanzheng =
          "data:image/png;base64," +
          btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
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
.register {
  text-align: center;
  width: 95%;
  .yanzheng {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 60%;
      margin-left: 1.2rem;
      height: 0.5rem;
      margin-top: 0.1rem;
      text-indent: 0.2rem;
      border-radius: 0.1rem;
      border: none;
      margin-bottom: 0.2rem;
      border: 1px solid #ddd;
    }
    p {
      width: 49%;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: start;
      margin-left: 0.1rem;
    }
  }
}
.register_button {
  width: 20%;
  height: 0.6rem;
  line-height: 0.6rem;
  border-radius: 0.1rem;
  margin-left: 2.6rem;
  color: white;
  text-align: center;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  background: linear-gradient(to right, #fb5610 0%, #c70000 100%);
}
.login_input {
  width: 60%;
  height: 0.5rem;
  text-indent: 0.2rem;
  border-radius: 0.1rem;
  border: none;
  margin-bottom: 0.2rem;
  border: 1px solid #ddd;
}
.register_new {
  font-size: 0.3rem;
  font-weight: bold;
  text-align: start;
  margin-left: 1rem;
  margin-top: 0.4rem;
  margin-bottom: 0.3rem;
}
.register_happey {
  color: gray;
  margin-bottom: 0.3rem;
}
.chose_address {
  width: 80%;
  margin: 0 auto;
  height: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    width: 40%;
    display: flex;
    text-align: center;
  }
}
.aa {
  width: 60%;
  height: 0.5rem;
  margin-top: 0.1rem;
  text-indent: 0.2rem;
  border-radius: 0.1rem;
  border: none;
  margin-bottom: 0.2rem;
  border: 1px solid #ddd;
}
.bb {
  width: 60%;
  height: 0.5rem;
  margin-top: 0.1rem;
  text-indent: 0.2rem;
  border-radius: 0.1rem;
  border: none;
  margin-bottom: 0.2rem;
  border: 1px solid red;
}
</style>