/**
 * create Merquee text animation and return setInterval id for cleanup
 *
 * @param {string} selector string
 * @param {number} speed  number
 * @returns {() => void} closure function
 *
 * @example
 * 
 * ```js
 * const terminate = Marquee('.marquee', 0.4); // is a closure func
 *```
 * call `terminate` (closure func) somewhere to terminate **permanently** animation
 * 
 * html template
 * ```html
  <div class="marquee">
    <div>Iran Iraq Israel</div>
  </div>
	<button onclick="terminate()">stop</button>
 * ```
 * 
 *  style
 * ```css
  .marquee {
    overflow: hidden;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    display: flex;
    width: 100px;
  }

  .marquee * {
    font-size: 1rem;
    white-space: nowrap;
    text-transform: uppercase;
  }
 * 
 * ```
 *
 */

function Marquee(selector, speed) {
	const parentSelector = document.querySelector(selector);
	const clone = parentSelector.innerHTML;
	const firstElement = parentSelector.children[0];

	parentSelector.insertAdjacentHTML('beforeend', clone);
	parentSelector.insertAdjacentHTML('beforeend', clone);
	let i = 0;
	/** @type {number} */
	let intevalId;
	intevalId = setInterval(function () {
		firstElement.style.marginLeft = `-${i}px`;
		if (i > firstElement.clientWidth) {
			i = 0;
		}
		i = i + speed;
	}, 0);

	return () => {
		clearInterval(intevalId);
	};
}
