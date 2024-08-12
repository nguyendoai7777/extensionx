export class Color {
	/**
	 * @type {string}
	 */
	val;
	/**
	 *
	 * @param hexCode {string} string
	 */
	constructor(hexCode) {
		this.val = hexCode;
	}

	/**
	 * @param hex {string} string
	 *
	 * @example toRGB('#ff0000')
	 */
	toRGB(hex) {
		let c;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			c = this.val.substring(1).split('');
			if (c.length == 3) {
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c = '0x' + c.join('');
			return 'rgb(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ')';
		}
		throw new Error('Bad hex code');
	}
	/**
	 *  @param hex {string} string
	 *  @param opacity {string} double from `0` to `1`
	 *  @example toRGBA('#ff0000', 0.2)
	 */
	#toRGBA(hex, opacity) {
		let c;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			c = this.val.substring(1).split('');
			if (c.length == 3) {
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c = '0x' + c.join('');
			/* return (
        'rgb(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ')'
      ); */
			return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, ${opacity})`;
		}
		throw new Error('Bad hex code');
	}
	/**
	 *  @param opacity {number} 0 -> 1
	 */
	withOpacity(opacity) {
		if (typeof opacity != 'number') {
			throw Error('`opacity` must be number from 0 to 1');
		}
		if (opacity > 1) {
			opacity = 1;
		}
		if (opacity < 0) {
			opacity = 0;
		}
		return this.#toRGBA(this.val, opacity);
	}
	/* get light() {
		return this.#toRGBA(this.val, 0.25);
	} */
}

class MaterialColor {
	#swatch;
	#primary;
	constructor(primary, swatch) {
		this.#primary = primary;
		this.#swatch = swatch;
	}
	/**
	 * @type {string}
	 */
	get val() {
		return this.#primary;
	}
	/**
	 * @type {Color}
	 */
	get 50() {
		return this.#swatch[50];
	}
	/**
	 * @type {Color}
	 */
	get 100() {
		return this.#swatch[100];
	}
	/**
	 * @type {Color}
	 */
	get 200() {
		return this.#swatch[200];
	}
	/**
	 * @type {Color}
	 */
	get 300() {
		return this.#swatch[300];
	}
	/**
	 * @type {Color}
	 */
	get 400() {
		return this.#swatch[400];
	}
	/**
	 * @type {Color}
	 */
	get 500() {
		return this.#swatch[500];
	}
	/**
	 * @type {Color}
	 */
	get 600() {
		return this.#swatch[600];
	}
	/**
	 * @type {Color}
	 */
	get 700() {
		return this.#swatch[700];
	}
	/**
	 * @type {Color}
	 */
	get 800() {
		return this.#swatch[800];
	}
	/**
	 * @type {Color}
	 */
	get 900() {
		return this.#swatch[900];
	}

	/**
	 * @Color {string}
	 */ get shade50() {
		return this.#swatch[50];
	}
	/**
	 * @type {string}
	 */
	get shade100() {
		return this.#swatch[100];
	}
	/**
	 * @type {Color}
	 */
	get shade200() {
		return this.#swatch[200];
	}
	/**
	 * @type {Color}
	 */
	get shade300() {
		return this.#swatch[300];
	}
	/**
	 * @type {Color}
	 */
	get shade400() {
		return this.#swatch[400];
	}
	/**
	 * @type {Color}
	 */
	get shade500() {
		return this.#swatch[500];
	}
	/**
	 * @type {Color}
	 */
	get shade600() {
		return this.#swatch[600];
	}
	/**
	 * @type {Color}
	 */
	get shade700() {
		return this.#swatch[700];
	}
	/**
	 * @type {Color}
	 */
	get shade800() {
		return this.#swatch[800];
	}
	/**
	 * @type {Color}
	 */
	get shade900() {
		return this.#swatch[900];
	}
}

export class Colors {
	/**
	 * ```javascript
	 *  const deeppink = Colors.red.val
	 * ```
	 * ![](https://raw.githubusercontent.com/nguyendoai7777/Colors-Resource/main/Deppink.png)
	 */
	static deeppink = new Color('#ff1493');
	static deepsky = new Color('#00bfff');
	static sky = new Color('#3daaff');
	static white = new Color('#ffffff');
	static black = new Color('#000000');
	static aqua = new Color('#00ffff');
	static chocolate = new Color('#d26912');
	static violet = new Color('#ee82ee');
	static neon = new Color('#7ff000');
	static crimson = new Color('#dc143c');
	static fuchisa = new Color('#ff00ff');
	static dodgerblue = new Color('#1e90ff');
	static tomato = new Color('#ff6347');
	static smoke = new Color('#708090');
	static silver = new Color('#c0c0c0');
	static gold = new Color('#ffd700');
	static orchid = new Color('#da70d6');

	static dracula = new Color('#282A36');
	static draculaBold = new Color('#21222C');
	static draculaPink = new MaterialColor('#FF79C6', {
		300: new Color('#ff92d0'),
		600: new Color('#fd5ab6'),
	});
	static draculaPurple = new MaterialColor('#9f62f5', {
		300: new Color('#BD93F9'),
	});

	/**
	 * ```javascript
	 *  const red = Colors.red.val
	 *  const red400 = Colors.red[400].val
	 *  const redshade400 = Colors.red.shade400.val
	 * ```
	 * ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.red.png)
	 */

	static red = new MaterialColor('#F44336', {
		50: new Color('#FFEBEE'),
		100: new Color('#FFCDD2'),
		200: new Color('#EF9A9A'),
		300: new Color('#E57373'),
		400: new Color('#EF5350'),
		500: new Color('#F44336'),
		600: new Color('#E53935'),
		700: new Color('#D32F2F'),
		800: new Color('#C62828'),
		900: new Color('#B71C1C'),
	});

	/**
	 * ```javascript
	 *  const pink = Colors.pink.val
	 *  const pink400 = Colors.pink[400].val
	 *  const pinkshade400 = Colors.pink.shade400.val
	 * ```
	 * ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.pink.png)
	 */
	static pink = new MaterialColor('#E91E63', {
		50: new Color('#FCE4EC'),
		100: new Color('#F8BBD0'),
		200: new Color('#F48FB1'),
		300: new Color('#F06292'),
		400: new Color('#EC407A'),
		500: new Color('#E91E63'),
		600: new Color('#D81B60'),
		700: new Color('#C2185B'),
		800: new Color('#AD1457'),
		900: new Color('#880E4F'),
	});

	/**
	 * ```javascript
	 *  const purple = Colors.purple.val
	 *  const purple400 = Colors.purple[400].val
	 *  const purpleshade400 = Colors.purple.shade400.val
	 * ```
	 * ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.purple.png)
	 */

	static purple = new MaterialColor('#9C27B0', {
		50: new Color('#f3e5f5'),
		100: new Color('#e1bee7'),
		200: new Color('#ce93d8'),
		300: new Color('#ba68c8'),
		400: new Color('#ab47bc'),
		500: new Color('#9C27B0'),
		600: new Color('#8e24aa'),
		700: new Color('#7b1fa2'),
		800: new Color('#6a1b9a'),
		900: new Color('#4a148c'),
	});

	/**
	 * ```javascript
	 *  const deepPurple = Colors.deepPurple.val
	 *  const deepPurple400 = Colors.deepPurple[400].val
	 *  const deepPurpleshade400 = Colors.deepPurple.shade400.val
	 * ```
	 * ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.deepPurple.png)
	 */
	static deepPurple = new MaterialColor('#673AB7', {
		50: new Color('#EDE7F6'),
		100: new Color('#D1C4E9'),
		200: new Color('#B39DDB'),
		300: new Color('#9575CD'),
		400: new Color('#7E57C2'),
		500: new Color('#673AB7'),
		600: new Color('#5E35B1'),
		700: new Color('#512DA8'),
		800: new Color('#4527A0'),
		900: new Color('#311B92'),
	});

	/**
	 * ```javascript
	 *  const indigo = Colors.indigo.val
	 *  const indigo400 = Colors.indigo[400].val
	 *  const indigoshade400 = Colors.indigo.shade400.val
	 * ```
	 *  ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.indigo.png)
	 */
	static indigo = new MaterialColor('#3F51B5', {
		50: new Color('#E8EAF6'),
		100: new Color('#C5CAE9'),
		200: new Color('#9FA8DA'),
		300: new Color('#7986CB'),
		400: new Color('#5C6BC0'),
		500: new Color('#3F51B5'),
		600: new Color('#3949AB'),
		700: new Color('#303F9F'),
		800: new Color('#283593'),
		900: new Color('#1A237E'),
	});

	/**
	 * ```javascript
	 *  const blue = Colors.blue.val
	 *  const blue400 = Colors.blue[400].val
	 *  const blueshade400 = Colors.blue.shade400.val
	 * ```
	 * ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.blue.png)
	 */

	static blue = new MaterialColor('#2196F3', {
		50: new Color('#E3F2FD'),
		100: new Color('#BBDEFB'),
		200: new Color('#90CAF9'),
		300: new Color('#64B5F6'),
		400: new Color('#42A5F5'),
		500: new Color('#2196F3'),
		600: new Color('#1E88E5'),
		700: new Color('#1976D2'),
		800: new Color('#1565C0'),
		900: new Color('#0D47A1'),
	});

	/**
	 * ```javascript
	 *  const lightBlue = Colors.lightBlue.val
	 *  const lightBlue400 = Colors.lightBlue[400].val
	 *  const lightBlueshade400 = Colors.lightBlue.shade400.val
	 * ```
	 * ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.lightBlue.png)
	 */

	static lightBlue = new MaterialColor('#03A9F4', {
		50: new Color('#E1F5FE'),
		100: new Color('#B3E5FC'),
		200: new Color('#81D4FA'),
		300: new Color('#4FC3F7'),
		400: new Color('#29B6F6'),
		500: new Color('#03A9F4'),
		600: new Color('#039BE5'),
		700: new Color('#0288D1'),
		800: new Color('#0277BD'),
		900: new Color('#01579B'),
	});

	/**
	 * ```javascript
	 *  const cyan = Colors.cyan.val
	 *  const cyan400 = Colors.cyan[400].val
	 *  const cyanshade400 = Colors.cyan.shade400.val
	 * ```
	 * ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.cyan.png)
	 */

	static cyan = new MaterialColor('#00BCD4', {
		50: new Color('#E0F7FA'),
		100: new Color('#B2EBF2'),
		200: new Color('#80DEEA'),
		300: new Color('#4DD0E1'),
		400: new Color('#26C6DA'),
		500: new Color('#00BCD4'),
		600: new Color('#00ACC1'),
		700: new Color('#0097A7'),
		800: new Color('#00838F'),
		900: new Color('#006064'),
	});

	/**
	 * ```javascript
	 *  const teal = Colors.teal.val
	 *  const teal400 = Colors.teal[400].val
	 *  const tealshade400 = Colors.teal.shade400.val
	 * ```
	 *  ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.teal.png)
	 */
	static teal = new MaterialColor('#009688', {
		50: new Color('#E0F2F1'),
		100: new Color('#B2DFDB'),
		200: new Color('#80CBC4'),
		300: new Color('#4DB6AC'),
		400: new Color('#26A69A'),
		500: new Color('#009688'),
		600: new Color('#00897B'),
		700: new Color('#00796B'),
		800: new Color('#00695C'),
		900: new Color('#004D40'),
	});

	/**
	 * ```javascript
	 *  const green = Colors.green.val
	 *  const green400 = Colors.green[400].val
	 *  const greenshade400 = Colors.green.shade400.val
	 * ```
	 * ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.green.png)
	 */
	static green = new MaterialColor('#4CAF50', {
		50: new Color('#e8f5e9'),
		100: new Color('#c8e6c9'),
		200: new Color('#a5d6a7'),
		300: new Color('#81c784'),
		400: new Color('#66bb6a'),
		500: new Color('#4CAF50'),
		600: new Color('#43a047'),
		700: new Color('#388e3c'),
		800: new Color('#2e7d32'),
		900: new Color('#1b5e20'),
	});

	/**
	 * ```javascript
	 *  const yellow = Colors.yellow.val
	 *  const yellow400 = Colors.yellow[400].val
	 *  const yellowshade400 = Colors.yellow.shade400.val
	 * ```
	 * ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.yellow.png)
	 */

	static yellow = new MaterialColor('#FFEB3B', {
		50: new Color('#fffde7'),
		100: new Color('#fff9c4'),
		200: new Color('#fff59d'),
		300: new Color('#fff176'),
		400: new Color('#ffee58'),
		500: new Color('#FFEB3B'),
		600: new Color('#fdd835'),
		700: new Color('#fbc02d'),
		800: new Color('#f9a825'),
		900: new Color('#f57f17'),
	});

	/**
	 * ```javascript
	 *  const amber = Colors.amber.val
	 *  const amber400 = Colors.amber[400].val
	 *  const ambershade400 = Colors.amber.shade400.val
	 * ```
	 *  ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.amber.png)
	 */
	static amber = new MaterialColor('#FFC107', {
		50: new Color('#fff8e1'),
		100: new Color('#ffecb3'),
		200: new Color('#ffe082'),
		300: new Color('#ffd54f'),
		400: new Color('#ffca28'),
		500: new Color('#FFC107'),
		600: new Color('#ffb300'),
		700: new Color('#ffa000'),
		800: new Color('#ff8f00'),
		900: new Color('#ff6f00'),
	});

	/**
	 * ```javascript
	 *  const orange = Colors.orange.val
	 *  const orange400 = Colors.orange[400].val
	 *  const orangeshade400 = Colors.orange.shade400.val
	 * ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.orange.png)
	 */

	static orange = new MaterialColor('#FF9800', {
		50: new Color('#fff3e0'),
		100: new Color('#ffe0b2'),
		200: new Color('#ffcc80'),
		300: new Color('#ffb74d'),
		400: new Color('#ffa726'),
		500: new Color('#FF9800'),
		600: new Color('#fb8c00'),
		700: new Color('#f57c00'),
		800: new Color('#ef6c00'),
		900: new Color('#e65100'),
	});

	/**
	 * ```javascript
	 *  const brown = Colors.brown.val
	 *  const brown400 = Colors.brown[400].val
	 *  const brownshade400 = Colors.brown.shade400.val
	 * ```
	 * / ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.brown.png)
	 */
	static brown = new MaterialColor('#795548', {
		50: new Color('#efebe9'),
		100: new Color('#d7ccc8'),
		200: new Color('#bcaaa4'),
		300: new Color('#a1887f'),
		400: new Color('#8d6e63'),
		500: new Color('#795548'),
		600: new Color('#6d4c41'),
		700: new Color('#5d4037'),
		800: new Color('#4e342e'),
		900: new Color('#3e2723'),
	});

	/**
	 * ```javascript
	 *  const grey = Colors.grey.val
	 *  const grey400 = Colors.grey[400].val
	 *  const greyshade400 = Colors.grey.shade400.val
	 * ```
	 *
	 *  ![](https://flutter.github.io/assets-for-api-docs/assets/material/Colors.grey.png)
	 */
	static grey = new MaterialColor('#9E9E9E', {
		50: new Color('#fafafa'),
		100: new Color('#f5f5f5'),
		200: new Color('#eeeeee'),
		300: new Color('#e0e0e0'),
		350: new Color('#d6d6d6'),
		400: new Color('#bdbdbd'),
		500: new Color('#9E9E9E'),
		600: new Color('#757575'),
		700: new Color('#616161'),
		800: new Color('#424242'),
		850: new Color('#303030'),
		900: new Color('#212121'),
	});

	/**
   * @type {{
      red: MaterialColor;
      pink: MaterialColor;
      purple: MaterialColor;
      deepPurple: MaterialColor;
      indigo: MaterialColor;
      blue: MaterialColor;
      lightBlue: MaterialColor;
      cyan: MaterialColor;
      teal: MaterialColor;
      green: MaterialColor;
      yellow: MaterialColor;
      red: MaterialColor;
      amber: MaterialColor;
      orange: MaterialColor;
      brown: MaterialColor;
      grey: MaterialColor;
    }}
   */

	static primaries = {
		red: Colors.red,
		orange: Colors.orange,
		yellow: Colors.yellow,
		green: Colors.green,
		blue: Colors.blue,
		purple: Colors.purple,
		pink: Colors.pink,
		brown: Colors.brown,
		grey: Colors.grey,
		deepPurple: Colors.deepPurple,
		indigo: Colors.indigo,
		lightBlue: Colors.lightBlue,
		cyan: Colors.cyan,
		teal: Colors.teal,
		amber: Colors.amber,
	};

	/**
	 * static black = new Color('#000000');
	 * @typedef
	 * @param color {'deeppink' | 'deepsky' | 'sky' | 'white' | 'black' | 'aqua' | 'chocolate' | 'violet' | 'neon' | 'crimson' | 'fuchisa' | 'dodgerblue' | 'tomato' | 'smoke' | 'silver' | 'gold' | 'orchid' }
	 */
	static of(color) {
		return Colors[color].val;
	}

	/**
	 * @typedef Props
	 * @prop {string} childern
	 *
	 *
	 * @param {Props} props
	 */
	render(props) {
		return props.childern;
	}
}
