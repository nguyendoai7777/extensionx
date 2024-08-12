/**
 * this is ultis func for memoization return value of function
 * 
 * @example
 * ```ts
 * const sum  = memoFunc((a: number, b: number ) => {
 *  return a + b;
 * });
 * sum(2, 5);
 * sum(2, 3);
 * sum(2, 5);
 * sum(2, 1);

 * ```  
 */
export function memoFunc<Args extends any[], Result>(func: (...args: Args) => Result): (...args: Args) => Result {
	const cache = new Map<string, Result>();

	return function (this: any, ...args: Args): Result {
		const key = JSON.stringify(args);

		if (cache.has(key)) {
			return cache.get(key)!;
		}

		const result = func.apply(this, args);
		cache.set(key, result);
		return result;
	};
}

/* export function deepMemoFunc<Args extends any[], Result>(func: (...args: Args) => Result): (...args: Args) => Result {
	const cache = new WeakMap<object, Map<string, Result>>();

	return function (this: any, ...args: Args): Result {
		let key: string;
		try {
			key = JSON.stringify(args);
		} catch (error) {
			console.warn('Could not stringify args, bypassing cache');
			return func.apply(this, args);
		}

		const argsCache = cache.get(this) || new Map<string, Result>();
		if (!cache.has(this)) {
			cache.set(this, argsCache);
		}

		if (argsCache.has(key)) {
			return argsCache.get(key)!;
		}

		const result = func.apply(this, args);
		argsCache.set(key, result);
		return result;
	};
} */
