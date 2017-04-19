/**
 * 将 ArrayLike 的对象转化为数组
 * @type {Function}
 */
export let _from = Array.from ? Array.from : function (arrayLike) {
    return Array.prototype.slice.call(arrayLike)
}

/**
 * 类似于 forEach, 因此也不能跳出
 * @param array
 * @param func
 */
export const each = function (array, func) {
    for (var i = 0, l = array.length; i < l; i++) {
        func(array[i], i, array)
    }
}

/**
 * 类似于 _.map
 * @param array
 * @param func
 */
export const map = function (array, func) {
    for (var i = 0, l = array.length; i < l; i++) {
        array[i] = func(array[i], i, array)
    }
}








