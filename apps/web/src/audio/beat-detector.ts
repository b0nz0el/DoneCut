/**
 * Analyzes an AudioBuffer and returns an array of timestamp seconds
 * where rhythm beats / transient peaks occur.
 */
export function detectAudioBeats({
	buffer,
	sensitivity = 1.3,
	minDistanceSec = 0.25,
}: {
	buffer: AudioBuffer;
	sensitivity?: number;
	minDistanceSec?: number;
}): number[] {
	const sampleRate = buffer.sampleRate;
	const channelData = buffer.getChannelData(0);
	const windowSize = Math.floor(sampleRate * 0.05); // 50ms window
	const numWindows = Math.floor(channelData.length / windowSize);

	const energies: number[] = new Array(numWindows);

	// Compute RMS energy for each window
	for (let i = 0; i < numWindows; i++) {
		const start = i * windowSize;
		let sum = 0;
		for (let j = 0; j < windowSize; j++) {
			const sample = channelData[start + j];
			sum += sample * sample;
		}
		energies[i] = Math.sqrt(sum / windowSize);
	}

	// Compute moving average of energy (across 20 surrounding windows ~ 1 sec)
	const historySize = 20;
	const beatTimes: number[] = [];
	let lastBeatTime = -minDistanceSec;

	for (let i = historySize; i < numWindows - historySize; i++) {
		let localSum = 0;
		for (let j = i - historySize; j <= i + historySize; j++) {
			localSum += energies[j];
		}
		const localAverage = localSum / (historySize * 2 + 1);

		// Peak detection
		const isPeak =
			energies[i] > localAverage * sensitivity &&
			energies[i] > energies[i - 1] &&
			energies[i] > energies[i + 1];

		if (isPeak) {
			const timeSec = (i * windowSize) / sampleRate;
			if (timeSec - lastBeatTime >= minDistanceSec) {
				beatTimes.push(timeSec);
				lastBeatTime = timeSec;
			}
		}
	}

	return beatTimes;
}
