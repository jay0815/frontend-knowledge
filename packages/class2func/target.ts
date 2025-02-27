"use strict";
/**
 *
 * Enable strict mode to avoid incorrect "this" binding
 *
 * 在严格模式下，如果函数不是以对象方法调用（比如直接调用）
 * this 的值将是 undefined，而不是默认指向全局对象
 * 这可以防止因 this 指向错误而导致的 Bug
 *
 */

const defineProperty = Object.defineProperty;

export var Example = (function () {
  /**
   * 定义原型方法，封装防止用 new 调用的检测逻辑
   * Define a prototype method with encapsulated logic to prevent invocation with "new".
   *
   * @param {Function} target - 构造函数 / Constructor function
   * @param {string} property - 要定义的方法名称 / The name of the method to define
   * @param {Function} method - 原始方法，必须为具名函数 / The original method; must be a named function
   */
  function innerDefineOwnProperty(
    target: Function,
    property: string,
    method: Parameters<typeof defineProperty>[2]["value"],
  ) {
    // 将方法定义在构造函数的原型上
    // Define the method on the constructor's prototype
    defineProperty(target.prototype, property, {
      value: function () {
        // 如果当前调用使用了 new 关键字来调用该方法，则 this instanceof method 为 true
        // If the method is invoked as a constructor (using "new"), then "this instanceof method" will be true.
        if (this instanceof method) {
          throw TypeError(
            target.name + ".prototype." + property + " is not a constructor",
          );
        }
        // 否则正常调用原始方法
        // Otherwise, invoke the original method normally.
        return method.apply(this, arguments);
      },
      /**
       * class 中的 函数属性 不可枚举
       */
      enumerable: false,
      /**
       * 如果知道当前函数名，允许通过Object.defineProperty 修改 value
       */
      writable: true,
      /**
       * 如果知道当前函数名，允许通过Object.defineProperty 修改 当前 attributes 对象
       */
      configurable: true,
    });
  }

  /**
   * 构造函数 Example，确保只能通过 new 调用
   * Constructor function Example; ensures that it can only be invoked with "new".
   *
   * @param {string} name - 名称 / Name
   * @param {number} age - 年龄 / Age
   * @param {string} sex - 性别 / Sex
   */
  function Example(name: string, age: number, sex: string) {
    // 构造函数确保只能用 new 调用
    // If not invoked with "new", throw an error.
    if (!(this instanceof Example)) {
      throw TypeError(
        "class constructor " +
          Example.name +
          " can not be invoked with out 'new'",
      );
    }
    // if (!new.target) {
    //   throw TypeError(
    //     "class constructor " + this.name + " can not be invoked with out 'new'",
    //   );
    // }
    this.name = name;
    this.age = age;
    this.sex = sex;
  }
  // 定义原型方法时，可以使用匿名函数，但具名函数有助于调试定位问题
  // When defining prototype methods, you can use anonymous functions; however, named functions are recommended for easier debugging.
  innerDefineOwnProperty(Example, "getSex", function getSex() {
    return this.sex;
  });
  innerDefineOwnProperty(Example, "getAge", function getAge() {
    return this.age;
  });
  innerDefineOwnProperty(Example, "getAll", function getAll() {
    return {
      sex: this.getSex(),
      name: this.name,
    };
  });
  return Example;
})();
