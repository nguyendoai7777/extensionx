/**
 *
 * @example
 * ```ts
 * const vehicle = [{
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
 * }];
 * const result = mapper(vehicle, (obj) => ({
 *   chassisNumber: obj.Engine_number,
 * }));
 * ```
 * */

export const mapper = <T, R>(data: T[], mapFn: (record: T) => R) => {
  return data.map((c) => ({ ...c, ...mapFn(c) }) as T & R);
};
