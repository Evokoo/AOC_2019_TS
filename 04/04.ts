// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ lower, upper } = parseInput(data),
		passwords = findPasswords(lower, upper);

	return passwords;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ lower, upper } = parseInput(data),
		passwords = findPasswords(lower, upper, true);

	console.log(passwords);

	return passwords;
}

//Run
solveB("input", "04");

// Functions
function parseInput(data: string) {
	const [lower, upper] = data.split("-").map(Number);
	return { lower, upper };
}
function findPasswords(lower: number, upper: number, partB: boolean = false) {
	function hasDouble(num: number) {
		const pairs = String(num).match(/(\d)\1{1,}/g) || [];

		if (!pairs.length) {
			return false;
		} else {
			return partB ? pairs.some((pair) => pair.length === 2) : true;
		}
	}
	function isIncreasing(num: number) {
		const digits = [...String(num)].map(Number);

		for (let i = 1; i < digits.length; i++) {
			const [a, b] = [digits[i - 1], digits[i]];

			if (b >= a) continue;
			else return false;
		}

		return true;
	}

	const passwords: Set<number> = new Set();

	for (let i = lower; i < upper; i++) {
		if (hasDouble(i) && isIncreasing(i)) {
			passwords.add(i);
		}
	}

	return passwords.size;
}
