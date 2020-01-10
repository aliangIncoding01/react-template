export const isNonEmptyObject = variable =>
    Object.prototype.toString.call(variable) === '[object Object]'
        && JSON.stringify(variable) !== '{}';

export default {};
