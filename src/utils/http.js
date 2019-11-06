import config from '../config'
import axios from 'axios'
import Qs from 'qs'
class HTTP{
    request(params){
        return new Promise((resolve,reject)=>{
            axios({
                method:params.type||"get",
                url:config.baseUrl+params.url,
                data:Qs.stringify(params.data)
            }).then(res=>{
                if(!res.code){
                }
                resolve(res)
            })
        })
    }
}
export default HTTP