// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return getSignal(data);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return getSignalFeedback(data);
}

//Run
// solveB("input", "07");

// Functions
function getSignal(data: string) {
	const sequences = TOOLS.generatePermutations<number>([0, 1, 2, 3, 4]);

	let max = -Infinity;

	for (let sequence of sequences) {
		let n = 0;

		for (let input of sequence) {
			const intComp = new Intcode(data, [input, n]);
			intComp.run();

			n = intComp.lastOutput;
		}

		max = Math.max(max, n);
	}

	return max;
}
function getSignalFeedback(data: string) {
	const sequences = TOOLS.generatePermutations<number>([5, 6, 7, 8, 9]);

	let max = -Infinity;

	for (let sequence of sequences) {
		const amps = Array.from(
			{ length: 5 },
			(_, i) => new Intcode(data, [sequence[i]])
		);

		let n = 0;
		let index = 0;

		while (amps[4].isActive) {
			const amp = amps[index];

			if (amp.isActive) {
				amp.enqueueInput(n);
				amp.run();
				n = amp.lastOutput;
			}

			index++;

			if (index > 4) {
				index = 0;
			}
		}

		max = Math.max(max, n);
	}

	return max;
}
