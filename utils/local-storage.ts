/**
 * improve localStorage API
 */

export class LS {
	static setItem(key: string, data: unknown): void {
		if (typeof data === 'object') {
			localStorage.setItem(key, JSON.stringify(data));
		} else {
			localStorage.setItem(key, data as string);
		}
	}

	static getItem<TData = string>(key: string): (TData extends object ? TData : string) | null {
		const item = localStorage.getItem(key);
		if (!item) {
			return null;
		}
		try {
			const parsed = JSON.parse(item);
			if (typeof parsed === 'object') {
				return parsed;
			}
			return item as TData extends object ? TData : string;
		} catch (e) {
			return item as TData extends object ? TData : string;
		}
	}

	static removeItem(key: string) {
		localStorage.removeItem(key);
	}
	static clear() {
		localStorage.clear();
	}
}

// as const
export const StorageLocal = {
  setItem: (key: string, data: unknown) => {
    if (typeof data === 'object') {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data as string);
    }
  },
  getItem: <TData = string>(key: string): (TData extends object ? TData : string) | null => {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    try {
      const parsed = JSON.parse(item);
      if (typeof parsed === 'object') {
        return parsed;
      }
      return item as TData extends object ? TData : string;
    } catch (e) {
      return item as TData extends object ? TData : string;
    }
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};

