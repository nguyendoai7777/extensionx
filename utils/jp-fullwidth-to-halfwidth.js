function convertKanaF2H(str) {
	return replaceStringByArrayOfIndex(str, WKANA, HKANA);
}
function convertKanaH2F(str) {
	return replaceStringByArrayOfIndex(str, HKANA2, WKANA2);
}
function replaceStringByArrayOfIndex(str, src, dest) {
	let len = src.length;
	for (let i = 0; i < len; i++) {
		str = replaceAll(str, src[i], dest[i]);
	}
	return str;
}

function replaceAll(target, from, to) {
	console.log(target + ' ' + from + ' ' + to);
	if (target.indexOf(from) < 0) {
		return target;
	} else {
		return target.split(from).join(to);
	}
}

const HKANA = [
	'ｶﾞ',
	'ｷﾞ',
	'ｸﾞ',
	'ｹﾞ',
	'ｺﾞ',
	'ｻﾞ',
	'ｼﾞ',
	'ｽﾞ',
	'ｾﾞ',
	'ｿﾞ',
	'ﾀﾞ',
	'ﾁﾞ',
	'ﾂﾞ',
	'ﾃﾞ',
	'ﾄﾞ',
	'ﾊﾞ',
	'ﾋﾞ',
	'ﾌﾞ',
	'ﾍﾞ',
	'ﾎﾞ',
	'ｳﾞ', //濁音
	'ﾊﾟ',
	'ﾋﾟ',
	'ﾌﾟ',
	'ﾍﾟ',
	'ﾎﾟ', //半濁音
	'ｧ',
	'ｨ',
	'ｩ',
	'ｪ',
	'ｫ',
	'ｬ',
	'ｭ',
	'ｮ',
	'ｯ',
	'ｰ',
	'', // 小文字
	'ｱ',
	'ｲ',
	'ｳ',
	'ｴ',
	'ｵ',
	'ｶ',
	'ｷ',
	'ｸ',
	'ｹ',
	'ｺ', // 50音
	'ｻ',
	'ｼ',
	'ｽ',
	'ｾ',
	'ｿ',
	'ﾀ',
	'ﾁ',
	'ﾂ',
	'ﾃ',
	'ﾄ',
	'ﾅ',
	'ﾆ',
	'ﾇ',
	'ﾈ',
	'ﾉ',
	'ﾊ',
	'ﾋ',
	'ﾌ',
	'ﾍ',
	'ﾎ',
	'ﾏ',
	'ﾐ',
	'ﾑ',
	'ﾒ',
	'ﾓ',
	'ﾔ',
	'ﾕ',
	'ﾖ',
	'ﾗ',
	'ﾘ',
	'ﾙ',
	'ﾚ',
	'ﾛ',
	'ﾜ',
	'',
	'ｦ',
	'',
	'ﾝ', // 50音 end
];

const HKANA2 = [
	'ｶﾞ',
	'ｷﾞ',
	'ｸﾞ',
	'ｹﾞ',
	'ｺﾞ',
	'ｻﾞ',
	'ｼﾞ',
	'ｽﾞ',
	'ｾﾞ',
	'ｿﾞ',
	'ﾀﾞ',
	'ﾁﾞ',
	'ﾂﾞ',
	'ﾃﾞ',
	'ﾄﾞ',
	'ﾊﾞ',
	'ﾋﾞ',
	'ﾌﾞ',
	'ﾍﾞ',
	'ﾎﾞ',
	'ｳﾞ', //濁音
	'ﾊﾟ',
	'ﾋﾟ',
	'ﾌﾟ',
	'ﾍﾟ',
	'ﾎﾟ', //半濁音
	'ｧ',
	'ｨ',
	'ｩ',
	'ｪ',
	'ｫ',
	'ｬ',
	'ｭ',
	'ｮ',
	'ｯ',
	'ｰ', // 小文字
	'ｱ',
	'ｲ',
	'ｳ',
	'ｴ',
	'ｵ',
	'ｶ',
	'ｷ',
	'ｸ',
	'ｹ',
	'ｺ', // 50音
	'ｻ',
	'ｼ',
	'ｽ',
	'ｾ',
	'ｿ',
	'ﾀ',
	'ﾁ',
	'ﾂ',
	'ﾃ',
	'ﾄ',
	'ﾅ',
	'ﾆ',
	'ﾇ',
	'ﾈ',
	'ﾉ',
	'ﾊ',
	'ﾋ',
	'ﾌ',
	'ﾍ',
	'ﾎ',
	'ﾏ',
	'ﾐ',
	'ﾑ',
	'ﾒ',
	'ﾓ',
	'ﾔ',
	'ﾕ',
	'ﾖ',
	'ﾗ',
	'ﾘ',
	'ﾙ',
	'ﾚ',
	'ﾛ',
	'ﾜ',
	'ｦ',
	'ﾝ', // 50音 end
];

const WKANA = [
	'ガ',
	'ギ',
	'グ',
	'ゲ',
	'ゴ',
	'ザ',
	'ジ',
	'ズ',
	'ゼ',
	'ゾ',
	'ダ',
	'ヂ',
	'ヅ',
	'デ',
	'ド',
	'バ',
	'ビ',
	'ブ',
	'ベ',
	'ボ',
	'ヴ', //濁音
	'パ',
	'ピ',
	'プ',
	'ペ',
	'ポ', //半濁音
	'ァ',
	'ィ',
	'ゥ',
	'ェ',
	'ォ',
	'ャ',
	'ュ',
	'ョ',
	'ッ',
	'ー',
	'ヮ', // 小文字
	'ア',
	'イ',
	'ウ',
	'エ',
	'オ',
	'カ',
	'キ',
	'ク',
	'ケ',
	'コ', // 50音 start
	'サ',
	'シ',
	'ス',
	'セ',
	'ソ',
	'タ',
	'チ',
	'ツ',
	'テ',
	'ト',
	'ナ',
	'ニ',
	'ヌ',
	'ネ',
	'ノ',
	'ハ',
	'ヒ',
	'フ',
	'ヘ',
	'ホ',
	'マ',
	'ミ',
	'ム',
	'メ',
	'モ',
	'ヤ',
	'ユ',
	'ヨ',
	'ラ',
	'リ',
	'ル',
	'レ',
	'ロ',
	'ワ',
	'ヰ',
	'ヲ',
	'ヱ',
	'ン', // 50音 end
];

const WKANA2 = [
	'ガ',
	'ギ',
	'グ',
	'ゲ',
	'ゴ',
	'ザ',
	'ジ',
	'ズ',
	'ゼ',
	'ゾ',
	'ダ',
	'ヂ',
	'ヅ',
	'デ',
	'ド',
	'バ',
	'ビ',
	'ブ',
	'ベ',
	'ボ',
	'ヴ', //濁音
	'パ',
	'ピ',
	'プ',
	'ペ',
	'ポ', //半濁音
	'ァ',
	'ィ',
	'ゥ',
	'ェ',
	'ォ',
	'ャ',
	'ュ',
	'ョ',
	'ッ',
	'ー', // 小文字
	'ア',
	'イ',
	'ウ',
	'エ',
	'オ',
	'カ',
	'キ',
	'ク',
	'ケ',
	'コ', // 50音 start
	'サ',
	'シ',
	'ス',
	'セ',
	'ソ',
	'タ',
	'チ',
	'ツ',
	'テ',
	'ト',
	'ナ',
	'ニ',
	'ヌ',
	'ネ',
	'ノ',
	'ハ',
	'ヒ',
	'フ',
	'ヘ',
	'ホ',
	'マ',
	'ミ',
	'ム',
	'メ',
	'モ',
	'ヤ',
	'ユ',
	'ヨ',
	'ラ',
	'リ',
	'ル',
	'レ',
	'ロ',
	'ワ',
	'ヲ',
	'ン', // 50音 end
];

const inputText = 'ヌーイェン';

// console.log(convertKanaF2H(inputText));
