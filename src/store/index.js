import Vue from 'vue'
import Vuex from 'Vuex'
import Tolocal from '../utils/tolocal'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        jingxuanlist: [],
        //分类数据
        list: [],
        //筛选
        other: [],
        otherlist: [],
        addcar: [],
        tokens: [],
        truechecks: [],
        allcheck:'',
        orderNumber:{},
        //添加的地址
        address:[],
        //砍价短id
        kanjiainfo:'',
        //添加的地址列表
        addresslist:[],
        //为ture的地址
        defaultress:{},
        //待评价
        orderDetail:[]
    },
    mutations: {
        jingxuan(state, data) {
            state.jingxuanlist = data
        },
        list(state, data) {
            state.list = data
        },
        other(state, data) {
            state.other = data
        },
        otherlist(state, v) {
            let index = state.list.findIndex(item => {
                return item.name == v;
            });
            state.otherlist = state.list.filter(item => {
                return item.pid == state.list[index].id;
            });
            console.log(state.otherlist);
        },
        carlist(state, data) {
            function deepClone (data) { 
                let str = JSON.stringify(data)
                let par = JSON.parse(str)
                return par
             }
             let newa = deepClone(data)
            let obj1 = state.addcar.findIndex((i) => {
                return i.colorid == newa.colorid
            })
            let obj2 = state.addcar.findIndex((i) => {
                return i.sizeid == newa.sizeid
            })
            if (obj1 == -1 || obj2 == -1) {
                state.addcar.push(newa)
            } else if (obj1 !== -1 || obj2 !== -1) {
                state.addcar[obj1].num = state.addcar[obj1].num + newa.num
            }
        },
        addnums(state, data) {
            state.addcar[data].num++
        },
        jiannums(state, data) {
            if (state.addcar[data].num > 1) {
                state.addcar[data].num--
            } else if (state.addcar[data].num < 1) {
                state.addcar[data].num = 1
            }
        },
        token(state, data) {
            console.log(data)
            state.tokens.push(data)
            console.log(state.tokens)
        },
        dels(state,data){
            state.addcar.splice(data,1)
        },
        showcheck(state) {
            state.addcar.forEach(v => {
                v.check = !v.check;
                state.allcheck = v.check;
            });
        },
        checkdel(state){
            let obj=state.addcar.filter(v=>{
                return v.check==false
            })
            state.addcar=obj
            Tolocal.save("newaddcar",state.addcar)
            console.log(state.addcar)
        },
        changetrue(state,data){
            state.addresslist.forEach(v=>{
                v.isDefault = false;
            })
            state.addresslist[data].isDefault=true
        },
        afterorder(state){
            let obj=state.addcar.filter(v=>{
                return v.check==false
            })
            state.addcar=obj
        },
        alls(state,data){
            state.addcar.map(v=>{
                v.check=data
            })
        },
        delchecks(state,data){
            state.addcar.map(v=>{
                if(v.check==true){
                    data=true
                }
            })
        }
    },
    getters: {
        checkprice(state) {
            let sum = 0
            state.addcar.forEach(v => {
                if (v.check == true) {
                    return sum += v.price * v.num
                }
            })
            return parseInt(sum) 
        },
        checkstr(state){
            let checktrue = state.addcar.filter(v=>{
                return v.check==true
            })
            return checktrue
        },
        // defaultaddress(state){
        //     let dfa = state.addresslist.filter(v=>{
        //         return v.isDefault==true
        //     })
        //     return dfa
        // }
    },
})
export default store