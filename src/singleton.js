/**
 * 单例包装器
 * @param fn
 * @returns {Function}
 * @constructor
 */
export function Sinleton(fn) {
    let result = null
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
}

