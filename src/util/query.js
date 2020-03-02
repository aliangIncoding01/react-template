/* eslint-disable import/prefer-default-export */
export const addQuery = (url, data) => {
    let conj = '';

    const queryList = Object.entries(data).map(
        ([key, value]) =>
            `${key}=${value}`
    );

    conj = url.indexOf('?') === -1 ? '?' : '&';

    return url + conj + queryList.join('&');
};
