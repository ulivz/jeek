import * as ob from '../src/object'
import chai from 'chai'
let expect = chai.expect


/* isPrototypeOf
 ========================================================================== */
describe('isPrototypeOf 的测试: ', function () {
    it('ClassA.prototype 在 instance 的原型链上', function () {

        function ClassA() {
        }

        function ClassB() {
        }

        ClassA.prototype = new ClassB()

        let instance = new ClassA()
        expect(ob.isPrototypeOf(instance, ClassB.prototype)).to.be.ok
    });
})

/* deepClone & clone
 ========================================================================== */
describe('克隆 的测试: ', function () {
    it('(直接赋值)全部都是引用， (浅克隆)第一层的值类型复制，但引用类型的属性仍然是引用，(深克隆)所有的属性都成功地克隆', function () {
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

        expect(obj2.id).to.be.equal(2)
        expect(obj3.id).to.be.equal(1)
        expect(obj4.id).to.be.equal(1)
        expect(obj2.name.first).to.be.equal('Evan')
        expect(obj3.name.first).to.be.equal('Evan')
        expect(obj4.name.first).to.be.equal('Chen')
    });
})


/* merge
 ========================================================================== */
describe('merge 的测试: ', function () {
    it('softMerge 不会覆盖对象原有的值， merge 会覆盖对象原有的值', function () {

        let obj1 = {
            id: 1,
            name: {
                first: 'Chen',
                last: 'Haoli'
            }
        }

        let obj5 = {
            id: 5
        }

        let obj6 = {
            location: 'Shanghai'
        }

        ob.softMerge(obj1, obj5, obj6)
        expect(obj1.id).to.be.equal(1)

        ob.merge(obj1, obj5, obj6)
        expect(obj1.id).to.be.equal(5)
    });
})


/* inherit
 ========================================================================== */
describe('继承 的测试: ', function () {
    it('softMerge 不会覆盖对象原有的值， merge 会覆盖对象原有的值', function () {

        function A(name) {
            this.name = name
            this.a = 'A' + name
        }

        A.prototype.getA = function () {
            return this.a
        }

        function B(name) {
            this.name = name
            this.b = 'B' + name
        }

        B.prototype.getB = function () {
            return this.b
        }

        function C(name) {
            A.call(this, name) // 继承属性，相当于调用 super()
            B.call(this, name) // 继承属性，相当于调用 super()
            this.name = name
            this.c = 'C' + name
        }

        C.prototype.getC = function () {
            return this.c
        }

        ob.inherit(C, A, B)

        let ins = new C('jeek')

        expect(ins.getA()).to.be.equal('Ajeek')
        expect(ins.getB()).to.be.equal('Bjeek')
        expect(ins.getC()).to.be.equal('Cjeek')
    });
})


describe('继承 的测试: ', function () {
    it('softMerge 不会覆盖对象原有的值， merge 会覆盖对象原有的值', function () {

        function A() {
            this.a = 'a'
        }

        A.prototype.getA = function () { return this.a }

        function B() {
            A.call(this)
            this.b = 'b'
        }

        B.prototype.getB = function () { return this.b }

        function C() {
            B.call(this)
            this.c = 'c'
        }

        C.prototype.getC = function () { return this.c }

        // Ｂ继承Ａ
        ob.inherit(B, A)

        // C继承B
        ob.inherit(C, B)

        let instance = new C()

        console.log(instance)
        console.log(instance.__proto__ === C.prototype)
        console.log(instance.__proto__.__proto__ === B.prototype)
        console.log(instance.__proto__.__proto__.__proto__ === A.prototype)

        console.log(instance.getA())
        console.log(instance.getB())
        console.log(instance.getC())

        console.log(instance.__proto__.getC.call(instance))
        console.log(instance.__proto__.__proto__.getB.call(instance))
        console.log(instance.__proto__.__proto__.__proto__.getA.call(instance))

    })
})