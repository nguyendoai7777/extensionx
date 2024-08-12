const template = ` 
<audio id="audio" controls crossorigin="anonymous"></audio>
<canvas id="waveform" width="800" height="200"></canvas>
`;

const soundcloudURL =
	'https://vnno-zn-5-tf-a320-zmp3.zmdcdn.me/e7c9d9c716439e7d2437c6626eccba14?authen=exp=1695198135~acl=/e7c9d9c716439e7d2437c6626eccba14/*~hmac=7bd1a3da09fa61464ca9ddfd0dfabf27';

const audioElement = document.getElementById('audio');
const canvas = document.getElementById('waveform');
const canvasContext = canvas.getContext('2d');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();

// Connect the audio element to the analyser
const source = audioContext.createMediaElementSource(audioElement);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Set up the analyser
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Function to draw the waveform
function drawWaveform() {
	analyser.getByteTimeDomainData(dataArray);
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	canvasContext.lineWidth = 2;
	canvasContext.strokeStyle = 'rgb(0, 0, 0)';
	canvasContext.beginPath();

	const sliceWidth = (canvas.width * 1.0) / bufferLength;
	let x = 0;

	for (let i = 0; i < bufferLength; i++) {
		const v = dataArray[i] / 128.0;
		const y = (v * canvas.height) / 2;

		if (i === 0) {
			canvasContext.moveTo(x, y);
		} else {
			canvasContext.lineTo(x, y);
		}

		x += sliceWidth;
	}

	canvasContext.lineTo(canvas.width, canvas.height / 2);
	canvasContext.stroke();
}

// Play the audio and start drawing the waveform
audioElement.src = soundcloudURL;
audioElement.onplay = () => {
	audioContext.resume().then(() => {
		audioElement.play();
		setInterval(drawWaveform, 1000 / 60); // Adjust the frame rate as needed
	});
};
