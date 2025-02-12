import { assertType, expectTypeOf, test } from "vitest";
import singleton from "./index.ts";

// 类型测试：instance1 和 instance2 都应该是 A 的实例
// expectTypeOf<A>(instance1);
// expectTypeOf<A>(instance2);

test("my types work properly", () => {
  class A {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  // 使用 singleton 函数生成单例类 B
  const B = singleton(A);

  // 使用 new 调用获得实例
  const instance1 = new B("hello");
  const instance2 = new B.prototype.constructor("world");

  expectTypeOf(instance1).toEqualTypeOf<typeof instance2>();
  expectTypeOf(instance1).toEqualTypeOf<A>();
});
