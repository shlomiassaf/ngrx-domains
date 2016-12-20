import { Type } from './utils';


export namespace Model {
  const X = 15;
}

/**
 * Register a model in the model registry.
 *
 * @param cls
 * @param name Optional, if not set "name" property is used.
 */
export function register(cls: Type<any>, name?: string): void {
  Model[name || cls.name] = cls;
}

/**
 * Registers a namespace.
 *
 * EXAMPLE:
 *
 * namespace MyModels {
 *   export class MyClass1 { }
 *   export class MyClass2 { }
 *   export class MyClass3 { }
 * }
 * registerNS(MyModels);
 *
 *
 *
 * Will register "MyClass1", "MyClass2" and "MyClass3"
 *
 * @param ns
 */
export function registerNS(ns: any): void {
  Object.keys(ns).forEach( key => register(ns[key]) );
}
