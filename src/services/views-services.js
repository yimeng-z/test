
/**
 * product-service.js Created by SmallFour on 2019/10/22/14:16
 */

// 第二个文件：M层

/*
* M : 数据
* V： 视图
* C： 业务逻辑层
* */

import HTTP from '../utils/http'
const _http = new HTTP()
class Product {
  // list方法
  list () {
    return _http.request({
      url: 'banner/list'
    })
  }
  //first_list方法
  first(){
    return _http.request({
      url:"shop/goods/list",
    })
  }
  // detail方法
  detail (productId) {
    return _http.request({
      type: 'post',
      url: 'shop/goods/detail',
      data: {
        id: productId
      }
    })
  }
  //精选专题
  jingxuan(){
    return _http.request({
      url:"cms/news/list"
    })
  }
  //精选专题数据
  jingxuanlist(productId){
    return _http.request({
      type: 'post',
      url: 'cms/news/detail',
      data: {
        id: productId
      }
    })
  }
  //分类
  fenlei(){
    return _http.request({
      url:"shop/goods/category/all"
    })
  }
  //评价
  appraise(goodsId){
    return _http.request({
      type:"post",
      url:'shop/goods/reputation',
      data:{
        goodsId,
      }
    })
  }
  //详情规格价钱
  detailprice(goodsIds){
    return _http.request({
      type:"post",
      url:"shop/goods/price",
      data:{
        goodsId:goodsIds.goodid,
        propertyChildIds:goodsIds.proprty+","+goodsIds.childs
      }
    })
  }
  //商品评价
  appra(goodsid){
    return _http.request({
      type:"post",
      url:"shop/goods/reputation",
      data:{
        goodsid
      }
    })
  }
  //下单商品评价
  order(obj){
    return _http.request({
      type:'post',
      url:"order/reputation",
      data:{
        token:obj.token,
        postJsonString:obj.postJsonString
      }
    })
  }
  //下单获取订单号
  getorder(oinformation){
    return _http.request({
      type:"post",
      url:"order/create",
      data:{
        token:oinformation.token,
        goodsJsonStr:oinformation.a
      }
    })
  }
  //订单列表
  orderlist(tokensid){
    return _http.request({
      type:"post",
      url:"order/list",
      data:{
        tokensid
      }
    })
  }
  //添加地址
  addaddress(add){
    return _http.request({
      type:"post",
      url:"user/shipping-address/add",
      data:{
        address:add.door,
        cityId:add.cityIds,
        code:add.express,
        linkMan:add.user,
        mobile:add.phone,
        provinceId:add.provinceIds,
        token:add.tokens,
        isDefault:add.default
      }
    })
  }
  //添加地址列表
  addresslist(tokens){
    return _http.request({
      type:'post',
      url:"user/shipping-address/list",
      data:{
        token:tokens
      }
    })
  }
  //删除地址
  deladdress(ids){
    return _http.request({
      type:'post',
      url:'user/shipping-address/delete',
      data:{
        token:ids.tokens,
        id:ids.ids
      }
    })
  }
  //默认地址接口
  defaultadd(tokens){
    return _http.request({
      type:'post',
      url:"user/shipping-address/default",
      data:{
        token:tokens
      }
    })
  }
  //商品评价接口
  goodsjudgment(id){
    return _http.request({
      type:"post",
      url:"shop/goods/reputation",
      data:{
        goodsId:id
      }
    })
  }
  //砍价商品
  kanjialist(){
    return _http.request({
      url:"shop/goods/kanjia/list"
    })
  }
  //发起砍价接口
  initiate(kanjia){
    return _http.request({
      type:"post",
      url:"shop/goods/kanjia/join",
      data:{
        kjid:kanjia.kjid,
        token:kanjia.token
      }
    })
  }
  //获取砍价详情
  kanjiainfo(details){
    return _http.request({
      type:'post',
      url:"shop/goods/kanjia/info",
      data:{
        kjid:details.kjid,
        joiner:details.tokenid
      }
    })
  }
  //砍一刀
  cutone(cutoneid){
    return _http.request({
      type:"post",
      url:"shop/goods/kanjia/help",
      data:{
        token:cutoneid.token,
        kjid:cutoneid.kjid,
        joinerUser:cutoneid.join,
      }
    })
  }
}

export default Product
