<template>
  <div id="app">
    <transition>
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss" >
.v-enter-active,
.v-leave-active  {
  transition: all .5s;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
  .v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.contentlist{
  width: 95% !important;
  height: 100% !important;
  margin: 0 auto !important;
  ul{
    text-indent: 0.2rem;
    li{
      clear: both;
      padding: 0.01rem;
    }
  }
  img{
      width: 100% !important;
      height: 100% !important;
    }
}
     .el-carousel__indicator--horizontal{
    padding: 0 !important;
  }
</style>
