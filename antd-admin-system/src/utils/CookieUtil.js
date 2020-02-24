import cookie from 'react-cookies'

export default{

    /**
     * cookie存值
     * @param {*} key 存入键
     * @param {*} value 存入值
     * @param {*} time 有效时间
     */
    cookieSet(key, value, time){
        let expire = null;
        // 设置有效时间
        if(time){
            expire = new Date();
            expire.setDate(Date.now() + time);
        };
        // 保存
        cookie.save(key, value, {
            expires: expire,
        })
    },

    /**
     * 移除指定key的cookie
     * @param {*} key 
     */
    cookieRemove(key){
        cookie.remove(key);
    },

    /**
     * 获取指定key的cookie
     * @param {*} key 
     */
    cookieGet(key){
        return cookie.load(key);
    },

    /**
     * 获取全部cookie
     */
    cookieGetAll(){
        return cookie.loadAll();
    }

}