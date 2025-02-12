interface ClassType<T extends abstract new (...args: any) => any>
  extends Object {
  new (...args: ConstructorParameters<T>): InstanceType<T>;
  prototype: T & {
    constructor: new (...args: ConstructorParameters<T>) => InstanceType<T>;
  };
}
/**
 * 单例函数：传入一个类（构造函数），返回一个代理，
 * 该代理保证通过 new 调用时只创建一个实例，
 * 并且将该代理赋值给 prototype.constructor，
 * 使得 new A.constructor() 也返回同一个实例。
 */
const singleton = <T extends abstract new (...args: any) => any>(
  className: T,
): ClassType<T> => {
  let instance: InstanceType<T>;
  const proxy = new Proxy(className, {
    construct(target, argArray, newTarget) {
      if (!instance) {
        instance = Reflect.construct(target, argArray, newTarget);
      }
      return instance;
    },
  });
  // 将 prototype.constructor 指向代理
  className.prototype.constructor = proxy;
  return proxy as unknown as ClassType<T>;
};

export default singleton;
