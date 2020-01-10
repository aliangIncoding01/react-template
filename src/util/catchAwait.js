/* eslint-disable babel/no-invalid-this */
export default async fn => {
    try {
        const res = await fn();
        return [null, res];
    }
    catch (e) {
        return [e];
    }
};

export function catchAwait(fn) {
    return (...args) => {
        try {
            return [null, fn(...args)];
        }
        catch (e) {
            return [e];
        }
    };
}
