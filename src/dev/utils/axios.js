import axios from 'axios';

// 是否是生产环境，日志只对非生成环境生效
let noProduction = process.env.NODE_ENV !== 'production';

axios.defaults.baseURL = '';           // 多环境地址
axios.defaults.timeout = 45000;                         // 响应时间
axios.defaults.withCredentials = true;                 // 允许跨域请求Cookie
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';

/**
 * 默认向外暴露一个请求对象，不建议全部import，尽量按需引入
 */
export default {

  /**
   * post请求
   * @param options 请求数据对象
   * @returns {Promise<any>}
   */
  requestPost(options) {
    return new Promise((resolve, reject) => {
      axios.post(options.api, options.param).then(response => {
        resolve(response.data);
      }, error => {
        reject(error);
      }).catch(throws => {
        if (noProduction) {
          console.log("requestPost.catch返回：", throws);
        }
        reject("网络异常！")
      })
    })
  },

  /**
   * get请求
   * @param options   请求数据对象
   * @returns {Promise<any>}
   */
  requestGet(options) {
    return new Promise((resolve, reject) => {
      axios.get(options.api, {
        params: options.param
      }).then(response => {
        //请求成功
        resolve(response.data);
      }, error => {
        reject(error);
      }).catch(throws => {
        if (noProduction) {
          console.log("requestGet.catch返回：", throws);
        }
        reject("网络异常！")
      })
    })
  },

}

