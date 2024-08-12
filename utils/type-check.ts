export type ReturnTypeCheck<T = any> =
  T extends 'Number' ? 'Number' :
    T extends 'String' ? 'String' :
      T extends 'Boolean' ? 'Boolean' :
        T extends 'Object' ? 'Object' :
          T extends 'Date' ? 'Date' :
            T extends 'Array' ? 'Array' :
              T extends 'Symbol' ? 'Symbol' :
                T extends 'Null' ? 'Null' :
                  T extends 'Undefined' ? 'Undefined' :
                    T extends 'Function' ? 'Function':
                      'any';


export function typeCheck(val: any): ReturnTypeCheck {
  return (Object.prototype.toString.call(val).replace(/[\[\]]/gi, '').split(' ')[1]) as ReturnTypeCheck;
}