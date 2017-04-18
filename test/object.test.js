import * as ob from '../src/object'
import chai from 'chai'
let expect = chai.expect


/* isPrototypeOf
   ========================================================================== */
function ClassA() {}
function ClassB() {}

// 原型继承
ClassA.prototype = new ClassB()

let instance = new ClassA()

describe('isPrototypeOf 的测试: ', function () {
    it('ClassA.prototype 在 instance 的原型链上', function () {
        expect(ob.isPrototypeOf(instance, ClassB.prototype)).to.be.ok
    });
})

/* deepClone & clone
 ========================================================================== */

let obj1 = {
    id: 1,
    name: {
        first: 'Chen',
        last: 'Haoli'
    }
}

let obj2 = obj1
let obj3 = ob.clone(obj1)
let obj4 = ob.deepClone(obj1)

obj1.id = 2
obj1.name.first = 'Evan'

describe('克隆 的测试: ', function () {
    it('(直接赋值)全部都是引用， (浅克隆)第一层的值类型复制，但引用类型的属性仍然是引用，(深克隆)所有的属性都成功地克隆', function () {
        expect(obj2.id).to.be.equal(2)
        expect(obj3.id).to.be.equal(1)
        expect(obj4.id).to.be.equal(1)
        expect(obj2.name.first).to.be.equal('Evan')
        expect(obj3.name.first).to.be.equal('Evan')
        expect(obj4.name.first).to.be.equal('Chen')
    });
})


/* softMerge
   ========================================================================== */
let obj5 = {
    id: 5
}

let obj6 = {
    location: 'Shanghai'
}

console.log(obj1)

describe('merge 的测试: ', function () {
    it('softMerge 不会覆盖对象原有的值， merge 会覆盖对象原有的值', function () {

        ob.softMerge(obj1, obj5, obj6)
        expect(obj2.id).to.be.equal(2)

        ob.merge(obj1, obj5, obj6)
        expect(obj2.id).to.be.equal(5)
    });
})