import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../views/homepage.vue'
import Classify from '../views/classify.vue'
import Cart from '../views/cart.vue'
import User from '../views/user.vue'
import Sigin from '../components/sigin.vue'
import Gift from '../components/gift.vue'
import Bargain from '../components/bargain.vue'
import Special from '../components/special.vue'
import Goods from '../components/goods.vue'
import Login from '../components/login.vue'
import Zhuan from '../components/zhuan.vue'
import Detal from '../components/detal.vue'
import Register from '../components/register.vue'
import Classifydetail from '../components/classifydetail.vue'
import User_address from '../components/user_address.vue'
import Purchase from '../components/purchase.vue'
import Payment from '../components/payment.vue'
import Addaddress from '../components/addaddress.vue'
import BargainInfo from '../views/bargainInfo.vue'
import Orders from '../views/orders.vue'
import Estimate from '../views/estimate.vue'
import Waitestimate from '../views/waitestimate.vue'
Vue.use(Router)

export default new Router({
  mode:"history",
  base:'/zhangqiqi/',
  linkActiveClass:"active",
  routes: [
    {
      path: '/',
      component: Homepage
    },
    {
      path: '/classify',
      component: Classify
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/user',
      component: User
    },
    {
      path:"/sigin",
      component:Sigin
    },
    {
      path:"/gift",
      component:Gift
    },
    {
      path:"/bargain",
      component:Bargain
    },
    {
      path:"/special",
      component:Special
    },
    {
      path:"/goods/:id?",
      component:Goods
    },
    {
      path:"/login",
      component:Login
    },
    {
      path:"/zhuan/:id?",
      component:Zhuan
    },
    {
      path:"/detal/:id?",
      component:Detal
    },
    {
      path:"/register",
      component:Register
    },
    {
      path:"/classifydetail/:id?",
      component:Classifydetail
    },
    {
      path:"/purchase",
      component:Purchase
    },
    {
      path:"/user_address",
      component:User_address
    },{
      path:"/payment/:id?",
      component:Payment
    },{
      path:"/addaddress",
      component:Addaddress
    },{
      path:"/bargainInfo/:idinfo?",
      component:BargainInfo
    },{
      path:'/orders',
      component:Orders
    },{
      path:"/estimate/:id?",
      component:Estimate
    },{
      path:"/waitestimate",
      component:Waitestimate
    }
  ]
})
