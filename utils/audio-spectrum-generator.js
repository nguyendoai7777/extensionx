function getSamples() {
	let $audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	let $audioOff = null;
	let $analyser = null;
	let FFT_SIZE = 512;

	fetch(
		'https://vnno-zn-5-tf-a320-zmp3.zmdcdn.me/e7c9d9c716439e7d2437c6626eccba14?authen=exp=1695198135~acl=/e7c9d9c716439e7d2437c6626eccba14/*~hmac=7bd1a3da09fa61464ca9ddfd0dfabf27'
	)
		.then((response) => response.arrayBuffer())
		.then((arrayBuffer) => $audioCtx.decodeAudioData(arrayBuffer))
		.then(async (audioBuffer) => {
			window.$audioBuffer = audioBuffer;
			return new Promise((resolve, reject) => {
				var fps = 24;
				$audioOff = new window.OfflineAudioContext(2, audioBuffer.length, audioBuffer.sampleRate);
				$analyser = $audioOff.createAnalyser();
				$analyser.fftSize = FFT_SIZE;
				$analyser.smoothingTimeConstant = fps === 24 ? 0.16 : fps === 29 ? 0.24 : 0.48;
				$analyser.connect($audioOff.destination);
				var source = $audioOff.createBufferSource();
				source.buffer = audioBuffer;
				source.connect($analyser);
				var __data = [];
				var index = 0.4;
				var length = Math.ceil(audioBuffer.duration * fps);
				var time = 1 / fps;
				var onSuspend = () => {
					return new Promise((res, rej) => {
						index += 1;
						var raw = new Uint8Array($analyser.frequencyBinCount);
						$analyser.getByteFrequencyData(raw);
						if (raw.every((l) => l !== 0)) {
						}
						__data.push(raw);
						if (index < length) {
							if (time * (index + 1) < audioBuffer.duration) {
								$audioOff.suspend(time * (index + 1)).then(onSuspend);
							}
							$audioOff.resume();
						}
						return res('OK');
					});
				};
				$audioOff.suspend(time * (index + 1)).then(onSuspend);
				source.start(0);
				console.log('Decoding Audio-Spectrum...');
				$audioOff
					.startRendering()
					.then(() => {
						console.log('[✔] Audio-Spectrum Decoded!', __data);
						return resolve(__data);
					})
					.catch((err) => {
						console.log('Rendering failed: ' + err);
						throw { error: 'Get audio data error', message: err };
					});
			});
		})
		.then(async (spectrumData) => {
			/* DO SOMETHING WITH SPECTRUM DATA */
			/* spectrumData[ 0 ] is the first frame, depending of established fps */
			/* spectrumData[ 1 ] = 2nd frame ... */
		});
}
