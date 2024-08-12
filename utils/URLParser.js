function URLParser(url) {
	const a = new URL(url);
	a.href = url;
	return {
		...a,
		host: a.hostname,
		port: a.port,
		query: a.search,
		params: (function () {
			let ret = {},
				seg = a.search.replace(/^\?/, '').split('&'),
				len = seg.length,
				i = 0,
				s;
			for (; i < len; i++) {
				if (!seg[i]) {
					continue;
				}
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})(),
		hash: a.hash.replace('#', ''),
	};
}

console.log(
	`xxx`,
	URLParser(
		`http://localhost:8100/inspire/write/story/qnrnTwmKn9KfOYAZzqK1/script?name=author-edit&data=%7B"itemId":"xDhV4ZtXJiQS6NMEu4hIpa6F7lk1","isSidePanel":true%7D&opts=%7B%7D`
	)
);
