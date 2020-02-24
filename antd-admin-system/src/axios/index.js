import JsonP from 'jsonp'
import qs from 'qs'
import axios from 'axios'

//const defaultApi = "http://192.168.101.236:10005";
const localhostApi = "http://localhost:10005";

axios.defaults.headers.common['Token']= '1232131231';

export default class Axios{

    // 对全局的jsonp请求拦截
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url, {
                param:'callback'
            }, function(err, response){
                // TODO
                if (response) {
                    if(response.status === "success"){
                        resolve(response);
                    }else{
                        reject(response.message);
                    } 
                }
            })
        })
    };

    static post(api, data){
        let params = qs.stringify(data)
        return axios.post(localhostApi+api, params);
    }

    static get(api, data){
        let params = null;
        if (data) {  
            params = qs.stringify(data)
        }
        return axios.get(localhostApi+api, params);
    }

}