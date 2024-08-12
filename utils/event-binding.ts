type CleanupFunction = (beforeCleanupCallback?: () => void) => void;

type SupportedKey =
	| 'ctrl'
	| 'shift'
	| 'alt'
	| 'meta'
	| 'command'
	| 'windows'
	| 'fn'
	| 'printscreen'
	| 'a'
	| 'b'
	| 'c'
	| 'd'
	| 'e'
	| 'f'
	| 'g'
	| 'h'
	| 'i'
	| 'j'
	| 'k'
	| 'l'
	| 'm'
	| 'n'
	| 'o'
	| 'p'
	| 'q'
	| 'r'
	| 's'
	| 't'
	| 'u'
	| 'v'
	| 'w'
	| 'x'
	| 'y'
	| 'z'
	| 'f1'
	| 'f2'
	| 'f3'
	| 'f4'
	| 'f5'
	| 'f6'
	| 'f7'
	| 'f8'
	| 'f9'
	| 'f10'
	| 'f11'
	| 'f12'
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| '0'
	| '`'
	| '['
	| ']'
	| '\\'
	| 'backspace'
	| 'esc'
	| 'tab'
	| 'delete'
	| 'pageup'
	| 'pagedown'
	| 'end'
	| 'home'
	| 'pause'
	| 'arrowup'
	| 'arrowdown'
	| 'arrowleft'
	| 'arrowright';

type KeyMap = {
	[K in SupportedKey]: string;
};

export const CTRL = 'ctrl',
	SHIFT = 'shift',
	ALT = 'alt',
	META = 'meta',
	COMMAND = META,
	WIN = META,
	FN = 'fn',
	PRT_SC = 'printscreen',
	BACKSPACE = 'backspace',
	ESC = 'esc',
	TAB = 'tab',
	DEL = 'delete',
	PG_UP = 'pageup',
	PG_DN = 'pagedown',
	END = 'end',
	HOME = 'home',
	PAUSE = 'pause',
	AR_UP = 'arrowup',
	AR_DN = 'arrowdown',
	AR_LF = 'arrowleft',
	AR_RG = 'arrowright',
	A = 'a',
	B = 'b',
	C = 'c',
	D = 'd',
	E = 'e',
	F = 'f',
	G = 'g',
	H = 'h',
	I = 'i',
	J = 'j',
	K = 'k',
	L = 'l',
	M = 'm',
	N = 'n',
	O = 'o',
	P = 'p',
	Q = 'q',
	R = 'r',
	S = 's',
	T = 't',
	U = 'u',
	V = 'v',
	W = 'w',
	X = 'x',
	Y = 'y',
	Z = 'z',
	NUM_1 = '1',
	NUM_2 = '2',
	NUM_3 = '3',
	NUM_4 = '4',
	NUM_5 = '5',
	NUM_6 = '6',
	NUM_7 = '7',
	NUM_8 = '8',
	NUM_9 = '9',
	NUM_0 = '0',
	F1 = 'F1',
	F2 = 'F2',
	F3 = 'F3',
	F4 = 'F4',
	F5 = 'F5',
	F6 = 'F6',
	F7 = 'F7',
	F8 = 'F8',
	F9 = 'F9',
	F10 = 'F10',
	F11 = 'F11',
	F12 = 'F12',
	BACK_TICK = '`',
	SLASH = '\\',
	BRACKET_LEFT = '[',
	BRACKET_RG = ']';
// COLON = ';'

export const KEYS_MAP = {
	SHIFT,
	ALT,
	META,
	FN,
	PRT_SC,
	BACKSPACE,
	ESC,
	TAB,
	DEL,
	PG_UP,
	PG_DN,
	END,
	HOME,
	PAUSE,
	AR_UP,
	AR_DN,
	AR_LF,
	AR_RG,
	A,
	B,
	C,
	D,
	E,
	F,
	G,
	H,
	I,
	J,
	K,
	L,
	M,
	N,
	O,
	P,
	Q,
	R,
	S,
	T,
	U,
	V,
	W,
	X,
	Y,
	Z,
	NUM_1,
	NUM_2,
	NUM_3,
	NUM_4,
	NUM_5,
	NUM_6,
	NUM_7,
	NUM_8,
	NUM_9,
	NUM_0,
	F1,
	F2,
	F3,
	F4,
	F5,
	F6,
	F7,
	F8,
	F9,
	F10,
	F11,
	F12,
	BACK_TICK,
	SLASH,
	BRACKET_LEFT,
	BRACKET_RG,
};

const KEY_MAP: KeyMap = {
	ctrl: 'Control',
	shift: 'Shift',
	alt: 'Alt',
	meta: 'Meta',
	command: 'Meta',
	windows: 'Meta',
	fn: 'Fn',
	printscreen: 'PrintScreen',
	backspace: 'Backspace',
	esc: 'Escape',
	tab: 'Tab',
	delete: 'Delete',
	pageup: 'PageUp',
	pagedown: 'PageDown',
	end: 'End',
	home: 'Home',
	pause: 'Pause',
	arrowup: 'ArrowUp',
	arrowdown: 'ArrowDown',
	arrowleft: 'ArrowLeft',
	arrowright: 'ArrowRight',
	a: 'a',
	b: 'b',
	c: 'c',
	d: 'd',
	e: 'e',
	f: 'f',
	g: 'g',
	h: 'h',
	i: 'i',
	j: 'j',
	k: 'k',
	l: 'l',
	m: 'm',
	n: 'n',
	o: 'o',
	p: 'p',
	q: 'q',
	r: 'r',
	s: 's',
	t: 't',
	u: 'u',
	v: 'v',
	w: 'w',
	x: 'x',
	y: 'y',
	z: 'z',
	'1': '1',
	'2': '2',
	'3': '3',
	'4': '4',
	'5': '5',
	'6': '6',
	'7': '7',
	'8': '8',
	'9': '9',
	'0': '0',
	f1: 'F1',
	f2: 'F2',
	f3: 'F3',
	f4: 'F4',
	f5: 'F5',
	f6: 'F6',
	f7: 'F7',
	f8: 'F8',
	f9: 'F9',
	f10: 'F10',
	f11: 'F11',
	f12: 'F12',
	'`': '`',
	'[': '[',
	']': ']',
	'\\': '\\',
};

type BindingKeys = [SupportedKey, SupportedKey] | [SupportedKey, SupportedKey, SupportedKey] | [SupportedKey, SupportedKey, SupportedKey, SupportedKey];

type AssignedElement = Document | (Window & typeof globalThis) | HTMLElement;

interface BindingOpts<T extends AssignedElement> {
	assignTo?: T;
	preventDevtoolOpened?: boolean;
}

const defaultBindingOpts: BindingOpts<Document> = {
	assignTo: document,
	preventDevtoolOpened: true,
};

function disableOpenDevtoolWithEvent(event: KeyboardEvent) {
	const f12 = event.code === 'F12';
	const preventKeys = ['KeyI', 'KeyJ'].includes(event.code);
	const combo = event.ctrlKey && event.shiftKey && preventKeys;
	if (f12 || combo) {
		event.preventDefault();
	}
}

export function disableOpenDevtool(withEvent?: KeyboardEvent) {
	if (withEvent) {
		disableOpenDevtoolWithEvent(withEvent);
		return;
	}
	document.addEventListener('keydown', disableOpenDevtoolWithEvent, false);
}

/**
 * @example
 *
 * ```ts
 * const unbind = eventBinding(['ctrl', 'v'], () => {
 *    // paste feature
 * })
 *
 * unbind() // clean up
 *
 * or
 *
 * unbind(() => {
 *  // can do something before unbind event - cleanup
 * })
 *
 * @todo
 *  if you wanna bind to an element, event only active on gain focus element as <input>, <textarea> or <element contenteditable>
 *
 * ```
 */
export const eventBinding = <T extends AssignedElement>(events: BindingKeys, callback: (props: { comboKey: string; event: KeyboardEvent }) => void, options?: BindingOpts<T>) => {
	events = events.map((c) => KEY_MAP[c]) as unknown as BindingKeys;
	const { assignTo, preventDevtoolOpened } = {
		...defaultBindingOpts,
		...options,
	} as Required<BindingOpts<HTMLElement>>;
	let keyMap: { [key: string]: boolean } = {};
	const keydownHandler = (event: KeyboardEvent) => {
		preventDevtoolOpened && disableOpenDevtool(event);
		keyMap[event.key.toLowerCase()] = true;

		const pressedKeys = Object.keys(keyMap).filter((key) => keyMap[key]);
		if (pressedKeys.length === events.length && events.every((key) => keyMap[key.toLowerCase()])) {
			callback({ comboKey: events.toString(), event });
		}
	};

	const keyupHandler = (event: KeyboardEvent) => {
		keyMap[event.key.toLowerCase()] = false;
	};

	assignTo.addEventListener('keydown', keydownHandler);
	assignTo.addEventListener('keyup', keyupHandler);

	return (beforeCleanupFn?: () => void) => {
		beforeCleanupFn && beforeCleanupFn();
		assignTo.removeEventListener('keydown', keydownHandler);
		assignTo.removeEventListener('keyup', keyupHandler);
		(keyMap as any) = null;
	};
};
