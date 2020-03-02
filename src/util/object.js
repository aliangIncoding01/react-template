/* eslint-disable import/prefer-default-export */
/**
 * @file 对象处理
 * @author liuxin01
 */
export const isNonemptyObject = variable =>
    Object.prototype.toString.call(variable) === '[object Object]'
        && JSON.stringify(variable) !== '{}';
