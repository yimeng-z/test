<!--  -->
<template>
  <div class>
    <p @click="back" class="purchase_back">
      <i class="el-icon-arrow-left"></i>
      <span>待评价</span>
    </p>
     <ul class="estimatelist">
        <li v-for="(v,i) in orderlist" :key="i">
            {{i}}
          <div class="estimate_img" v-for="(item,index) in orderlist[i]" :key="index" v-if="item.orderId==i">
              {{item.orderId}}
            <div class="estimate_img_top1">
              <img :src="item.pic" alt />
              {{item.id}}
              <div>
                <p>{{item.goodsName}}</p>
                <p class="property">{{item.property}}</p>
              </div>
            </div>
            <div class="estimate_estimate"></div>
          </div>
        </li>
      </ul>
    <div>
        <ul>
            <li v-for="(v,i) in this.$store.state.orderDetail" :key="i">
                <p>{{v.statusStr}}</p>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from 'axios'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
        orderlist:[],
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
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
       let { id } = this.$route.query;
    this.id = id;
    let a = JSON.parse(window.localStorage.getItem("tokens"));
    let b = a.token;
    axios
      .post(`https://api.it120.cc/small4/order/list?token=${b}`)
      .then(res => {
        //   console.log(res.data.data.orderList)
        this.orderlist =res.data.data.goodsMap
        console.log(this.orderlist)
        for(let i in this.orderlist){
            this.orderlist[i].map(v=>{
                console.log(v.id)
            })
        }
      });
    console.log(this.$store.state.orderDetail)
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
</style>