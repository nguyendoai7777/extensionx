export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}

export type CastString<T> = T | (string & {})

type L = 'length'
export type XRange<
  TStart extends number,
  TEnd extends number,
  TAcc extends number[] = [],
  TResult extends number = never
> = TAcc[L] extends TEnd
  ? TResult | TEnd
  : XRange<
    TStart,
    TEnd,
    [...TAcc, TAcc[L]],
    TAcc[L] extends TStart
      ? TStart
      : TResult extends never
        ? never
        : TResult | TAcc[L]
  >
