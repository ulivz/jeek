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

### merge(object1, object2 ... objectN)
- object1: `Object` 对象1
- object2: `Object` 对象2
- objectN: `Object` 对象N

`merge()`方法可以合并多个对象, 并返回一个合并后的对象。请注意，虽然本方法并未直接修改源对象，但合并时仍然采用的是浅复制，在使用时请考虑是否允许修改源对象。如果不允许，请结合深复制`deepClone()`来进行合并。

合并示例, 例如本库最终在导出时使用了自己的`merge()`方法：

```js
import * as object from './src/object'
import * as array from './src/array'
import * as type from './src/type'

export default object.merge(
    object,
    array,
    type
)
```

### relyMerge(object1, object2 ... objectN)

`relyMerge()`，故名思议，为“依赖合并”。和`merge()`方法的区别在于：`relyMerge()`会以传入参数中的第一个对象为**基对象**，并将后续对象的属性都合并到第一个对象中。本方法在本类库实现`baseInherit()`方法时用到了：

```js
    let _ob = createByPrototype(parent)

    if (Object.keys(child.prototype).length !== 0) {
        relyMerge(_ob, child.prototype)
    }

    _ob.constructor = child
    child.prototype = _ob
```

仔细体会，你会发现这段代码的精髓——为什么这里只能用`relyMerge()`，而不能用`merge()`？

### relySoftMerge(object1, object2 ... objectN)

`relySoftMerge()` 同 `relyMerge()` 的区别如下：

method|description
---|---
`relySoftMerge()`|不会覆盖第一个对象上的同名属性
`relyMerge()` |与`relySoftMerge()`相反


### baseInherit(childClass, parentClass)
- childClass: `Finction` 子类
- parentClass: `Finction` 父类

请注意，本继承方法仅仅是**实现原型的继承**——关于实例属性和方法的继承，请结合构造函数式继承来完成, 示例如下：

```js
    function A(name) {
        this.name = name
        this.a = 'A' + name
    }

    A.prototype.getA = function () {
        return this.a
    }
    
    function B(name) {
    	A.call(name)  // 构造函数式继承 - 类似于 Java 的 super(props)
        this.name = name
        this.b = 'B' + name
    }
    
    B.prototype.getB = function () {
        return this.b
    }
    
    baseInherit(B, A) // 继承原型 - 基于寄生组合式继承实现
        
```

为什么说本方法是基于寄生组合式继承实现，而不仅仅是寄生组合式继承？原因在于，本方法可以在子类继承父类原型**之前**给子类的原型上添加方法，而传统的寄生组合式继承必须在子类继承父类原型**之后**给子类的原型上添加方法。


### inherit(class1, class2 ... classN)
- class1: `Finction` 继承链的第一个类
- class2: `Finction` 继承链的第二个类
- classN: `Finction` 继承链的第N个类

`inherit()`是`baseInherit()`的升级版，可以快速地帮你构建起一个原型继承链。如果有三个类`A`、`B`、`C`、`D`, 调用方法如下：

```js
inherit(D, C, B, A)
```

那么，本方法实际上帮你实现了D继承C、C继承B、B继承了A。一个完整的继承的例子如下：

```js
    function A() {
        this.a = 'a'
    }

    A.prototype.getA = function () {
        return this.a
    }

    function B() {
        A.call(this)
        this.b = 'b'
    }

    B.prototype.getB = function () {
        return this.b
    }

    function C() {
        B.call(this)
        this.c = 'c'
    }

    C.prototype.getC = function () {
        return this.c
    }

    ob.inherit(C, B, A)

    let instance = new C()

    console.log(instance)
    console.log(instance.__proto__ === C.prototype) // true
    console.log(instance.__proto__.__proto__ === B.prototype) // true
    console.log(instance.__proto__.__proto__.__proto__ === A.prototype) // true

    console.log(instance.getA()) // 'a'
    console.log(instance.getB()) // 'b'
    console.log(instance.getC()) // 'c'

    console.log(instance.__proto__.getC.call(instance)) // 'c'
    console.log(instance.__proto__.__proto__.getB.call(instance)) // 'b'
    console.log(instance.__proto__.__proto__.__proto__.getA.call(instance)) // 'a'
```

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


