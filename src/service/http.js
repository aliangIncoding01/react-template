/* eslint-disable no-alert */
/**
 * @file HTTP 请求统一处理
 *
 */
import axios from 'axios';
import {camelCaseObject, snakeCaseObject} from '~/util/string';

/* eslint-disable no-magic-numbers */
const defaultEnvType = 'local';
const envType = process.env.ENV_TYPE || defaultEnvType;

const instance = axios.create({
    // baseURL,
    timeout: 10000,
    retry: 3,
    retryDelay: 1000,
});

const success = ({data, config}) => {
    // TODO: 增加通用的处理逻辑
    // 需要统一返回的 JSON 格式
    // 然后可以识别到响应异常，作统一处理，比如弹窗
    // 比如增加同样的 request 拦截，显示 loading 状态
    // 然后在 response 里隐藏 loading 状态
    const {code, msg} = data;
    if (code) {
        return Promise.reject(new Error(msg));
    }
    return data;
};

const failData = {
    code: 500,
    msg: 'timeout',
};

const fail = error => Promise.reject(error);

// if (!config || !config.retry) {
//     return Promise.resolve(failData);
// }

// config.retryCount = (config.retryCount | 0) + 1;
// if (config.retryCount > config.retry) {
//     return Promise.resolve(failData);
// }

// return new Promise(resolve => setTimeout(resolve, config.retryDelay)).then(() => instance.request(config));


instance.interceptors.response.use(success, fail);

instance.axios = axios;

export default {
    get(url, data) {
        return instance.get(
            url,
            {
                params: data
            }
        )
            .then(res => {
                res.data = camelCaseObject(res.data);
                return res;
            });
    },
    post(url, data) {
        return instance.post(
            url,
            data
        )
            .then(res => {
                res.data = camelCaseObject(res.data);
                return res;
            });
    }
};
