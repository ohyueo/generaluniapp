/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */

/*
// 开放的接口
import http from './interface'

http.config.baseUrl = "http://localhost:8080/api/"

http.request(url:'user/list',method:'GET').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list', {status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.post('user', {id:1, status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.put('user/1', {status: 2}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.delete('user/1').then((res)=>{
	console.log(JSON.stringify(res))
}) 

 */
var _sign;
var merid=0; 
import Base64 from './base64';
import md5 from '../../common/js-md5/build/md5.min.js';
export default {
	config: {
		baseUrl: "https://ty.ohyu.cn/",
		//baseUrl: "http://lsjk.kingnow.com/",
		//baseUrl: "http://www.ty.com/",
		header: {
			'Content-Type':'application/json;charset=UTF-8',
			'Content-Type':'application/x-www-form-urlencoded'
		},  
		data: {},
		method: "GET",
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		//TODO 加密数据
		//console.log('数据='+Base64.Base64.encode('xxxx'));
		//TODO 数据签名
		/* 
		_token = {'token': getStorage(STOREKEY_LOGIN).token || 'undefined'},
		_sign = {'sign': sign(JSON.stringify(options.data))}
		options.header = Object.assign({}, options.header, _token,_sign) 
		*/
	   
	   var time=Date.now();
	   //console.log(options.data);
	   if(options.data.merid){
	   		   merid=options.data.merid;
	   }
	   options.data = Object.assign({}, options.data,{'ohyu_time':time,'ohyu_merid':merid}) ;
	   		_sign = {'ohyu_sign': getSign(options.data,'ohyueo','www.ohyu.cn')};
	   		options.data = Object.assign({}, options.data,_sign);
	   
		return new Promise((resolve, reject) => {
			let _config = null
			
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
						//console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				//console.log('xxxxxx='+JSON.stringify(response));
				if(response.data.code==201){
					//201登录失败
					//清理本地
					uni.removeStorage({
						key: 'userData'
					});
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return false;
				}
				// 统一的响应日志记录
				_reslog(response)
				if (statusCode === 200) { //成功
					resolve(response);
				} else {
					reject(response)
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			
			// 统一的请求日志记录
			_reqlog(_config)

			if (process.env.NODE_ENV === 'development') {
				//console.log("【" + _config.requestId + "】 地址：" + _config.url)
				if (_config.data) {
					//console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}
			}

			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'  
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}


/**
 * 签名
 **/

function getSign(params, kAppKey, kAppSecret) {
    if (typeof params == "string") {
        return paramsStrSort(params,kAppKey,kAppSecret);
    } else if (typeof params == "object") {
        var arr = [];
        for (var i in params) {
            arr.push((i + "=" + params[i]));
        }
        return paramsStrSort(arr.join(("&")),kAppKey,kAppSecret);
    }
}
function paramsStrSort(paramsStr,kAppKey,kAppSecret) {
    var url = paramsStr ;//+ "&appKey=" + kAppKey;
	//console.log(url);
    var urlStr = url.split("&").sort().join("&");
	var urlStr = decodeURI(urlStr);//转换编码
	//console.log(decodeURI(urlStr));
    var newUrl = urlStr + '&key=' + kAppSecret;
	//console.log(newUrl);
    return md5(newUrl);
}

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		//console.log("【" + req.requestId + "】 地址：" + req.url)
		if (req.data) {
			//console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
		}
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		//console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
		if (res.config.data) {
			//console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		//console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	switch(_statusCode){
		case 200:
			break;
		case 401:
			break;
		case 404:
			break;
		default:
			break;
	}
}

