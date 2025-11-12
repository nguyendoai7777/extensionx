/**
 * return `key` with `undefined` value in callback to delete from return object
 * @example
 * ```ts
 * const vehicle = {
 *   Type: 'ô tô con',
 *   Mark: 'TOYOTA',
 *   Model: 'Vios e NCP150L-BEMRKU',
 *   Engine_number: '1NZZ342190',
 *   Vin: 'RL48T9F30F4017762',
 *   Year: '2015, Việt Nam',
 *   Engine: '1497 cm3',
 *   Seri: 'KC-4003297',
 *   Valid_until_date: null,
 *   Front_number: null,
 * };
 * const result = mapSnakeToCamel(vehicle, (obj) => ({
 *   chassisNumber: obj.Engine_number,
 *   hasCard: partnerData.has_card,
 *   vin: undefined,
 *   validUntilDate: undefined,
 *   frontNumber: undefined,
 * }));
 * ```
 * */

export function mapSnakeToCamel<T extends object, R extends object>(
  obj: T,
  callback?: (objSource: T) => R,
) {
  const toCamel = (str: string) =>
    str
      .replace(/^([A-Z])/, (c) => c.toLowerCase())
      .replace(/_([a-zA-Z])/g, (_, c) => c.toUpperCase());

  const mapped = Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [toCamel(k), v]),
  ) as T;

  const result = {
    ...mapped,
    ...(callback ? callback(obj) : {}),
  } as Record<string, any>;

  // xoá tất cả key có value === undefined
  for (const key in result) {
    if (result[key] === undefined) {
      delete result[key];
    }
  }

  return result;
}
