export class Example {
  private age: number;
  sex: string;
  constructor(public name: string, age: number, sex: string) {
    this.age = age;
    this.sex = sex;
  }
  private getSex() {
    return this.sex;
  }
  public getAge() {
    return this.age;
  }
  public getAll() {
    return {
      sex: this.getSex(),
      name: this.name,
    };
  }
}
