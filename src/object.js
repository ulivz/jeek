import * as _Type from './type'
import * as _Array from './array'

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
    if (!_Type.isObject(target)) {
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

    for (let key of Object.keys(source)) {

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
export function deepClone(ob) {
    let _ob = {}
    baseClone(ob, _ob)
    return _ob
}

/**
 * 浅克隆
 * @param object
 * @returns {{}}
 */
export function clone(object) {
    let _ob = {}
    for (let key in object) {
        _ob[key] = object[key]
    }
    return _ob
}

/**
 * 基础的 merge 方法
 * @param type
 * @param source
 * @param objs
 * @returns {*}
 */
function baseMerge(type, source, objs) {

    if (!/^(hard|soft)$/.test(type)) {
        throw new Error('[Error] The given type must be soft or hard')
    }

    if (!objs) {
        return source

    } else {

        for (let i = 0; i < objs.length; i++) {
            for (let key of Object.keys(objs[i])) {
                if (type === 'soft' && source.hasOwnProperty(key)) {
                    continue
                }
                source[key] = objs[i][key]
            }
        }
    }

}

/**
 * merge - 本方法不会覆盖源对象上的同名属性
 * @param source
 */
export function softMerge(source) {
    let objs = Array.from(arguments)
    objs.splice(0, 1)
    baseMerge('soft', source, objs)
    return source
}

/**
 * merge - 本方法会覆盖源对象上的同名属性
 * @param source
 */
export function merge(source) {
    let objs = Array.from(arguments)
    objs.splice(0, 1)
    baseMerge('hard', source, objs)
    return source
}

/**
 * 传入一个对象，返回一个继承其原型的对象实例
 * @param ob
 * @returns {f}
 */
export function createByPrototype(ob) {
    let f = new Function()
    f.prototype = ob.prototype
    return new f()
}

/**
 * 传入一个对象，返回一个继承其本身的对象实例
 * @param ob
 * @returns {f}
 */
export let create = _create ? _create : function (ob) {
    let f = new Function()
    f.prototype = ob
    return new f()
}

/**
 * 多继承
 * @param source
 * @param target
 */
export function inherit() {

    let args = Array.from(arguments)

    for (let i = args.length - 1; i > 0; i--) {
        baseInherit(args[i - 1], args[i])
    }

}

/**
 * 基本的继承方法 - 寄生组合式继承
 * @param child
 * @param parent
 */
export function baseInherit(child, parent) {

    if (!child || !parent) {
        throw new Error('[Error] Unexpeacted parameters')
    }

    let _ob = createByPrototype(parent)

    if (Object.keys(child.prototype).length !== 0) {
        merge(_ob, child.prototype)
    }

    // 寄生组合式继承
    _ob.constructor = child
    child.prototype = _ob
}