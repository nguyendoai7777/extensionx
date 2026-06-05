export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}

export type CastString<T> = T | (string & {})

type XRange<
  TStart extends number,
  TEnd extends number,
  TAcc extends number[] = [],
  TResult extends number = never
> = TAcc['length'] extends TEnd
  ? TResult | TEnd
  : XRange<
    TStart,
    TEnd,
    [...TAcc, TAcc['length']],
    TAcc['length'] extends TStart
      ? TStart
      : TResult extends never
        ? never
        : TResult | TAcc['length']
  >
