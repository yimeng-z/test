<!--  -->
<template>
<div class='sigin'>
    <router-link to="/" tag="p" class="sigin_p"> 
        <i class="el-icon-arrow-left"></i>
    </router-link>
    <div class="sigin_top">
        <p>您的可用积分为</p>
        <h5>999</h5>
    </div>
    <div class="nothing">

    </div>
    <p class="sigin_qian">签到</p>
    <div class="sigin_xf">
        <i class="el-icon-s-goods"></i>
        <div>
            <p>消费购物</p>
            <p class="xf">购物完成，确认收货后立返积分</p>
        </div>
        <router-link to="/" tag="button" >去购物</router-link>
    </div>
    <div class="sigin_dh">
        <i class="el-icon-s-ticket"></i>
        <div>
            <p>积分兑换</p>
            <p class="dh">积分兑好礼，20积分即可兑换礼券</p>
        </div>
        <router-link to="/gift" tag="button" >去兑换</router-link>
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
@import url("../assets/css/sigin.css");
</style>