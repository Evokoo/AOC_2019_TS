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
		sequence = parseInput(data);
	// output = FFT(sequence, 100);

	console.log(sequence);

	return "";
}

//Run
solveA("example_a", "16");

// Functions
function parseInput(data: string, fullSignal: boolean = false) {
	if (fullSignal) {
		return [...data.repeat(10000)].map(Number);
	}
	return [...data].map(Number);
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

			const sum = input.reduce((acc, cur, index) => {
				return acc + ((cur * pattern[index % pattern.length]) % 10);
			}, 0);

			output.push(Math.abs(sum % 10));
		}

		input = output;
		output = [];
	}

	return input.slice(0, 8);
}
