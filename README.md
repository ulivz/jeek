# jeek.js
A awesome javascript library

## API

### clone(source)
- source: `Object` 待克隆的源对象

本方法是浅克隆，也就是说，仅仅只是完成了对源对象的第一层的值类型属性的克隆，引用类型的属性仍然传递的是引用。

### create(source)
- source: `Object` 源对象

本方法同`Object.create()`, 本方法源码如下：

```js
 function (ob) {
    let f = new Function()
    f.prototype = ob
    return new f()
}
```

也就是说，本方法将会返回一个以传入的源对象为原型对象的类的实例。

