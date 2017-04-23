# jeek.js
A awesome javascript library

## API



## Object

### clone(source)
- source: `Object` 待克隆的源对象

本方法是浅克隆，也就是说，仅仅只是完成了对源对象的第一层的值类型属性的克隆，引用类型的属性仍然传递的是引用。


### deepClone(source)
- source: `Object` 源对象

本方法是深克隆，请注意，在引用类型中，本方法仅仅只对对象和数组进行了深克隆。

### create(source)
- source: `Object` 源对象

本方法同`Object.create()`, 源码如下：

```js
 function (ob) {
    let f = new Function()
    f.prototype = ob
    return new f()
}
```

也就是说，本方法将会返回一个以**给定源对象**为原型对象的类的实例。

### createByPrototype(source)
- source: `Object` 源对象

注意本方法与`create()`的区别，本方法将会返回一个以**给定源对象的原型对象**为原型对象的类的实例，本方法在寄生继承中十分常见。

## Array

### each(array, callback)
- array: `Array` 源数组
- callback: `Function` 一个包含`(value, index, array)`三个参数的回调函数

本方法同`Array.prototype.forEach()`

### map(array, callback)
- array: `Array` 源数组
- callback: `Function` 一个包含`(value, index, array)`三个参数的回调函数

本方法同`Array.prototype.map()`


## Type

### isArray(source)
- source: `any`

### isNull(source)
- source: `any`

### isNumber(source)
- source: `any`

### isObject(source)
- source: `any`

### isPureObject(source)
- source: `any`

### isPrototypeOf(source)
- source: `any`

### isString(source)
- source: `any`

### isUndefined(source)
- source: `any`


