// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		sequence = parseInput(data),
		output = FFT(sequence, 100);

	return output.join("");
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		sequence = parseInput(data, 100000),
		keyIndex = +sequence.slice(0, 7).join(""),
		output = FFT(sequence, 100);

	console.log(output.slice(keyIndex, keyIndex + 7));

	return "";
}

//Run
solveB("example_b", "16");

// Functions
function parseInput(data: string, repeat: number = 1) {
	return [...data.repeat(repeat)].map(Number);
}
function getPattern(count: number) {
	const base = [0, 1, 0, -1];
	let pattern: number[] = [];

	for (let digit of base) {
		pattern = pattern.concat(Array(count + 1).fill(digit));
	}

	return [...pattern, pattern[0]].slice(1);
}
function FFT(input: number[], phases: number) {
	const patterns: Map<number, number[]> = new Map();

	let output: number[] = [];

	for (let phase = 0; phase < phases; phase++) {
		for (let i = 0; i < input.length; i++) {
			let pattern: number[] = [];

			if (patterns.has(i)) {
				pattern = patterns.get(i)!;
			} else {
				pattern = getPattern(i);
				patterns.set(i, pattern);
			}

			let sum = 0;

			for (let j = 0; j < input.length; j++) {
				const p = pattern[j % pattern.length];

				// console.log(p);

				switch (p) {
					case 0:
						break;
					case -1:
						sum += input[j] * -1;
						break;
					case 1:
						sum += input[j];
						break;
					default:
						throw Error("Invalid pattern");
				}

				// if (j < i * 2) {
				// 	sum += input[j];
				// 	continue;
				// }

				// sum += input[j] * pattern[j % pattern.length];
			}

			// const sum = input.slice(i).reduce((acc, cur, index) => {
			// 	if (cur === 0) return acc;
			// 	return acc + ((cur * pattern[(index + i) % pattern.length]) % 10);
			// }, 0);

			output.push(Math.abs(sum % 10));
		}

		input = output;
		output = [];
	}

	return input.slice(0, 8);
}
