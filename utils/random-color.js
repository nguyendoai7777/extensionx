function renderRandomColor(min = 0, max = 16777215) {
	const x = Math.round(Math.random() * (max - min) + min);
	const y = x.toString(16);
	const z = `${y}fffffff`.slice(0, 6);
	return `#${z}`;
}

function renderBox(quantity = 3, rootElement) {
	const containerBox = document.createElement('div');
	containerBox.className = 'flex justify-between';
	for (let i = 0; i < quantity; i++) {
		const bgColor = renderRandomColor();
		const box = document.createElement('box');
		box.style.backgroundColor = bgColor;
		box.className = 'box';
		box.textContent = `h${i}`;
		containerBox.append(box);
	}
	if (!rootElement) {
		throw new Error("Can't found Element Root to render");
	} else {
		rootElement.append(containerBox);
	}
}

function app() {
	const container = document.querySelector('.app');
	const btn = document.createElement('div');
	const rs = document.createElement('div');
	btn.className = 'test';
	btn.textContent = 'ramdom';
	btn.addEventListener('click', () => {
		const value = renderRandomColor();
		rs.textContent = value;
		container.innerHTML = '';
		renderBox(4, container);
	});
	rs.className = 'result';
	rs.textContent = 'click "random" button to show';
	document.body.appendChild(btn);
	document.body.appendChild(rs);
	renderBox(4, container);
}

window.onload = app;
