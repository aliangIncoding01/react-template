const list = [
    ['iphone', /iphone os ([\d_.]+)/],
    ['ipad', /ipad; cpu os ([\d_.]+)/],
    ['android', /android ([\d_.]+)/],
    ['windows', /windows nt ([\d_.]+)/],
    ['mac', /mac os x ([\d_.]+)/]
];

const iosMap = {
    iphone: true,
    ipad: true
};
export default parseUA();

export const inClient = window.cefQuery !== void 0;

export const isFlashSupported = supportFlash() || inClient;

function parseUA(ua = navigator.userAgent) {
    let os;
    let version = '';

    ua = ua.toLowerCase();

    list.some(([name, pattern]) => {
        const match = ua.match(pattern);
        if (match) {
            version = match[1].replace(/_/g, '.');
            os = name;
            return true;
        }
        return false;
    });
    const result = {
        os,
        version,
    };
    if (result.os) {
        result[result.os] = true;
        if (iosMap[result.os]) {
            result.ios = true;
        }
    }
    return result;
}

function supportFlash() {
    let swf;
    const {plugins} = navigator;
    if (plugins && plugins.length > 0) {
        swf = plugins['Shockwave Flash'];
    }
    else if (document.all) {
        swf = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    }
    return !!swf;
}
