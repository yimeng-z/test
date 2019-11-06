<!--  -->
<template>
<div class='gift'>
     <router-link to="/" tag="p" class="gift_p"> 
        <i class="el-icon-arrow-left"></i>
    </router-link>
    <div class="gift_top">
        <div>
            <p>请输入礼券码</p>
            <button>兑换</button>
        </div>
    </div>
    <div class="gift_quan">

    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
*{
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 0.16rem
}
.gift{
    width: 100%;
}
.gift_p{
    width: 0.3rem;
    height: 0.3rem;
    position: fixed;
    z-index: 2;
    top: 0.1rem;
    left: 0.1rem;
    background-color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 0.3rem;

    i {
      font-size: 0.2rem;
    }
}
.gift_top{
    width: 100%;
    height: 5rem;
    background: url("../assets/287977.jpg") no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 4rem 0 0 0;
    div{
        width: 95%;
        height: 1rem;
        margin: 0 auto;
        border: 0.02rem solid #F1CC93;
        box-sizing: border-box;
        padding: 0.1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: white;
        p{
            width: 70%;
            height: 0.3rem;
            border-radius: 0.05rem;
            text-indent: 0.1rem;
            line-height: 0.3rem;
            color: #F1CC93;
            border: 1px solid rebeccapurple
        }
        button{
            width: 20%;
            height: 0.3rem;
            background-color: #EE7C7B;
            color: white;
            border: none;
            border-radius: 0.05rem
        }
    }
}
</style>