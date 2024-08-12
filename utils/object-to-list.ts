interface DefaultFactoryReturn {
	key: string;
	value: any;
}

interface Object {
	toList<T = DefaultFactoryReturn>(): T[];
	toList<T>(factoryFn?: (record: [string, any]) => T): T[];
}

Object.prototype.toList = function () {
	const factoryFn = arguments[0];
	if (factoryFn && typeof factoryFn === 'function') {
		return Object.entries(this).map(factoryFn);
	}
	const keys = Object.keys(this);
	return keys.map((c) => ({
		key: c,
		value: this[c],
	}));
};
