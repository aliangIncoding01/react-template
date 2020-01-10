/**
 * 防抖动
 *
 * @param {Function} fn 需要防抖动的函数
 * @param {?Object=} context 函数调用时的上下文
 * @return {Function} 包装过的支持防抖动函数
 */
export const debounce = (fn, delay, context) => {
    let timer = null;

    return function debounce(...args) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            fn(...args);
        }, delay, context);
    };
};

/**
 * 节流
 *
 * @param {Function} fn 需要节流的函数
 * @param {?Object=} context 函数调用时的上下文
 * @return {Function} 包装过的支持节流函数
 */
export const throttle = (fn, delay = 100, context) => {
    let lastCalledTime;
    let timer;

    const wrapperFn = (args, now = +new Date()) => {
        lastCalledTime = now;
        fn.apply(context, args);
    };

    return function throttled(...args) {
        const nowTime = +new Date();
        if (lastCalledTime && nowTime - lastCalledTime < delay) {
            clearTimeout(timer);
            timer = setTimeout(() => wrapperFn(args), delay);
        }
        else {
            wrapperFn(args, nowTime);
        }
    };
};

/**
 * 节流
 *
 * 在duration时长内，最多执行length次fn，如果执行次数超限，就回调onOverRun
 *
 * @param {Function} fn 需要节流的函数
 * @param {Number} duration
 * @param {Number} length
 * @param {Function} onOverRun
 * @return {Function} 包装过的支持节流函数
 */

export const throttle2 = ({
    fn,
    duration = 1000,
    length = 1,
    onOverRun
}) => {
    const queue = [];
    return (...args) => {
        const now = Date.now();
        const first = queue[0];

        if (queue.length < length) {
            queue.push(now);
            return fn(...args);
        }

        if (now - first > duration) {
            queue.shift();
            queue.push(now);
            return fn(...args);
        }

        if (typeof onOverRun === 'function') {
            return onOverRun(...args);
        }
    };
};

/**
 * 生成自动重试方法
 *
 * 返回的方法在调用时候，将执行传入的方法fn，并在失败时候自动重试
 *
 * @param {Function} fn 返回值为thenable对象的方法
 * @param {Number} times 重试的次数
 * @param {Number} delay 重试时间间隔
 * @return {Function} 生成的自动重试方法
 */
export const createRetryer = options => {
    let {
        fn,
        delay = 1000,
        times = 3,
    } = options;

    return (...args) => (
        new Promise((resolve, reject) => {
            const run = () => {
                if (times === 0) {
                    reject(new Error('fail'));
                    return;
                }
                fn(...args)
                    .then(
                        resolve,
                        () => {
                            setTimeout(() => {
                                run();
                                times--;
                            }, delay);
                        }
                    );
            };
            run();
        })
    );
};

/**
 * 处理 async/await 异常
 *
 * 返回的方法在调用时候，resolve时将执行传入的方法fn，在失败的时候返回原因
 *
 * @param {Function} fn 返回值为thenable对象的方法
 * @return {Function} 生成数组，第一个元素为失败的原因，第二个元素是结果
 */
export const catchAwait = fn => (...args) => {
    try {
        return [null, fn(...args)];
    }
    catch (e) {
        return [e];
    }
};
