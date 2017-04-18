/**
 * 将 ArrayLike 的对象转化为数组
 * @type {Function}
 */
export const _from = Array.from ? Array.from : function (arrayLike) {
    return Array.prototype.slice.call(arrayLike)
}