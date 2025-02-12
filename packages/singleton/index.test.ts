import { describe, it, expect } from "vitest";
import singleton from "./index.ts";

// 示例类 A
class A {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// 使用 singleton 函数生成单例类 B
const B = singleton(A);

describe("Singleton Logic Test", () => {
  it("should always return the same instance", () => {
    const a = new B("a");
    const b = new B.prototype.constructor("b");
    const c = new B("c");

    // 验证所有实例均为同一个引用
    expect(a).toBe(b);
    expect(a).toBe(c);

    // 由于第一次创建时传入参数 "a"，所有实例的 name 应该保持为 "a"
    expect(a.name).toBe("a");
    expect(b.name).toBe("a");
    expect(c.name).toBe("a");
  });
});
