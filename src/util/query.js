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

// 解析超链接
export const parseHref = content => {
    if (typeof content !== 'string') {
        return content;
    }
    const result = [];
    const urls = content.match(/(?=http[s]?:\/\/|www)[-~!@#$%^&*_+=.:?/a-z0-9]+/ig);
    if (!urls) {
        return content;
    }
    let contentStr = content;
    for (let i = 0; i < urls.length; pi++) {
        contentStr = contentStr.replace(urls[i], ',');
    }
    const contentArr = contentStr.split(',');
    contentArr.forEach((item, index) => {
        result.push(item);
        if (urls[index]) {
            const originUrl = urls[index];
            const href = originUrl.match(/^http/) ? originUrl : `//${originUrl}`;
            result.push(
                <a
                    className="message-item-content-href"
                    key={Math.random()}
                    href={href}
                    target="_blank"
                >
                    {originUrl}
                </a>
            );
        }
    });
    return result;
};
