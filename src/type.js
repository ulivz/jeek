const TYPE = {
    Number: '[object Number]',
    Boolean: '[object Boolean]',
    String: '[object String]',
    Undefined: '[object Undefined]',
    Null: "[object Null]",
    Object: "[object Object]"
}

export function isType(value, type) {
    return Object.prototype.toString.call(value) === TYPE[type]
}

export function isArray(value) {
    return Array.isArray(value)
}

export function isObject(value) {
    return typeof value === 'object'
}

export function isPureObject(value) {
    return isType(value, 'Object')
}

export function isNumber(value) {
    return isType(value, 'Number')
}

export function isString(value) {
    return isType(value, 'String')
}

export function isUndefined(value) {
    return value === void 0
}

export function isNull(value) {
    return isType(value, 'Null')
}