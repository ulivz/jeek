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

/* isPrototypeOf
 ========================================================================== */