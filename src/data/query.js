import {camelCase} from '~/util/string';

/**
 * url参数
 *
 * roomId: string
 * userNumber: string
 * userName: string
 * userRole: string
 * userAvatar: string
 * sign: string
 * partnerId: string
 * trialClass: string
 * lessonId: string
 * courseNumber: string
 * assistantName: string
 * pageTitle: string
 * tpl: string
 * status: string
 * env: string;
 */

// 校验url参数，返回缺失的参数
export function checkEmptyParam() {
    // 为了和url参数匹配，这里不转驼峰
    const query = parseQueryString(location.search, false);
    const requiredParams = [
        'room_id',
        'user_number',
        'user_name',
        'user_role',
        'user_avatar',
        'sign'
    ];
    return requiredParams
        .filter(param => !query[param]);
}

export function parseQueryString(search = location.search, needCamelCase = true) {
    search = search.slice(1);
    const params = {};
    if (!search) {
        return params;
    }
    search.split('&').forEach(param => {
        const p = param.split('=');

        /**
         * 由于前后端编解码算法不一致
         * 后端会把空格编码为 “+”，而decodeURIComponent方法会把“+”解码为“+”
         * 因此前端解码前需要把字符中的+转成%20，确保url参数的空格可以被正确地传递
        */
        let key = p[0];
        const value = decodeURIComponent(transformPlus(p[1]));
        key = needCamelCase ? camelCase(key) : key;
        params[key] = value;
    });
    return params;
}

export function addQuery(url, data) {
    let conj = '';

    const queryList = Object.entries(data).map(
        ([key, value]) =>
            `${key}=${value}`
    );

    conj = url.indexOf('?') === -1 ? '?' : '&';

    const regExp = /\?random=\S+#/;
    const matchQuestionMark = url.match(/\?/g);
    if (regExp.test(url) && matchQuestionMark && matchQuestionMark.length === 1) {
        conj = '?';
    }

    return url + conj + queryList.join('&');
}

export default parseQueryString();

function transformPlus(queryString = '') {
    return queryString.split('+').join('%20');
}
