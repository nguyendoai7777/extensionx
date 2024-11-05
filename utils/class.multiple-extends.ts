// Base type for constructor
type Constructor<T = any> = new (...args: any[]) => T;

// Helper type to combine instance types
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

// Helper type to get instance types from multiple constructors
type InstanceTypesFrom<T extends Constructor[]> = UnionToIntersection<InstanceType<T[number]>>;


function FromMultiple<B extends Constructor[]>(...args: B) {
  const copy = (target: object, source: Function) => {
    for (const key of Reflect.ownKeys(source)) {
      if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
        const desc = Object.getOwnPropertyDescriptor(source, key)!;
        Object.defineProperty(target, key, desc);
      }
    }
  };

  /*class Handler {
    constructor(...innerArgs: B) {
      let index = 0;

      for (const b of args) {
        const obj = new b(innerArgs[index++]);
        copy(this, obj);
      }
    }

  }*/

  class Handler {
    constructor(commonArg: B) {
      for (const BaseClass of args) {
        const instance = new BaseClass(commonArg);
        copy(this, instance);
      }
    }
  }

  for (const base of args) {
    copy(Handler, base);
    copy(Handler.prototype, base.prototype);
  }

  return Handler as Constructor<InstanceTypesFrom<B>>;
}
