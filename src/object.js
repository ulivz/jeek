import * as type from './type'

const _keys = Object.keys
const _assign = Object.assign
const _create = Object.create
const _defineProperty = Object.defineProperty
const _defineProperties = Object.defineProperties
const _getPrototypeOf = Object.getPrototypeOf
const _setPrototypeOf = Object.setPrototypeOf

/**
 * 判断一个对象是否在另一个对象的原型上
 * 本方法用来测试第二个参数对象的原型是否在第一个参数对象的原型链上
 * @param source
 * @param target
 */
export function isPrototypeOf(source, target) {
    if (!type.isObject(target)) {
        throw new Error('[Error] The given target is not an object')
    }
    // isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上。
    return target.isPrototypeOf(source)
}

/**
 * 传入两个对象，进行递归深克隆
 * @param source
 * @param target
 */
function baseClone(source, target) {

    for (let key of _keys(source)) {

        // 若存在对象的属性引用对象自身的
        // 为了避免死循环，跳过
        if (source[key] === source) continue

        // 引用类型
        // 继续递归克隆
        if (typeof source[key] === 'object') {
            target[key] = source[key].constructor === Array ? [] : {}
            baseClone(source[key], target[key])

        // 值类型
        } else {
            target[key] = source[key]
        }
    }
}

/**
 * 深克隆
 * @param source
 * @returns {Object}
 */
export function deepClone(source) {
    let __ob__ = new Object()
    baseClone(source, __ob__)
    return __ob__
}
